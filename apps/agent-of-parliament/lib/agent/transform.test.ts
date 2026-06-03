import type { BetaRawMessageStreamEvent } from '@anthropic-ai/sdk/resources/beta/messages/messages';
import { describe, expect, it } from 'vitest';
import type { TelemetrySink, ToolCallRecord, TurnUsage } from '../telemetry/types';
import type { AgentEvent } from './events';
import { transform } from './transform';

// Fixtures mirror the Anthropic connector stream shapes verified against the SDK
// type declarations (BetaRaw* events, BetaMCPToolUse/ResultBlock). Replace with a
// real capture once the live connector spike runs, but the block shapes are fixed.
type StreamEvent = BetaRawMessageStreamEvent;

async function* fromArray(events: StreamEvent[]): AsyncIterable<StreamEvent> {
  for (const e of events) yield e;
}

async function collect(events: StreamEvent[]): Promise<AgentEvent[]> {
  const out: AgentEvent[] = [];
  for await (const ev of transform(fromArray(events))) out.push(ev);
  return out;
}

function textDelta(text: string): StreamEvent {
  return {
    type: 'content_block_delta',
    index: 0,
    delta: { type: 'text_delta', text },
  } as StreamEvent;
}

function toolUse(id: string, name: string): StreamEvent {
  return {
    type: 'content_block_start',
    index: 0,
    content_block: { type: 'mcp_tool_use', id, name, server_name: 'parliament', input: {} },
  } as StreamEvent;
}

function toolResult(
  toolUseId: string,
  content: string | Array<{ type: 'text'; text: string }>,
  isError = false,
): StreamEvent {
  return {
    type: 'content_block_start',
    index: 1,
    content_block: { type: 'mcp_tool_result', tool_use_id: toolUseId, content, is_error: isError },
  } as StreamEvent;
}

const STOP: StreamEvent = { type: 'message_stop' } as StreamEvent;

describe('transform', () => {
  it('emits text events for text deltas', async () => {
    const out = await collect([textDelta('Hello '), textDelta('world'), STOP]);
    expect(out).toEqual([
      { type: 'text', delta: 'Hello ' },
      { type: 'text', delta: 'world' },
      { type: 'done' },
    ]);
  });

  it('emits tool_start then a card for a mapped tool result', async () => {
    const envelope = JSON.stringify({
      data: { name: 'Stephen Doughty' },
      sources: [{ title: 'Members API', url: 'https://members.parliament.uk/member/1' }],
    });
    const out = await collect([
      toolUse('tu_1', 'parliament_member_overview'),
      toolResult('tu_1', envelope),
      STOP,
    ]);
    expect(out).toEqual([
      { type: 'tool_start', id: 'tu_1', name: 'parliament_member_overview' },
      {
        type: 'card',
        kind: 'mp',
        data: { name: 'Stephen Doughty' },
        sources: [{ title: 'Members API', url: 'https://members.parliament.uk/member/1' }],
      },
      { type: 'done' },
    ]);
  });

  it('flattens text-block array result content', async () => {
    const envelope = JSON.stringify({ data: { motion: 'That the Bill be read' }, sources: [] });
    const out = await collect([
      toolUse('tu_2', 'parliament_get_division'),
      toolResult('tu_2', [{ type: 'text', text: envelope }]),
      STOP,
    ]);
    expect(out).toContainEqual({
      type: 'card',
      kind: 'vote',
      data: { motion: 'That the Bill be read' },
      sources: [],
    });
  });

  it('emits an error event for an is_error result', async () => {
    const out = await collect([
      toolUse('tu_3', 'parliament_member_overview'),
      toolResult('tu_3', 'Member not found.', true),
      STOP,
    ]);
    expect(out).toContainEqual({ type: 'error', message: 'Member not found.' });
    expect(out.some((e) => e.type === 'card')).toBe(false);
  });

  it('emits a member card for parliament_find_member', async () => {
    const envelope = JSON.stringify({
      data: { matches: [{ id: 172, name: 'Diane Abbott' }], query_kind: 'postcode' },
      sources: [{ title: 'Members API', url: 'https://members.parliament.uk/member/172' }],
    });
    const out = await collect([
      toolUse('tu_4', 'parliament_find_member'),
      toolResult('tu_4', envelope),
      STOP,
    ]);
    expect(out).toContainEqual({
      type: 'card',
      kind: 'member',
      data: { matches: [{ id: 172, name: 'Diane Abbott' }], query_kind: 'postcode' },
      sources: [{ title: 'Members API', url: 'https://members.parliament.uk/member/172' }],
    });
  });

  it('does not emit a card for an unmapped (id-resolving) tool', async () => {
    const envelope = JSON.stringify({ data: { id: 99 }, sources: [] });
    const out = await collect([
      toolUse('tu_4b', 'parliament_find_constituency'),
      toolResult('tu_4b', envelope),
      STOP,
    ]);
    expect(out).toEqual([
      { type: 'tool_start', id: 'tu_4b', name: 'parliament_find_constituency' },
      { type: 'done' },
    ]);
  });

  it('emits an error event when a card result is not valid JSON', async () => {
    const out = await collect([
      toolUse('tu_5', 'parliament_topic_tracker'),
      toolResult('tu_5', 'not json'),
      STOP,
    ]);
    expect(out).toContainEqual({ type: 'error', message: 'Could not parse tool result.' });
  });
});

function messageStart(): StreamEvent {
  return {
    type: 'message_start',
    message: {
      model: 'claude-sonnet-4-6',
      usage: {
        input_tokens: 100,
        output_tokens: 1,
        cache_read_input_tokens: 50,
        cache_creation_input_tokens: 10,
      },
    },
  } as StreamEvent;
}

function messageDelta(output: number): StreamEvent {
  return { type: 'message_delta', delta: {}, usage: { output_tokens: output } } as StreamEvent;
}

function toolUseWithInput(id: string, name: string, input: unknown): StreamEvent {
  return {
    type: 'content_block_start',
    index: 0,
    content_block: { type: 'mcp_tool_use', id, name, server_name: 'parliament', input },
  } as StreamEvent;
}

describe('transform telemetry sink', () => {
  it('feeds usage and a tool record to the sink without changing UI events', async () => {
    const usages: Array<Partial<TurnUsage> & { model?: string }> = [];
    const tools: ToolCallRecord[] = [];
    const sink: TelemetrySink = {
      onUsage: (u) => usages.push(u),
      onTool: (t) => tools.push(t),
    };

    const envelope = JSON.stringify({
      data: { matches: [] },
      sources: [{ title: 'Members API', url: 'https://members.parliament.uk/member/1' }],
      meta: { upstream_calls: 2, truncated: true },
    });

    const out: AgentEvent[] = [];
    for await (const ev of transform(
      fromArray([
        messageStart(),
        toolUseWithInput('tu_1', 'parliament_find_member', { query: 'BS3 4QH' }),
        toolResult('tu_1', envelope),
        messageDelta(42),
        STOP,
      ]),
      sink,
    )) {
      out.push(ev);
    }

    // UI events are unaffected (no card: find_member maps to a card kind, so it does emit one).
    expect(out).toContainEqual({ type: 'tool_start', id: 'tu_1', name: 'parliament_find_member' });
    expect(out).toContainEqual({ type: 'done' });

    expect(usages[0]).toMatchObject({
      model: 'claude-sonnet-4-6',
      input: 100,
      cache_read: 50,
      cache_creation: 10,
    });
    expect(usages.at(-1)).toMatchObject({ output: 42 });

    expect(tools).toHaveLength(1);
    expect(tools[0]).toEqual({
      name: 'parliament_find_member',
      input: { query: 'BS3 4QH' },
      output: envelope,
      response_bytes: envelope.length,
      upstream_calls: 2,
      truncated: true,
      sources_count: 1,
      is_error: false,
    });
  });

  it('captures error results and results that render no card', async () => {
    const tools: ToolCallRecord[] = [];
    const sink: TelemetrySink = { onUsage: () => {}, onTool: (t) => tools.push(t) };

    const idResolving = JSON.stringify({ data: { id: 99 }, sources: [] });
    for await (const _ of transform(
      fromArray([
        toolUse('tu_e', 'parliament_member_overview'),
        toolResult('tu_e', 'Member not found.', true),
        toolUseWithInput('tu_n', 'parliament_find_constituency', { name: 'x' }),
        toolResult('tu_n', idResolving),
        STOP,
      ]),
      sink,
    )) {
      // drain
    }

    expect(tools).toHaveLength(2);
    expect(tools[0]).toMatchObject({
      name: 'parliament_member_overview',
      is_error: true,
      sources_count: 0,
    });
    expect(tools[1]).toMatchObject({ name: 'parliament_find_constituency', is_error: false });
  });
});

import type { BetaRawMessageStreamEvent } from '@anthropic-ai/sdk/resources/beta/messages/messages';
import { describe, expect, it } from 'vitest';
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

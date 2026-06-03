import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { TurnRecord } from './types';

const { generation, span, trace, flushAsync, LangfuseMock } = vi.hoisted(() => {
  const generation = vi.fn();
  const span = vi.fn();
  const trace = vi.fn(() => ({ generation, span }));
  const flushAsync = vi.fn(() => Promise.resolve());
  const LangfuseMock = vi.fn(() => ({ trace, flushAsync }));
  return { generation, span, trace, flushAsync, LangfuseMock };
});

vi.mock('langfuse', () => ({ Langfuse: LangfuseMock }));

const RECORD: TurnRecord = {
  traceId: 'trace-1',
  sessionId: 'session-1',
  model: 'claude-sonnet-4-6',
  input: 'who is my MP?',
  output: 'Your MP is …',
  usage: { input: 100, output: 42, cache_read: 50, cache_creation: 10 },
  toolCalls: [
    {
      name: 'parliament_find_member',
      input: { query: 'BS3 4QH' },
      output: '{"data":{"matches":[]},"sources":[]}',
      response_bytes: 1234,
      upstream_calls: 2,
      truncated: false,
      sources_count: 1,
      is_error: false,
    },
    {
      name: 'parliament_member_overview',
      input: { memberId: 1 },
      output: '{"data":{},"sources":[]}',
      response_bytes: 5678,
      sources_count: 3,
      is_error: false,
    },
  ],
};

describe('recordTurn', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
  });
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('writes trace, generation and a span per tool, then flushes', async () => {
    vi.stubEnv('LANGFUSE_SECRET_KEY', 'sk-test');
    vi.stubEnv('LANGFUSE_PUBLIC_KEY', 'pk-test');
    const { recordTurn } = await import('./recordTurn');

    await recordTurn(RECORD);

    expect(trace).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'trace-1', sessionId: 'session-1', input: RECORD.input }),
    );
    expect(generation).toHaveBeenCalledWith(
      expect.objectContaining({
        model: 'claude-sonnet-4-6',
        usageDetails: expect.objectContaining({
          input: 100,
          output: 42,
          cache_read_input_tokens: 50,
        }),
      }),
    );
    expect(span).toHaveBeenCalledTimes(2);
    expect(span).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'tool:parliament_find_member',
        output: '{"data":{"matches":[]},"sources":[]}',
      }),
    );
    expect(flushAsync).toHaveBeenCalledOnce();
  });

  it('no-ops without Langfuse credentials', async () => {
    vi.stubEnv('LANGFUSE_SECRET_KEY', '');
    vi.stubEnv('LANGFUSE_PUBLIC_KEY', '');
    const { recordTurn } = await import('./recordTurn');

    await recordTurn(RECORD);

    expect(LangfuseMock).not.toHaveBeenCalled();
    expect(trace).not.toHaveBeenCalled();
  });
});

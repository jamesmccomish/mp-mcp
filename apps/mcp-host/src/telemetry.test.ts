import type { ExecutionContext } from 'hono';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { parseTraceId, recordToolSpan } from './telemetry.js';

// Mock the Langfuse client so the real telemetry code path runs (parseTraceId,
// isTelemetryEnabled, recordToolSpan) but nothing leaves the process.
const { span, flushAsync, LangfuseMock } = vi.hoisted(() => {
  const span = vi.fn();
  const flushAsync = vi.fn(() => Promise.resolve());
  const LangfuseMock = vi.fn(() => ({ span, flushAsync, trace: vi.fn() }));
  return { span, flushAsync, LangfuseMock };
});
vi.mock('langfuse', () => ({ Langfuse: LangfuseMock }));

vi.stubEnv('LANGFUSE_SECRET_KEY', 'sk-test');
vi.stubEnv('LANGFUSE_PUBLIC_KEY', 'pk-test');

const { app } = await import('./app.js');

function toolCall(name: string, headers: Record<string, string> = {}): Request {
  return new Request('http://localhost/mcp', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      accept: 'application/json, text/event-stream',
      ...headers,
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/call',
      params: { name, arguments: {} },
    }),
  });
}

describe('parseTraceId', () => {
  it('extracts a bearer token', () => {
    expect(parseTraceId('Bearer trace-abc')).toBe('trace-abc');
  });
  it('tolerates a bare token', () => {
    expect(parseTraceId('trace-abc')).toBe('trace-abc');
  });
  it('returns undefined for missing/empty', () => {
    expect(parseTraceId(undefined)).toBeUndefined();
    expect(parseTraceId('Bearer   ')).toBeUndefined();
  });
});

describe('mcp-host telemetry', () => {
  beforeEach(() => {
    span.mockClear();
    flushAsync.mockClear();
  });

  it('writes a server span under the forwarded traceId', async () => {
    // Unknown tool: exercises the telemetry wiring without a live upstream call.
    await app.fetch(toolCall('unknown_tool', { authorization: 'Bearer trace-abc' }));

    expect(span).toHaveBeenCalledTimes(1);
    const arg = span.mock.calls[0]?.[0];
    expect(arg).toMatchObject({ traceId: 'trace-abc', name: 'tool:unknown_tool srv' });
    expect(arg.startTime).toBeInstanceOf(Date);
    expect(arg.endTime).toBeInstanceOf(Date);
    expect(flushAsync).toHaveBeenCalledOnce();
  });

  it('records no span without an Authorization header', async () => {
    await app.fetch(toolCall('unknown_tool'));
    expect(span).not.toHaveBeenCalled();
  });

  it('hands the flush to waitUntil when an execution context is present', async () => {
    // Serverless/edge runtimes pass an ExecutionContext; the host must keep the
    // process alive for the flush via waitUntil rather than fire-and-forget.
    const tasks: Promise<unknown>[] = [];
    const executionCtx = {
      waitUntil: (p: Promise<unknown>) => tasks.push(p),
      passThroughOnException: () => {},
    };

    await app.fetch(
      toolCall('unknown_tool', { authorization: 'Bearer trace-ctx' }),
      {},
      executionCtx as unknown as ExecutionContext,
    );

    expect(tasks).toHaveLength(1);
    await Promise.all(tasks);
    expect(flushAsync).toHaveBeenCalledOnce();
  });
});

describe('recordToolSpan flush bound', () => {
  beforeEach(() => {
    span.mockClear();
    flushAsync.mockClear();
  });

  it('resolves on the timeout when the flush never settles', async () => {
    vi.useFakeTimers();
    try {
      // A flush that never settles stands in for an unreachable / contended
      // ingestion API. Without the bound, recordToolSpan would hang forever.
      flushAsync.mockReturnValueOnce(new Promise<void>(() => {}));

      let settled = false;
      const done = recordToolSpan({
        traceId: 'trace-timeout',
        name: 'unknown_tool',
        startTime: new Date(),
        endTime: new Date(),
        ok: true,
      }).then(() => {
        settled = true;
      });

      // Just before the 2s bound (FLUSH_TIMEOUT_MS) it is still pending...
      await vi.advanceTimersByTimeAsync(1999);
      expect(settled).toBe(false);

      // ...and it resolves once the bound fires, not because the flush settled.
      await vi.advanceTimersByTimeAsync(1);
      await done;
      expect(settled).toBe(true);
    } finally {
      vi.useRealTimers();
    }
  });
});

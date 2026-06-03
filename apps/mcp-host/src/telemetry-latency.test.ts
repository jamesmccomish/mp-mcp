import { beforeAll, describe, expect, it, vi } from 'vitest';

// A deliberately slow Langfuse flush stands in for the real failure mode: a
// telemetry write that is slow / contended / unreachable. The host must never
// hold the connector's response behind it.
const FLUSH_DELAY_MS = 3000;

vi.mock('langfuse', () => ({
  Langfuse: class {
    span() {}
    async flushAsync() {
      await new Promise((resolve) => setTimeout(resolve, FLUSH_DELAY_MS));
    }
  },
}));

// Telemetry is enabled only when both keys are present; set them before the app
// (and its lazy Langfuse client) is first exercised.
beforeAll(() => {
  process.env.LANGFUSE_SECRET_KEY = 'sk-test';
  process.env.LANGFUSE_PUBLIC_KEY = 'pk-test';
});

function toolCall(): Request {
  return new Request('http://localhost/mcp', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      accept: 'application/json, text/event-stream',
      // The connector forwards the traceId here; its presence activates the
      // server-side telemetry span + flush.
      authorization: 'Bearer trace-123',
    },
    // Missing `query` -> the tool fails validation fast, with no upstream call,
    // so response latency reflects only the telemetry path under test.
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/call',
      params: { name: 'parliament_find_member', arguments: {} },
    }),
  });
}

describe('mcp-host telemetry latency', () => {
  it('returns the tool response without waiting on the Langfuse flush', async () => {
    const { app } = await import('./app.js');

    const start = Date.now();
    const res = await app.fetch(toolCall());
    await res.text();
    const elapsed = Date.now() - start;

    expect(res.status).toBe(200);
    // The flush takes FLUSH_DELAY_MS; the response must not be gated behind it.
    expect(elapsed).toBeLessThan(FLUSH_DELAY_MS / 2);
  });
});

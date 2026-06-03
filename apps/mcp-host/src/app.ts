import { createServer } from '@jamesmccomish/mp-mcp';
import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js';
import { type Context, Hono } from 'hono';
import { isTelemetryEnabled, parseTraceId, recordToolSpan } from './telemetry.js';

// Hono app shared by the dev server (src/index.ts), the Vercel function
// (api/index.ts), and the test suite. One app, exercised identically everywhere.
export const app = new Hono();

app.get('/health', (c) => c.json({ status: 'ok' }));

// Stateless Streamable HTTP: the server offers no standalone server-to-client
// SSE stream (GET) and holds no sessions to terminate (DELETE). The spec requires
// 405 for both; returning anything else makes connectors hang waiting on a stream
// that never produces data.
app.on(['GET', 'DELETE'], '/mcp', (c) =>
  c.json(
    { jsonrpc: '2.0', error: { code: -32000, message: 'Method not allowed.' }, id: null },
    405,
    { Allow: 'POST' },
  ),
);

app.post('/mcp', async (c) => {
  // Fresh server + transport per request. Stateless mode (no sessionIdGenerator)
  // is the correct model for serverless: each invocation is independent, and the
  // SDK forbids reusing a stateless transport across requests.
  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
    enableJsonResponse: true,
  });
  const server = createServer();
  await server.connect(transport);

  // Telemetry: time the tool call and attach an accurate-latency span to the
  // browser-owned trace, joined by the traceId the connector forwards in
  // `authorization_token`. Peek the cloned body for the tool name; the original
  // stream is left intact for the transport to consume.
  const traceId = isTelemetryEnabled() ? parseTraceId(c.req.header('authorization')) : undefined;
  let toolName: string | undefined;
  if (traceId) {
    try {
      const body = (await c.req.raw.clone().json()) as {
        method?: string;
        params?: { name?: string };
      };
      if (body.method === 'tools/call') toolName = body.params?.name;
    } catch {}
  }

  const startTime = new Date();
  const res = await transport.handleRequest(c.req.raw);
  if (traceId && toolName) {
    // Record the span in the background. Awaiting the flush here would gate the
    // connector's response on the Langfuse write — a slow flush would stall the
    // tool result up to the connector's request timeout (~300s). On serverless we
    // keep the process alive for the flush via waitUntil; on a long-running server
    // (no executionCtx) it is plain fire-and-forget.
    const flush = recordToolSpan({
      traceId,
      name: toolName,
      startTime,
      endTime: new Date(),
      ok: res.ok,
    });
    runInBackground(c, flush);
  }
  return res;
});

// Run a best-effort task without blocking the response. When an execution context
// is present, `waitUntil` keeps the runtime alive until the task settles. This app
// is mounted on Vercel as a bare `export default app` (see api/index.ts), so
// `app.fetch` is invoked without a context and the access throws — we then fall
// back to fire-and-forget, where the task may not finish before the instance is
// frozen. That is acceptable for telemetry; the response is never gated on it.
function runInBackground(c: Context, task: Promise<void>): void {
  try {
    c.executionCtx.waitUntil(task);
  } catch {
    void task;
  }
}

// Any unexpected throw (e.g. server.connect, transport setup) would otherwise
// surface as Hono's default HTML 500, which a JSON-RPC client can't parse. Keep
// the error on the wire shaped as a JSON-RPC error so connectors fail cleanly.
app.onError((err, c) => {
  console.error('mcp-host: unhandled error', err);
  return c.json(
    { jsonrpc: '2.0', error: { code: -32603, message: 'Internal server error.' }, id: null },
    500,
  );
});

import { createServer } from '@jamesmccomish/mp-mcp';
import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js';
import { Hono } from 'hono';

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
  return transport.handleRequest(c.req.raw);
});

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

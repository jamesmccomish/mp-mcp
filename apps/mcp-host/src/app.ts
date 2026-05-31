import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js';
import { Hono } from 'hono';
import { createServer } from 'mp-mcp';

export const app = new Hono();

app.get('/health', (c) => c.json({ status: 'ok' }));

app.all('/mcp', async (c) => {
  // JSON responses (not SSE): stateless request/response only, and Vercel's
  // serverless runtime buffers open SSE streams until the function times out.
  const transport = new WebStandardStreamableHTTPServerTransport({
    enableJsonResponse: true,
  });
  const server = createServer();
  await server.connect(transport);
  return transport.handleRequest(c.req.raw);
});

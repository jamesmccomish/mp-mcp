# mcp-host

HTTP host for [mp-mcp](../../packages/mp-mcp), a Model Context Protocol server for UK Parliament data. Exposes a stateless streamable-HTTP `/mcp` endpoint suitable for use with the Anthropic MCP connector.

## Routes

- `GET /` — landing page
- `GET /health` — health check (`{ "status": "ok" }`)
- `POST /mcp` — stateless MCP endpoint (accepts JSON-RPC, responds with SSE)

## Running locally

```sh
pnpm --filter mcp-host dev
# Server starts at http://localhost:3000
```

## Testing

```sh
pnpm --filter mcp-host test
pnpm --filter mcp-host typecheck
```

## Vercel deployment

The `api/[[...route]].ts` handler and `vercel.json` rewrite rules are configured for Vercel's Node.js runtime. Exact routing is validated at deploy time (a later task).

## Attribution

Contains Parliamentary information licensed under the Open Parliament Licence v3.0.

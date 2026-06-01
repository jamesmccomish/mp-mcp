# mcp-host

HTTP host for [mp-mcp](../../packages/mp-mcp), a Model Context Protocol server for UK Parliament data. Exposes a stateless streamable-HTTP `/mcp` endpoint suitable for use with the Anthropic MCP connector.

## Routes

- `GET /` — landing page
- `GET /health` — health check (`{ "status": "ok" }`)
- `POST /mcp` — stateless streamable-HTTP MCP endpoint (JSON-RPC in, JSON-RPC out)
- `GET`/`DELETE /mcp` — `405 Method Not Allowed` (stateless mode has no standalone SSE stream or sessions to terminate)

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

`api/index.ts` exports the Hono app via the [`fetch` Web Standard](https://vercel.com/docs/functions/runtimes/node-js) so Vercel's Node.js runtime invokes it with an untouched Web `Request`. `vercel.json` rewrites `/mcp` and `/health` to the function and serves the landing page from `public/`.

## Attribution

Contains Parliamentary information licensed under the Open Parliament Licence v3.0.

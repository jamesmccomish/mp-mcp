# mcp-host

**An HTTP host for [`mp-mcp`](../../packages/mp-mcp).** It wraps the stdio-only Parliament MCP server behind a stateless streamable-HTTP `/mcp` endpoint so it can be reached over the MCP connector, and serves the demo's landing page.

The `mp-mcp` package itself speaks only stdio (it runs as a subprocess). The MCP connector — used by [`apps/agent-of-parliament`](../agent-of-parliament) — needs a URL it can call server-to-server. This host bridges the two: an unchanged `createServer()` from `mp-mcp`, exposed over HTTP.

## Routes

| Route | Behaviour |
| --- | --- |
| `GET /` | Landing page (served from `public/`). |
| `GET /health` | Health check — `{ "status": "ok" }`. |
| `POST /mcp` | Stateless streamable-HTTP MCP endpoint (JSON-RPC in, JSON-RPC out). |
| `GET` / `DELETE /mcp` | `405 Method Not Allowed` — stateless mode has no standalone SSE stream or sessions to terminate. |

## Architecture

A small [Hono](https://hono.dev) app ([`src/app.ts`](src/app.ts)). Each `POST /mcp` constructs a **fresh `mp-mcp` server and transport per request** — stateless mode (no session id generator), because the SDK forbids reusing a stateless transport across requests. The app is exported via the `fetch` Web Standard so it runs unchanged on a Node server locally ([`src/index.ts`](src/index.ts), via `@hono/node-server`) and on Vercel's Node runtime ([`api/index.ts`](api/index.ts)).

## Run locally

```bash
pnpm --filter mcp-host dev      # http://localhost:3000 (override with PORT)
```

Smoke-test the endpoint by listing the tools over JSON-RPC:

```bash
curl -s http://localhost:3000/mcp \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json, text/event-stream' \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}'
```

## Testing

```bash
pnpm --filter mcp-host test
pnpm --filter mcp-host typecheck
```

## Deploy (Vercel)

[`api/index.ts`](api/index.ts) exports the Hono app via the [`fetch` Web Standard](https://vercel.com/docs/functions/runtimes/node-js) so Vercel's Node runtime invokes it with an untouched Web `Request`. [`vercel.json`](vercel.json) rewrites `/mcp` and `/health` to the function and serves the landing page from `public/`.

---

Contains Parliamentary information licensed under the Open Parliament Licence v3.0. ([about the licence](https://www.parliament.uk/site-information/copyright-parliament/open-parliament-licence/))

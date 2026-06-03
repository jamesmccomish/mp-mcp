# Agent of Parliament

**Talk to Parliament.** A single-page browser app where you ask a UK Parliament question in plain English and watch the answer assemble itself — narrated in the chat, with the things it mentions (an MP, a vote, a debate, a topic) materialising as cited cards beside you, over a faint map of the UK that lights up the constituency you're talking about.

It is the showcase for [`mp-mcp`](../../packages/mp-mcp): the agent composes the server's tools into one coherent, fully-sourced answer, rendered as live generative UI rather than a wall of text.

## The experience

The felt loop is: **ask → watch it think → watch the answer build itself → poke at the pieces → ask again.** Each answer leaves behind objects that pull you toward the next question.

Three co-present layers:

- **The chat rail** — where you type and where the agent narrates. Prose stays short and points at the cards.
- **The card canvas** — where cards appear as the agent surfaces data, newest on top. A card isn't a dead summary; it's a live object you can expand and that re-opens the conversation. Four kinds:
  - **MP profile** — photo, party, constituency, recent activity, voting snapshot.
  - **Vote / division** — the motion and an aye/no split rendered as a division-lobby bar, with the party breakdown; a highlighted row when reached through a specific MP.
  - **Debate / Hansard** — an excerpt with speaker and date, plus a **Plain English toggle** that re-renders procedural language into a sentence a human would actually say.
  - **Topic dossier** — bills in progress, recent debates, recent votes, written questions, and active petitions on one issue.
- **The ambient map** — a quiet UK constituency map behind the canvas that softly illuminates the seat in focus. It is never a control.

Every factual line on every card carries an inline citation to a `parliament.uk` / `hansard.parliament.uk` URL — inherited directly from `mp-mcp`'s citation contract and non-negotiable.

## How it works

The app is **entirely client-side** — a Next.js 16 (App Router) single page, with no backend of its own beyond one optional telemetry route (see [Observability](#observability)).

1. You enter a question; the app makes one **streamed Anthropic Messages call** with the `mcp_servers` connector (beta `mcp-client-2025-11-20`) pointed at the deployed [`mcp-host`](../mcp-host) `/mcp` endpoint.
2. Anthropic runs the tool loop **server-to-server** — the browser never calls `/mcp` directly — and streams back `mcp_tool_use` / `mcp_tool_result` blocks alongside the narration.
3. [`lib/agent/transform.ts`](lib/agent/transform.ts) turns those raw stream events into typed UI events; [`lib/agent/cardRegistry.ts`](lib/agent/cardRegistry.ts) maps tool names to card kinds; adapters shape tool results into view-models.
4. Text deltas flow into the chat; tool results become cards.

> **Build note:** the app builds with **Webpack, not Turbopack**. Importing `client.beta` pulls in a Node-only chain (`beta → environments → worker → agent-toolset → node:fs/promises`) that never runs in the browser; [`next.config.mjs`](next.config.mjs) stubs those Node core modules out of the client bundle. Turbopack ignores that `webpack:` config and so fails on `node:fs/promises`. (Verified against `@anthropic-ai/sdk` 0.100.1.)

## Bring your own key

You run the app on **your own Anthropic API key**. It's held in the browser tab (`sessionStorage`), sent only to `api.anthropic.com`, and **never** to this app's origin or to `/mcp` — there is nothing for us to store or leak. It clears when the tab closes.

## Observability

Optional, off by default, and aimed at improving tool design and understanding token usage — not product analytics. When `NEXT_PUBLIC_TELEMETRY_ENABLED=true`, each turn is captured from the connector stream and written to [Langfuse](https://langfuse.com) as one trace per turn (grouped into a session per conversation):

- a **generation** with the model, token usage, and cache read/creation breakdown (Langfuse computes cost);
- a **client-side span per tool call** with the args, result size, `upstream_calls`, `truncated`, and citation count the browser can see;
- a **server-side span per tool call** from [`mcp-host`](../mcp-host) carrying accurate wall-clock latency, joined to the same trace.

The browser holds **no Langfuse credential**: it POSTs the captured turn to the [`/api/trace`](app/api/trace/route.ts) route handler, which writes to Langfuse with the server-side secret key (`LANGFUSE_SECRET_KEY` / `LANGFUSE_PUBLIC_KEY` / `LANGFUSE_BASEURL`). The two ends are linked by carrying the Langfuse `traceId` in the connector's `authorization_token` — the only field Anthropic forwards to the MCP server. See [`.env.example`](.env.example).

## Run locally

```bash
pnpm --filter agent-of-parliament dev     # http://localhost:3000
```

Point the app at an MCP host with `NEXT_PUBLIC_MCP_URL` (defaults to the deployed host). Build and start:

```bash
pnpm --filter agent-of-parliament build   # compiles mp-mcp first, then the Next.js app
pnpm --filter agent-of-parliament start
```

## Scripts

- **`scripts/probe-connector.mjs`** — reproduces the exact connector path the app uses and dumps every raw stream event, for debugging tool calls end-to-end:

  ```bash
  ANTHROPIC_API_KEY=sk-ant-... \
  MCP_URL=https://mp-mcp.org/mcp \
  node scripts/probe-connector.mjs "tell me about Keir Starmer"
  ```

  Look for `mcp_tool_use` blocks (the connector reached the server) and `mcp_tool_result` blocks (a tool returned). Text with no tool blocks means the model answered without tools.

- **`scripts/build-constituency-paths.mjs`** — regenerates `lib/map/constituencies.generated.ts` from ONS 2024 Westminster constituency boundaries (projected to SVG paths + centroids). Normal builds use the committed asset and need no network. The boundary data is Crown copyright / Ordnance Survey, under the Open Government Licence v3.0.

## Design

The visual language — warm paper and ink, a Commons-green rule, Order-Paper rhythm, Hansard-flavoured typography, and an original portcullis-inspired emblem (not the trademark-restricted official one) — is specified in [`docs/visual-brand.md`](../../docs/visual-brand.md).

---

Contains Parliamentary information licensed under the Open Parliament Licence v3.0. ([about the licence](https://www.parliament.uk/site-information/copyright-parliament/open-parliament-licence/))

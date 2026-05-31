# Agent of Parliament

A single-page browser app where a UK user asks Parliament questions in plain
English and watches cited cards assemble — MP profiles, votes, debates, and
topic dossiers.

## How it works

Entirely client-side. The browser makes one streamed Anthropic Messages call
with the `mcp_servers` connector pointed at the deployed [`mcp-host`](../mcp-host)
`/mcp` endpoint. Anthropic runs the tool loop server-to-server and streams back
`mcp_tool_use` / `mcp_tool_result` blocks, which the browser turns into live
cards beside the chat.

- **Bring your own key.** Your Anthropic key is stored in the browser tab
  (sessionStorage) and only ever sent to `api.anthropic.com`. The browser never
  calls `/mcp` directly — Anthropic does.
- **Every factual claim is cited** to parliament.uk / hansard.parliament.uk.

## Develop

```bash
pnpm --filter agent-of-parliament dev
```

Set the MCP host URL via `NEXT_PUBLIC_MCP_URL` (defaults to the deployed host).

Contains Parliamentary information licensed under the Open Parliament Licence v3.0.

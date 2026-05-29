# mp-mcp

Model Context Protocol server for UK Parliament data.

Status: pre-release. See [`docs/implementation-plan.md`](../../docs/implementation-plan.md)
for the milestone-driven build plan.

## Install (will work at M8)

```bash
claude mcp add mp-mcp -- npx -y mp-mcp
```

## Local development

```bash
pnpm install
pnpm --filter mp-mcp build      # one-off compile to dist/
pnpm --filter mp-mcp dev        # incremental tsc --watch into dist/
pnpm --filter mp-mcp test       # vitest
```

Once built, register the local artifact in Claude Code (the repo's
`.claude/settings.json` already does this under the `mp-mcp-local` name). With
`dev` running, edits recompile on save; restart the MCP client (or the inspector)
to pick up the new `dist/`.

### Inspect tool calls

Drive the server without a full Claude Code session using the MCP inspector:

```bash
pnpm --filter mp-mcp build
npx @modelcontextprotocol/inspector node packages/mp-mcp/dist/stdio.js
```

### Transport

stdio (JSON-RPC over stdin/stdout) only. There is no HTTP/SSE transport yet, so
`mcp-remote` and SSE clients are not supported — the server runs as a subprocess
via `bin: mp-mcp` (→ `dist/stdio.js`).

## Contributing

### Add a tool

The tool surface is intentionally small — prefer extending an existing tool over
adding one (see "Consolidate over multiply" in [`CLAUDE.md`](../../CLAUDE.md)).
When a new tool is genuinely warranted, scaffold it with the `/new-tool` command
([`.claude/commands/new-tool.md`](../../.claude/commands/new-tool.md)); it encodes
the full contract — Zod schema, `response_format` toggle, citation envelope,
registration, and snapshot test — so the pattern can't drift. Don't hand-roll one.

### Generated types

`src/generated/` is committed so the package installs offline (no network on
install). It is generated from the Parliament OpenAPI specs — regenerate with
`pnpm --filter mp-mcp gen:types` and never hand-edit those files.

## Citation contract

Every tool returns a `sources` array. Cite the URLs inline in any factual claim
to the user. The server's `instructions` field also surfaces this expectation
to the model on connection.

## Open Parliament Licence

Data is provided under the Open Parliament Licence v3.0. When this MCP's output
is surfaced to end users, attribute as:

> Contains Parliamentary information licensed under the Open Parliament Licence v3.0.

## License

MIT for the code. See the repo root [`LICENSE`](../../LICENSE).

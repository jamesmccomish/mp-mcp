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
pnpm --filter mp-mcp build
pnpm --filter mp-mcp test
```

Once built, register the local artifact in Claude Code (the repo's
`.claude/settings.json` already does this under the `mp-mcp-local` name).

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

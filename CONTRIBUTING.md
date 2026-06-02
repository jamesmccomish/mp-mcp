# Contributing to mp-mcp

Thanks for considering a contribution. This document covers the local development
workflow. For project conventions and architectural decisions, read [`CLAUDE.md`](CLAUDE.md)
and the ADRs under [`docs/adrs/`](docs/adrs).

## Prerequisites

- Node 22 LTS or newer (`.nvmrc` pins it)
- pnpm 10 or newer (the published target also works under Bun 1.x; see `package.json#engines`)
- A POSIX shell

## Setup

```bash
pnpm install
pnpm gen:types        # regenerate generated/ from upstream Swagger
pnpm build
pnpm test
```

## Adding an MCP tool

Use the `/new-tool <camelCaseName>` slash command in Claude Code; it enforces the
project's tool-design contract (Zod schema, response_format toggle, citation
discipline, snapshot test, server registration).

## Recording a decision

Use the `/new-adr <kebab-slug>` slash command. ADRs are append-only — when a
decision changes, write a new ADR that supersedes the old one rather than editing.

## Pull requests

- Keep each PR to one logical, self-contained change.
- Add a changeset (`pnpm changeset`) for any user-visible change.
- CI must be green (typecheck, lint, unit tests) before merge.
- Integration tests (`LIVE_APIS=1`) and the eval suite are run weekly and before each
  release, not on every PR.

## Code of conduct

See [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md).

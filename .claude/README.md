# `.claude/` — Project tooling for Claude Code

This directory configures Claude Code for working in this repo. Everything here is opt-in and project-specific.

## Contents

- **`settings.json`** — permissions allow-list for the project's routine `pnpm`/`git` commands, plus an `mcpServers` entry that registers the locally-built `mp-mcp` so you can test the MCP you're writing against Claude Code itself. Build first (`pnpm build`), then restart Claude Code to pick up the local MCP.

- **`commands/new-tool.md`** — `/new-tool <name>` scaffolds a new MCP tool following the project's conventions (Zod input schema, citation contract, `response_format` toggle, snapshot test, registration in the index).

- **`commands/new-adr.md`** — `/new-adr <slug>` appends the next-numbered ADR to `docs/adrs/` using the template.

- **`agents/tool-description-reviewer.md`** — read-only sub-agent that critiques MCP tool descriptions against Anthropic's principles plus this project's citation contract. Spawn it when iterating on descriptions during M7 (eval + tuning) or any time a tool isn't being selected correctly.

## Conventions

- Slash commands take their arguments via `$ARGUMENTS`.
- Sub-agents under `agents/` are read-only by design — they review and suggest; the main agent edits. Keeps the responsibility clear.
- This folder isn't an `mcpServers` registry for *consuming* MCPs (that lives in user-level config); it's project-scoped tooling for *building* the MCP.

## What's deliberately not here

Pre-commit checks (typecheck, lint, knip) belong in `lefthook` / `husky` at the repo level, not as Claude Code hooks — they should run on `git commit`, not on every edit. No default-model pin either; that's a user-level decision.

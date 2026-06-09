# `.claude/` — Project tooling for Claude Code

This directory configures Claude Code for working in this repo. Everything here is opt-in and project-specific.

Shared project memory and reusable agent prompts live in `.agents/`. Keep this directory to Claude Code-specific wrappers and settings.

## Contents

- **`settings.json`** — permissions allow-list for the project's routine `pnpm`/`git` commands, plus an `mcpServers` entry that registers the locally-built `mp-mcp` so you can test the MCP you're writing against Claude Code itself. Build first (`pnpm build`), then restart Claude Code to pick up the local MCP.

- **`commands/new-tool.md`** — `/new-tool <name>` wraps the shared `.agents/skills/new-tool/SKILL.md` workflow.

- **`commands/new-adr.md`** — `/new-adr <slug>` wraps the shared `.agents/skills/new-adr/SKILL.md` workflow.

- **`commands/release-package.md`** — `/release-package [bump] [summary]` wraps the shared `.agents/skills/release-package/SKILL.md` workflow.

- **`agents/tool-description-reviewer.md`** — read-only sub-agent wrapper for the shared `.agents/tool-description-reviewer.md` instructions. Spawn it when iterating on tool descriptions, or any time a tool isn't being selected correctly.

## Conventions

- Slash commands take their arguments via `$ARGUMENTS`.
- Slash commands are adapters only. Keep workflow instructions in `.agents/skills/`.
- Sub-agents under `agents/` are read-only by design — they review and suggest; the main agent edits. Keeps the responsibility clear.
- Do not copy long prompts here; put reusable instructions in `.agents/` and point to them.
- This folder isn't an `mcpServers` registry for *consuming* MCPs (that lives in user-level config); it's project-scoped tooling for *building* the MCP.

## What's deliberately not here

Pre-commit checks (typecheck, lint, knip) belong in `lefthook` / `husky` at the repo level, not as Claude Code hooks — they should run on `git commit`, not on every edit. No default-model pin either; that's a user-level decision.

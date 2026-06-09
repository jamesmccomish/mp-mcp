# `.codex/` — Project tooling for Codex

This directory configures Codex for working in this repo. Keep assistant-specific wrappers thin and put reusable instructions under `.agents/`.

## Contents

- **`config.toml`** — MCP server entries for the published `mp-mcp` package and the local build.
- **`agents/tool-description-reviewer.toml`** — Codex wrapper for the shared `.agents/tool-description-reviewer.md` instructions.
- **`.agents/skills/`** — repo skills Codex can invoke as `$new-tool`, `$new-adr`, and `$release-package`.

## Conventions

- Prefer shared files in `.agents/` over copying long prompts between assistants.
- Keep Codex agent TOML wrappers small: name, short description, and a pointer to shared instructions.
- Use repo skills for reusable Codex workflows. Custom prompts are deprecated and local-only.
- Project conventions live in `AGENTS.md`; `CLAUDE.md` is the Claude Code entry point.

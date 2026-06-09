# `.agents/` — Shared coding-assistant instructions

This directory holds assistant-neutral project memory and reusable agent prompts.

Use thin wrappers in `.claude/` and `.codex/` when a client needs its own file format. Do not copy long prompts between assistant-specific directories.

## Contents

- **`project.md`** — shared project memory read from `AGENTS.md` and `CLAUDE.md`.
- **`tool-description-reviewer.md`** — shared reviewer instructions used by Claude Code and Codex wrappers.
- **`skills/new-tool/SKILL.md`** — shared workflow for adding an MCP tool. Codex can invoke it as `$new-tool`; Claude Code exposes the same workflow through `/new-tool`.
- **`skills/new-adr/SKILL.md`** — shared workflow for appending a numbered ADR. Codex can invoke it as `$new-adr`; Claude Code exposes the same workflow through `/new-adr`.
- **`skills/release-package/SKILL.md`** — shared workflow for adding a changeset and verifying package release readiness. Codex can invoke it as `$release-package`; Claude Code exposes the same workflow through `/release-package`.

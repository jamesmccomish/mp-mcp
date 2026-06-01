# mp-mcp

## Mission

Build `mp-mcp`, a public, npm-publishable MCP server for UK Parliament data. 

A demo app will eventually live in `apps/`; it is stubbed for now and out of scope for this build.

## Entry points

- **Decisions** — `docs/adrs/`. Append-only Architecture Decision Records. Empty at M0; add an ADR when a non-obvious decision is locked.

## Current milestone

**M7 — Eval suite scaffold.** M0–M7 closed; M8 (publish prep) is next. Bump this line when a milestone closes.

## Conventions (non-negotiable)

- **Anthropic's latest standards.** When in doubt, cite the most current Anthropic engineering posts on tool design and MCP. The plan reflects: *Writing effective tools for agents* (Sep 2025), *Code execution with MCP* (Nov 2025), *Advanced tool use on the Claude Developer Platform* (Nov 2025).
- **Citation contract.** Every tool response includes a `sources` array of parliament.uk / hansard.parliament.uk URLs. Every user-facing factual claim cites them inline. This is the credibility lever for the entire project.
- **Consolidate over multiply.** Default answer to "should we add a tool?" is no; add one only if the eval set proves a gap.
- **Ask before going wide.** When audience, scope, or depth is ambiguous, raise a clarifying question rather than guessing.
- **No emojis in deliverables.**

## Stack (locked — full rationale in `implementation-plan.md` §1)

- pnpm workspaces; TypeScript 5.6+ strict; Node 22 published target; Bun supported as a dev runtime (CI matrix verifies both)
- `@modelcontextprotocol/sdk`, Zod (schema), openapi-typescript (codegen), pino (logging), `tsc` (build — ESM-only, Node 22+ target)
- Biome (lint/format), Vitest (test), knip (dead code), publint + `@arethetypeswrong/cli` (publish-shape)
- Changesets (versioning), GitHub Actions (CI)
- MIT license for the code; Parliament data is under the **Open Parliament Licence v3.0** — attribution mandatory in the server `instructions` field and the README

## Repo shape

```
packages/mp-mcp/           # THE BUILD — see docs/implementation-plan.md §2
apps/[demo-app-name]/      # stubbed for now; name TBD
docs/adrs/                 # append-only as decisions are locked
```

## Maintenance protocol

When a milestone closes:
1. Bump the "Current milestone" line above.
2. If a substantive or non-obvious decision was locked during the milestone, add a numbered ADR under `docs/adrs/`.
3. Add a changeset describing the user-visible change.
4. Open a PR; CI (Node 22 + Bun matrix) gates merge.

Keep this file under ~60 lines. If it grows past that, push detail into `docs/implementation-plan.md` and leave a one-line pointer here.
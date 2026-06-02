# mp-mcp evals

An append-only eval set that exercises the MCP end-to-end through a real
Claude API call. It grows as tools and steering evolve (see ADR-0004) — there
is no fixed task count. Categories:

- **postcode-report** — Postcode/name → MP report card
- **voting** — Divisions and per-member voting records (incl. Lords, rebellions)
- **topic** — Cross-Parliament topic tracking and bill drill-ins
- **reference** — Structural lookups (parties, ministers, elections)
- **trap** — Prompts the agent should NOT call the MCP for

The full list is in [`tasks.ts`](./tasks.ts). When you add a tool or refine
steering, add at least one task in the matching category; `tests/unit/evalTasks.test.ts`
checks integrity (unique ids, known categories, every task verifiable), not a count.

## Running

```bash
ANTHROPIC_API_KEY=sk-ant-... pnpm --filter mp-mcp eval
```

Optional environment:

- `MP_MCP_EVAL_MODEL` — the model under test (default `claude-opus-4-7`).
- `MP_MCP_JUDGE_MODEL` — the LLM-as-judge model (default `claude-haiku-4-5-20251001`).

Costs real Anthropic API tokens — the full set is roughly 200–400K input
tokens depending on the model. Run sparingly. The runner writes a
markdown report to `evals/reports/<YYYY-MM-DD>.md` summarising:

- Overall pass rate
- Tokens consumed
- Per-tool call frequency and error rate
- Per-task pass/fail with the model's final response inline

## How verification works

Each task can have any combination of:

- `expected_tools` — names that should appear in the tool-call sequence
- `forbidden_tools` — names that should not appear (used by trap prompts)
- `must_include` / `must_not_include` — substring checks on the final text
- `judge` — LLM-as-judge with a stated criterion. The judge uses
  `MP_MCP_JUDGE_MODEL` (Haiku by default for cost).

A task passes when zero substring/tool-name issues fired and the judge
returned PASS.

## Filtering

You can run a single task or a single category:

```bash
ANTHROPIC_API_KEY=... pnpm --filter mp-mcp eval A1
ANTHROPIC_API_KEY=... pnpm --filter mp-mcp eval voting
```

## CI

The eval set is **not** part of the default CI run — it requires an API
key and costs money on every PR. Run it weekly and before every release;
commit the report under `evals/reports/`.

## Tuning loop

When a task fails, the failure usually traces to one of:

1. **Tool description wasn't selected** — the agent picked a sibling tool
   or no tool. Iterate on the description; use the
   `tool-description-reviewer` sub-agent (under `.claude/agents/`).
2. **Tool selected but inputs were wrong** — the parameter descriptions or
   schema constraints aren't tight enough. Tighten the Zod schema or its
   `.describe()`.
3. **Tool returned the right data but the model didn't use it correctly** —
   the response envelope shape is too verbose or the citation contract
   isn't surfacing. Tweak `domain/` mappers or the response_format shapes.

Re-run the eval, commit a fresh report, document the delta in the next
release notes.

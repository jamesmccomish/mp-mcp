# ADR-0004: Eval suite is the tool-selection contract

Status: Accepted
Date: 2026-05-29

## Context

"Consolidate over multiply" keeps the tool surface small (~10 tools), which only
works if each tool's description reliably steers the model to the right choice.
Description quality is otherwise untestable and regresses silently as the surface
evolves. M7 landed an eval scaffold (commit `d5785d1`: "20 seed tasks + runner").

## Decision

Treat the eval suite as the contract for tool selection: seed tasks in
`evals/tasks.ts` declare an `expected_tools` list, and the runner asserts the
model picks them. Description and steering changes (the "Good for / Wrong for"
blocks) are validated against the eval set, not by inspection alone.

## Consequences

- A description edit that degrades tool selection is caught by the suite rather
  than discovered in production.
- New tools and steering refinements are expected to ship with eval tasks, so the
  contract grows alongside the surface.
- Trade-off: a full run is token-expensive (the eval README notes roughly
  200–400K input tokens per run against real Anthropic APIs), so it runs
  deliberately — weekly and before releases — not on every commit. A smaller
  smoke subset is a noted follow-up.

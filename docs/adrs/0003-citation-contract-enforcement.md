# ADR-0003: Citation contract enforced by the type system

Status: Accepted
Date: 2026-05-29

## Context

Credibility is the project's core lever — `CLAUDE.md` calls the citation contract
"the credibility lever for the entire project". The standing risk is a tool
author returning factual data without the parliament.uk / hansard.parliament.uk
URLs the agent needs to cite it, silently weakening every downstream answer.

## Decision

Every tool returns `ToolResponse<T> = { data, sources, meta? }` with `sources`
**non-optional**, and all URLs are built only through the `Citations.*` factories
in `lib/citations.ts` — surfaced through the shared `collectSources` helper in
`lib/buildSources.ts`. No ad-hoc URL construction in tool code. The server's
`instructions` field preloads the contract on connection.

## Consequences

- A tool that forgets to populate `sources` fails to compile, so the friction
  lands on the wrong path rather than the right one.
- URL formats live in one module: an upstream path change is a single edit, and
  "is everything cited the same way" is mechanically true instead of a review
  checklist item.
- Trade-off: a tool that legitimately has nothing to cite (e.g. `ping`) must
  return `sources: []` explicitly — mild noise on a health check, and the reason
  `ping` is the one tool that bypasses the `registerTool` wrapper.

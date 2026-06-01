# ADR-0006: A dedicated divisions-search tool for party/topic vote questions

Status: Accepted
Date: 2026-06-01

## Context

The eval set has a class of question that failed outright. The 2026-06-01 report
([packages/mp-mcp/evals/reports/2026-06-01.md](../../packages/mp-mcp/evals/reports/2026-06-01.md))
shows task **B3** — _"How did Conservatives vote on the latest tax measure?"_ —
burning 233K input tokens across an 8-turn loop to an empty answer. The agent had
no tool that answers a **party-level** or **topic-level** vote question.

This ADR supersedes the proposed (chaining-only, no-new-tool) approach on the
`adr-0005-bill-vote-resolution` branch. All findings below were verified live
against the upstream APIs and cross-checked against the committed OpenAPI types
in `src/generated/` (per ADR-0002).

## Root cause (verified)

1. **`topic_tracker` wrapped its division search in the lookback date window.** The
   plain `divisions.json/search?searchTerm=tax` returns real tax divisions, but
   adding `startDate` (90 days back) drops it to **0** — the matching divisions
   sit just outside the window. The window, not the search, was the bug.
2. **`division_id` was hidden in `topic_tracker`'s concise mode**, so even a found
   division could not be chained into `parliament_get_division`.
3. **`member_voting_history` raised `QUERY_TOO_BROAD` impossibly** — it post-filtered
   a recency-capped Members-API fetch by title substring, and is a per-member tool
   anyway, wrong for a party question. The agent had nowhere else to go.

## Endpoint facts that shaped the decision (verified)

- **The party split is reliable via the detail endpoint.** `division/2257.json`
  tallied by party = `Conservative: 85 no`, `Labour: 273 aye`. This is exactly
  what `parliament_get_division` already does, given a `division_id`.
- **`/groupedbyparty` is NOT reliable and was rejected.** `groupedbyparty?searchTerm=tax`
  returns **0** while plain `search?searchTerm=tax` returns results — same term,
  different endpoint. The "one-call party breakdown" idea is the fragile path.
- **`divisions.json/membervoting`** filters a single member's record server-side
  (`searchTerm`/`startDate`/`endDate`) and returns the lobby per division
  directly — cheap and complete for the per-member case (caveat: it reports only
  lobbies cast, so abstentions/absences do not appear and are surfaced honestly).
- **Inherent limit:** the division search matches a literal title substring, so
  `tax` won't match "Finance (No. 2) Bill" and `VAT` won't match "Value added
  tax". No vector store fixes this for votes — even i-dot-ai's semantic-search
  MCP does not index divisions at all. It does not block B3: `search("tax")`
  returns Council Tax / Budget tax divisions, each drillable for the party split.

## Decision

Add a focused 11th tool, **`parliament_search_divisions`**, rather than route
vote questions through `topic_tracker`'s 5-way fan-out. It searches Commons
divisions by topic (no forced date window) and returns `division_id` + title +
date + aye/no counts; the agent chains the `division_id` into
`parliament_get_division` for the by-party breakdown. The votes family is now
delineated by intent:

- `parliament_search_divisions` — find divisions on a topic / "how did a party vote on X" (entry point; no `member_id`).
- `parliament_member_voting_history` — one MP's record (rerouted to `membervoting`, server-filtered, soft-empty instead of an error).
- `parliament_get_division` — full detail of one division by id (party tallies + per-MP lists).
- `parliament_topic_tracker` — cross-domain digest; `recent_votes` is a teaser carrying `division_id`.

This honors "consolidate over multiply": the new tool is justified by an
eval-proven surface gap (B3/B4 had no home), keeps names intent-led, avoids
`member_id` overlap, and is token-light (party counts, never rosters). The B3
chain was verified live: `search_divisions("tax")` → `get_division(2257)` →
`Conservative: 85 no`.

## Consequences

- B3/B4 are answerable; the per-member path (B1/B2/B5) is server-filtered and no
  longer raises an impossible error.
- `topic_tracker` no longer date-windows its division search, always surfaces
  `division_id`, and filters petitions client-side (the petitions API ignores its
  `search` param).
- Commons and Lords voting use different upstream sources until a Lords follow-up
  wires the symmetric Lords Votes endpoints.
- `groupedbyparty` is explicitly not used (unreliable); the party split stays in
  `get_division`. The literal-substring search limit is documented in the tool
  description, which steers the agent toward title-accurate terms.
- The eval contract grows with the surface: B3/B4 `expected_tools` now point to
  `parliament_search_divisions` (per ADR-0004).

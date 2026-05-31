# ADR-0005: Resolving bill/topic vote questions at the data layer

Status: Proposed
Date: 2026-05-31

## Context

A whole class of question currently fails or answers untruthfully:

- "Did [MP] vote for/on [bill or topic]?" (eval **B2**: _"Did Diane Abbott vote
  for the Renters' Rights Bill?"_, `evals/tasks.ts:98`)
- "Explain the last vote on [bill]." / "Find votes about [topic]." (eval **B4**
  _"Find votes about AI in the last year."_ `:118`; **C3** _"What's happening
  with the renters' rights bill?"_ `:160`)

These should resolve to a specific Commons division and — for the per-member
case — that member's lobby, so a vote card can be rendered and the answer is
true. The eval set already maps B2/B4/C3 to existing tools, so the gap is in the
**data layer of those tools**, not a missing tool.

All findings below were verified live against the upstream APIs and cross-checked
against the committed OpenAPI types in `src/generated/` (per ADR-0002).

## Root cause

**1. `parliament_member_voting_history` filters after a recency-capped fetch.**
It is built on the Members API `/Members/{id}/Voting`, which — per its own spec —
accepts only `house` + `page` (`generated/members.d.ts:1654-1657`). There is no
server-side topic or date parameter. So the tool pages a recency-capped window
(`cap = min(limit*4, 500)`, `memberVotingHistory.ts:60-69`; the endpoint also
ignores the client's `take`/`skip`, `clients/members.ts:140-152`) and then
applies the topic/date filter in memory (`applyFilters`, `:109-121`). Divisions
older than the window are unreachable, and the `QUERY_TOO_BROAD` hint to "widen
the date range" (`:73-79`) **cannot work**, because filtering happens after the
fetch — a wider range pulls in nothing older.

**2. `parliament_topic_tracker` searches divisions by a punctuation-sensitive
literal substring of the raw topic.** It passes `searchTerm: input.topic` to the
Commons Votes `divisions/search` endpoint (`topicTracker.ts:86-91`). That search
is a case-insensitive **but punctuation-sensitive literal substring** match
against the division title. Verified against the Renters' Rights Bill:

| `searchTerm` | results (2023-01-01 → 2026-05-31) |
|---|---|
| `Renters` | 16 (every stage) |
| `Renters' Rights` (straight quote) | 6 — only titles using `'` |
| `Renters' Rights` (curly quote `'`) | 7 — only titles using `'` |
| `renters rights` (no apostrophe) | **0** |

The earlier hypothesis ("bill-stage division titles don't contain the bill
name") is **wrong**: titles _are_ bill-prefixed (e.g. _"Renters' Rights Bill:
Motion to disagree with Lords Amendment 64"_, _"…Third Reading"_, _"…Report
Stage: Amendment 3"_). The real cause is that the upstream's own titles mix
apostrophe glyphs (straight `'` on the 2025-01-14 divisions, curly `'` on the
2025-09-08 divisions), so any query containing an apostrophe matches only one
glyph family. With `lookback_days=365` (window start 2025-05-31) the
straight-quote divisions fall outside the window and the in-window curly-quote
divisions don't match the user's straight apostrophe → `recent_votes: []`.

**3. `parliament_get_division` downloads the full member roster.** A single
division detail (`/division/{id}.json`) is large — Division 2166 is **132 KB /
~600 member objects**. In `detailed` mode `get_division` streams the full
`ayes_members`/`noes_members` lists into context (`getDivision.ts:60-71`). The
"obvious" way to answer _did member X vote_ — fetch detailed divisions and scan
~600 members — is therefore expensive in context. (Note: `concise` mode already
returns only party tallies, so its 132 KB cost is upstream bandwidth, not model
context.)

**4. `topic_tracker`'s petitions branch is not topic-filtered.** It passes
`search` to `/petitions.json` (`clients/petitions.ts:36-44`), which **silently
ignores it** — only `state`/`page` are honored. Verified: `search=welfare` and
`search=renters` return the identical petitions (_"Dissolve Parliament…"_, _"Make
a public animal abuser register…"_). Returning unrelated petitions under a topic
heading is actively misleading. (Correction to the original report: the
**written-questions** branch is fine — `searchTerm` _is_ honored upstream,
verified `renters` total=1306 vs `welfare` total=12773 — so it is not part of
this bug.)

## Upstream capabilities verified (what enables the fix)

- **Commons Votes `GET /data/divisions.json/membervoting`** (`generated/commons-votes.d.ts:43`,
  params `:200-235`) takes `memberId` (required) **plus server-side
  `searchTerm`, `startDate`, `endDate`, `divisionNumber`,
  `includeWhenMemberWasTeller`, `take`/`skip`**. It returns
  `MemberVotingRecord = { MemberId, MemberVotedAye, MemberVotedNo,
  MemberWasTeller, PublishedDivision }` (`:236-243`). Verified live: member 172 +
  `searchTerm=Renters` returns **15 records with her lobby per division**, and
  the embedded `PublishedDivision.Ayes/Noes` arrays come back **empty** (summary
  only) — 20 KB for 15 records; the welfare query was **2.7 KB for 25 records**.
  This answers the per-member question directly, server-side-filtered (old
  divisions reachable), and cheaply (no 600-member lists). Caveat: it returns
  only lobbies actually cast — a member recorded under `NoVoteRecorded`
  (abstain/absent) does **not** appear. (Confirmed: Abbott is in
  `NoVoteRecorded` for Division 2166, which is why `searchTerm=welfare` omits it.)

- **Commons Votes `GET /data/divisions.json/groupedbyparty`** (`:23`) takes the
  same filters and returns party-level Aye/No counts only (`PartyVoteResult[]`,
  `:178-199`) — no member lists.

- **No bill→division join exists upstream.** The Bills API exposes a bill's
  stages with sitting **dates** only — no division references (verified: bill
  3764's `/Stages` payload contains no "division"; `generated/bills.d.ts` has no
  divisions sub-resource). The **only** linkage from a bill to its Commons
  divisions is the bill-prefixed division **title** (plus the stage sitting
  dates, usable to bracket a date range).

- The **Lords Votes API is symmetric** (`generated/lords-votes.d.ts:197`
  `membervoting`, `:267` `groupedbyparty`) but has no wired client yet.

## Options

**Option 1 — Fix the data layer of the existing tools (no new tool). [Recommended]**
Reroute `member_voting_history` (commons) to `membervoting`; make
`topic_tracker`'s division discovery bill-aware and punctuation-robust; fix the
petitions branch.
- Pros: fixes all four failures at the source; honors "consolidate over
  multiply"; small payloads; B2/B4/C3 pass through the tool chains the evals
  already expect; citation contract unchanged (still `votes.parliament.uk`
  division URLs via `Citations.division`).
- Cons: commons voting is now sourced from the Commons Votes API while lords
  stays on the Members API until a follow-up (two code paths by `assembly`);
  `membervoting` omits abstentions/absences, which must be surfaced honestly;
  introduces one heuristic (a search-term normalizer).

**Option 2 — Add a `parliament_bill_votes` tool** (bill → its divisions, with an
optional `member_id` for the lobby).
- Pros: makes the bill a first-class unit; encapsulates the title+date heuristic
  in one place.
- Cons: violates "consolidate over multiply" with no eval-proven _surface_ gap —
  the evals map B2/C3 to `member_voting_history`/`topic_tracker`, and the proven
  gap is those tools' data layer. Would duplicate logic and require re-pointing
  the eval `expected_tools`. More surface to cite and maintain.

**Option 3 — Add `parliament_list_policy_areas`** (the plan's pre-registered
10th tool, `implementation-plan.md:494`) to canonicalise topic keywords.
- Pros: directly targets "topic_tracker picks bad keywords"; already on the
  roadmap as conditional headroom.
- Cons: does nothing for bug #1 (recency cap) or #3 (payload); papers over a
  literal-substring defect that is better fixed by normalising the term in place;
  a member's old votes and abstentions remain unreachable.

## Decision (recommended)

Adopt **Option 1**. Concrete changes:

**Client — `src/clients/commonsVotes.ts`**
- Add `getMemberVoting(params)` → `GET /data/divisions.json/membervoting` with
  query keys `queryParameters.memberId` (req), `.searchTerm`, `.startDate`,
  `.endDate`, `.divisionNumber`, `.includeWhenMemberWasTeller`, `.take`,
  `.skip`. Return `RawMemberVotingRecord[]` where `RawMemberVotingRecord =
  { MemberId; MemberVotedAye; MemberVotedNo; MemberWasTeller; PublishedDivision:
  RawDivisionSummary }`. Map only the summary fields of `PublishedDivision`;
  discard `Ayes`/`Noes` (they arrive empty).

**Mapper — `src/tools/_voteMapper.ts`**
- Add `mapVoteFromMemberVotingRecord(r): MemberVote` mirroring the existing
  `mapVoteFromRaw`: `vote = MemberWasTeller ? 'teller' : MemberVotedAye ? 'aye' :
  MemberVotedNo ? 'no' : 'absent'`; `division_id = PublishedDivision.DivisionId`,
  `division_number = .Number`, `title/date`, `ayes/noes = .AyeCount/.NoCount`,
  `passed = AyeCount > NoCount`, `house = 'Commons'`.

**Tool — `src/tools/memberVotingHistory.ts`**
- For `assembly: 'commons'`, replace the recency-capped fan-out +
  `applyFilters` with a single `getMemberVoting({ memberId, searchTerm:
  normalize(topic), startDate: from_date, endDate: to_date, take: limit,
  includeWhenMemberWasTeller: true })`. Lords keeps the current Members-API path
  (documented; lords reroute is a follow-up).
- Replace the `QUERY_TOO_BROAD` throw with a **soft empty result** plus a meta
  hint: an empty set now legitimately means "no recorded aye/no by this member
  matched" (they may have abstained/been absent, or the term is too specific —
  note that the title match is literal). No more impossible "widen the date
  range" advice.
- Keep the `sources` array built via `Citations.division(...)`.

**Tool — `src/tools/topicTracker.ts`**
- Derive the division search term from the matched bill when one is found:
  `searchTerm = normalize(matchedBill?.shortTitle ?? topic)`. Optionally widen
  the division-search window to the matched bill's Commons stage-sitting span
  (one extra Bills `/Stages` call; the tool's fan-out cap is 12 and currently
  uses 5, so there is headroom).
- Petitions branch: since `/petitions.json` ignores `search`, fetch open
  petitions and **filter client-side** by matching the topic against
  `action`/`background`; if none match, omit petitions rather than return
  unrelated ones. (Written-questions branch unchanged — already correct.)

**Shared helper — `src/lib/` (new, e.g. `commonsVotesSearchTerm.ts`)**
- `normalize(phrase)`: truncate at the first apostrophe/quote variant (straight
  or curly) and strip a trailing `Bill`/`Act`, yielding the punctuation-free
  distinctive lead (`"Renters' Rights Bill"` → `"Renters"`; `"NHS waiting lists"`
  → unchanged; `"AI"` → `"AI"`). This is the one heuristic; it is local, pure,
  and unit-tested against the verified Renters glyph cases.

**Not in scope (documented):** `get_division` is unchanged. The expensive
per-member workaround it enabled disappears because the per-member path now uses
`membervoting` and never scans a roster. A future optimisation could back
`get_division` `concise` mode with `groupedbyparty` to cut upstream bandwidth,
but that needs the division *number* (not id) threaded through and is deferred.

## Test plan (Vitest; `packages/mp-mcp/tests`, undici `MockAgent`, fixtures in `tests/fixtures`)

Unit:
- `commonsVotes` client: `getMemberVoting` builds the correct
  `queryParameters.*` query and maps records, dropping embedded rosters.
- `commonsVotesSearchTerm`: table test — straight/curly `"Renters' Rights"` and
  `"Renters' Rights Bill"` → `"Renters"`; `"NHS waiting lists"` → unchanged;
  `"AI"` → `"AI"`.
- `memberVotingHistory`: with `topic`+`from/to`, asserts a single
  `membervoting` call carrying server-side params (no recency loop); maps the
  lobby; empty match → soft empty + meta hint, **not** a `QUERY_TOO_BROAD`
  throw. Fixture captured from the live `membervoting` responses (Renters,
  welfare).
- `topicTracker`: when `searchBills` returns a bill, the division search uses the
  normalised short title; `recent_votes` is populated for the Renters fixture;
  petitions filtered client-side (welfare fixture → the "Dissolve Parliament"
  noise is dropped).
- `getDivision`: regression guard — concise = party tallies, detailed = member
  lists (behaviour unchanged).

Integration (`tests/integration`, live):
- `member_voting_history(172, topic: "Renters")` → ≥1 Renters division with an
  aye/no and a `votes.parliament.uk` source.
- `topic_tracker("Renters' Rights", 365)` → non-empty `recent_votes`.

Eval (`evals/tasks.ts` + `tests/unit/evalTasks.test.ts`): B2, B4, C3 expected to
pass; add replay fixtures for the runner.

## Decisions to confirm before implementation

1. **Search-term normaliser** (truncate at apostrophe/quote + strip trailing
   `Bill`/`Act`): accept this local heuristic, or prefer Option 3's
   `list_policy_areas`? (Recommend the normaliser — local, testable, fixes #1
   and #2 together.)
2. **`member_voting_history` empty match**: soft empty + honest hint
   (recommended) vs. an error; and whether to add an abstain/absence cross-check
   now (recommend defer — `get_division` can confirm absence on demand).
3. **Petitions branch**: client-side filter (recommended) vs. drop petitions from
   `topic_tracker` vs. document-only.
4. **Lords**: this ADR fixes commons (the default and the failing case). Apply
   the symmetric Lords Votes endpoints in a follow-up, or now?
5. **PR scope**: land this ADR for review and implement on approval
   (recommended, per the milestone protocol), or implement the recommendation
   behind tests in the same PR?

## Consequences

- The failing question class is fixed at the data layer; no new tool (consolidate
  over multiply holds). B2/B4/C3 pass through the tool chains the evals already
  expect.
- Payloads stay small: the per-member path returns the member's lobby directly
  and never streams a roster into context.
- One nuance is made explicit: `membervoting` reports only votes cast, so
  abstentions/absences are surfaced honestly rather than silently.
- Commons and Lords voting use different upstream sources until the Lords
  follow-up lands.
- One documented heuristic (the search-term normaliser) enters the codebase,
  covered by unit tests against the verified glyph cases.
- The citation contract is unchanged: every affected tool still returns
  `votes.parliament.uk` / `petition.parliament.uk` URLs via the `Citations.*`
  factories.

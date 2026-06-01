---
"mp-mcp": minor
---

Add `parliament_search_divisions` and fix the vote/topic resolution path so party-level and topic-filtered vote questions ("How did Conservatives vote on the latest tax measure?") are answerable.

- **New tool `parliament_search_divisions`**: finds Commons divisions on a topic via the Commons Votes `divisions.json/search` endpoint and returns each with its `division_id`, title, date, and aye/no counts. Chain the `division_id` into `parliament_get_division` for the by-party (and per-MP) breakdown. Token-light: counts only, never member rosters.
- **`parliament_member_voting_history` (commons)** now uses the Commons Votes `divisions.json/membervoting` endpoint, which filters by topic and date **server-side** and returns the member's lobby per division directly. This removes the previous recency-capped fetch + in-memory title filter that raised an impossible `QUERY_TOO_BROAD` ("widen the date range" could never help, because filtering happened after the fetch). An empty result is now a truthful soft answer (the member abstained/was absent, or the literal term was too specific), not an error. Lords keeps the Members-API path for now.
- **`parliament_topic_tracker`**: its division search no longer applies the lookback date window (the window silently zeroed common topics such as "tax" whose matching divisions sit just outside the window); `recent_votes` now always carries `division_id` for chaining; and petitions are filtered client-side against the topic (the petitions API ignores its `search` parameter, so unrelated petitions previously appeared under the topic heading).

---
"@jamesmccomish/mp-mcp": minor
---

BREAKING: parliament_search_hansard now has two modes. Without member_id it returns debate titles (each with a debate_ext_id to chain into parliament_get_debate) for topic discovery; with member_id it returns that member's contribution excerpts. The SearchHansardData response shape changed accordingly — `total_contributions` / `total_written_answers` / `total_debates` / `hits` are replaced by `mode`, `total`, `debates`, and `contributions`, and a new `HansardDebateHit` type is exported. parliament_topic_tracker now bounds its fan-out with a shared deadline so a slow upstream can't stall the whole call.

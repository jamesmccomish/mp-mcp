---
"mp-mcp": patch
---

Fix `parliament_search_hansard` ignoring the search term. The Hansard client sent `searchTerm`, `startDate`, `endDate`, `take`, and `skip` as bare query parameters, but the Hansard API binds every search field under a `queryParameters.` prefix (confirmed against the committed OpenAPI contract in `src/generated/hansard.d.ts`). The bare keys were silently dropped, so every query returned the same unfiltered, most-recent global contributions and reported the global Hansard total as `total_contributions`. All search parameters are now namespaced correctly, so the term, date range, chamber, and result limit are honoured. The same bug affected the Hansard debate search behind `parliament_topic_tracker`, whose recent-debates column was likewise unfiltered; it is fixed too.

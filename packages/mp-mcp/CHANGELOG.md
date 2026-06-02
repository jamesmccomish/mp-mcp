# mp-mcp

## 0.1.0

### Minor Changes

- 8e43fc0: Initial public release of `mp-mcp` — a Model Context Protocol server that makes UK Parliament data agent-friendly.

  - **15 intent-led tools** spanning members and constituencies (find by name/constituency/postcode), member overviews and voting history, Hansard search and full debates, divisions (search, full by-party/per-member breakdown, rebellion signal; Commons and Lords), bills, committees, the Register of Members' Financial Interests, state of the parties, ministerial and shadow roles, and election results.
  - **4 prompts** — `mp-report-card`, `topic-tracker`, `draft-constituent-letter`, `vote-explainer` — that package common multi-tool workflows.
  - **Citation contract** — every tool response is a `{ data, sources, meta? }` envelope carrying `parliament.uk` / `hansard.parliament.uk` source URLs, and the server's `instructions` field steers consumers to cite them inline.
  - ESM-only, Node 22+. Type definitions exported for the package, the `mp-mcp/stdio` binary, and a `mp-mcp/types` subpath.
  - Data is provided under the Open Parliament Licence v3.0.

Changelog managed by [changesets](https://github.com/changesets/changesets).

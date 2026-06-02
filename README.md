# Agent of Parliament

**Ask UK Parliament a question in plain English, and get an answer an agent has assembled for you — every fact cited back to the official record.**

UK Parliament publishes a remarkable amount of data: every vote, every debate, every bill, every MP's declared interests. But it lives behind a dozen separate APIs and search pages, and answering a question as ordinary as *"how has my MP voted on climate?"* means stitching several of them together by hand.

This project closes that gap. It makes parliamentary data **agent-friendly** — so that instead of navigating, you ask, and an agent does the stitching: finding your MP, pulling their voting record, cross-referencing debates and bills, and handing back a single coherent, sourced answer. The aim is a lower barrier to engaging with Westminster, for the civically-curious public, journalists, and researchers alike.

## Why this exists

Every existing way into Parliament's data makes you *navigate*. You pick an API, frame a query, read a result, then start again somewhere else to follow the thread. An agent can do something none of those tools can: **synthesise across votes, debates, bills, and interests in one query, and cite every claim** as it goes.

The data is all public and openly licensed. What's new here is the synthesis — and the discipline that makes that synthesis trustworthy rather than just plausible-sounding.

## What's in the repo

| Path | What it is |
| --- | --- |
| [`packages/mp-mcp`](packages/mp-mcp) | **The core.** An npm-publishable [Model Context Protocol](https://modelcontextprotocol.io) server that exposes UK Parliament data to agents through a small set of intent-led tools. This is the library. |
| [`apps/agent-of-parliament`](apps/agent-of-parliament) | A single-page browser demo: ask in plain English, watch cited cards — MPs, votes, debates, topic dossiers — assemble beside the chat. |
| [`apps/mcp-host`](apps/mcp-host) | A thin HTTP host that wraps `mp-mcp` behind a stateless `/mcp` endpoint, so the demo can reach it over the Anthropic MCP connector. |

## What makes it trustworthy

An agent is only as credible as its sources and as usable as its tool surface. Three deliberate choices carry that weight:

- **A small set of intent-led tools, not dozens of thin endpoints.** Tools are shaped around what a person actually wants to know (*"give me an overview of this MP"*, *"what is Parliament doing about X"*) rather than mirroring the raw API surface. A focused toolset keeps an agent accurate; the default answer to "should we add a tool?" is no.
- **A citation contract.** Every tool response carries a `sources` array of `parliament.uk` / `hansard.parliament.uk` URLs, and the server instructs the agent to cite them inline for every factual claim. This is what separates a grounded answer from a chatbot guessing over Wikipedia.
- **Response-format toggles and an eval suite.** Tools return concise output by default and detail on request, to keep agent context lean; an eval suite holds the tool descriptions and behaviour to account so the surface doesn't quietly drift.

## Quick start

Add the server to Claude Code:

```bash
claude mcp add mp-mcp -- npx -y mp-mcp
```

Then ask, in your client: *"Who's my MP? My postcode is BS3 4QH."* — see [`packages/mp-mcp`](packages/mp-mcp) for the full tool list, configuration, and local-development setup.

## Built on

`mp-mcp` is a client of UK Parliament's official, openly-licensed public APIs — no scraping, no third-party data layer:

- [Members API](https://members-api.parliament.uk) — MPs and Lords: biography, party, constituency, contact, history
- [Commons Votes](https://commonsvotes-api.parliament.uk) and [Lords Votes](https://lordsvotes-api.parliament.uk) — divisions (recorded votes)
- [Hansard](https://hansard-api.parliament.uk) — the searchable official report of debates and statements
- [Bills API](https://bills-api.parliament.uk) — legislation, sponsors, stages
- [Committees API](https://committees-api.parliament.uk) — committee structure, membership, inquiries
- [Questions & Statements API](https://questions-statements-api.parliament.uk) — written questions and answers
- [Interests API](https://interests-api.parliament.uk) — the Register of Members' Financial Interests
- [postcodes.io](https://postcodes.io) — postcode to constituency lookup (Open Government Licence)

## References
Some great projects that were used as inspiration and reference points:
- [TheyWorkForYou](https://www.theyworkforyou.com)  
- [mySociety](https://www.mysociety.org)
- [kupad95/uk-parliament-mcp-server](https://github.com/kupad95/uk-parliament-mcp-server)
- [i-dot-ai/parliament-mcp](https://github.com/i-dot-ai/parliament-mcp)

## Data and licensing

This project queries the UK Parliament public APIs. The data is licensed under the [Open Parliament Licence v3.0](https://www.parliament.uk/site-information/copyright-parliament/open-parliament-licence/). When you surface this project's output to end users, you must attribute it:

> Contains Parliamentary information licensed under the Open Parliament Licence v3.0.

The code is **MIT** licensed — see [`LICENSE`](LICENSE).

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md) and [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md). Project conventions live in [`CLAUDE.md`](CLAUDE.md); design rationale and architecture decisions are in [`docs/`](docs) — start with [`docs/initial-implementation-plan.md`](docs/initial-implementation-plan.md) and the [ADRs](docs/adrs).

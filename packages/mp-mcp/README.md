# mp-mcp

[![npm version](https://img.shields.io/npm/v/@jamesmccomish/mp-mcp.svg)](https://www.npmjs.com/package/@jamesmccomish/mp-mcp)
[![CI](https://github.com/jamesmccomish/mp-mcp/actions/workflows/ci.yml/badge.svg)](https://github.com/jamesmccomish/mp-mcp/actions/workflows/ci.yml)
[![Node](https://img.shields.io/node/v/@jamesmccomish/mp-mcp.svg)](https://www.npmjs.com/package/@jamesmccomish/mp-mcp)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](../../LICENSE)

**A Model Context Protocol (MCP) server that makes UK Parliament data agent-friendly — intent-led tools, citation-first responses.**

`mp-mcp` lets an agent answer real questions about Westminster — *"how has my MP voted on climate?"*, *"what is Parliament doing about NHS waiting lists?"* — by composing a small set of purpose-built tools over UK Parliament's official public APIs. Every response carries source URLs so the agent can cite its claims back to `parliament.uk` and `hansard.parliament.uk`.

## Install

Add to Claude Code:

```bash
claude mcp add mp-mcp -- npx -y @jamesmccomish/mp-mcp
```

Or configure any MCP client that speaks stdio:

```json
{
  "mcpServers": {
    "mp-mcp": {
      "command": "npx",
      "args": ["-y", "@jamesmccomish/mp-mcp"]
    }
  }
}
```

The server communicates over **stdio** (JSON-RPC on stdin/stdout) and runs as a subprocess — there is no HTTP/SSE transport in the package itself. (For a hosted HTTP endpoint usable with the Anthropic MCP connector, see [`apps/mcp-host`](../../apps/mcp-host).)

## What you can ask it

The tools are designed around questions a person actually asks. Once the server is connected, prompts like these route to the right tools automatically:

- *"Who's my MP? My postcode is BS3 4QH."*
- *"How has the MP for Holborn and St Pancras voted on climate?"*
- *"What is Parliament doing about NHS waiting lists?"*
- *"Explain the last Commons vote on the Renters' Rights Bill."*
- *"What's in Diane Abbott's register of interests?"*

## Tools

Fifteen tools, grouped by the job they do. Names are stable and namespaced `parliament_*`.

### Identity — who and where

| Tool | Purpose |
| --- | --- |
| `parliament_find_member` | Find a sitting (or former) member by name, constituency, or postcode. |
| `parliament_find_constituency` | Find a constituency by name or postcode; returns the record plus the current MP. |

### Synthesis — the real work

| Tool | Purpose |
| --- | --- |
| `parliament_member_overview` | One-call overview of an MP: synopsis, policy focus, contact, committees, recent votes, recent contributions, and interests. |
| `parliament_member_voting_history` | One member's voting record over time, optionally filtered by topic keyword and date range (Commons and Lords). |
| `parliament_search_hansard` | Full-text search across Hansard (debates, written answers, statements); returns cited excerpts and the IDs needed to drill in. |
| `parliament_get_debate` | Full text of a single Hansard debate by ID or URL; caps at ~15K tokens and steers narrower follow-ups when longer. |
| `parliament_topic_tracker` | A cross-Parliament round-up on one topic — bills, debates, divisions, written questions, and petitions, fanned out in parallel. |

### Divisions — recorded votes

| Tool | Purpose |
| --- | --- |
| `parliament_search_divisions` | Find Commons divisions on a topic with their IDs, titles, dates, and aggregate aye/no counts — the entry point for "what was voted on". |
| `parliament_get_division` | Full detail of one division: ayes and noes by party, totals, and (in detailed mode) every named voter. Commons and Lords. |

### Drill-ins — targeted detail

| Tool | Purpose |
| --- | --- |
| `parliament_member_interests` | An MP's Register of Members' Financial Interests: earnings, gifts, donations, shareholdings, employment, visits. |
| `parliament_get_committee` | Full committee detail: membership, chair, category, and optionally recent reports and evidence sessions. |
| `parliament_get_bill` | Full detail of a bill: short title, house and stage, whether it became an Act or was defeated, sponsors, and stage history. |
| `parliament_get_state_of_parties` | Seat counts by party for a house on a given date — the current or historical party balance. |
| `parliament_get_ministerial_roles` | Government ministers or opposition shadow post-holders, with the current holder and department for each. |
| `parliament_get_election_results` | Election results for a constituency: winner, party, majority, turnout, electorate, and the full candidate breakdown. |

## Prompts

Four MCP prompts package common multi-tool workflows into one invocation:

| Prompt | Purpose |
| --- | --- |
| `mp-report-card` | A one-page report card for an MP, given a postcode or name. Orchestrates `find_member` → `member_overview`. |
| `topic-tracker` | A narrative briefing on what Parliament is doing about a topic — bills, debates, votes, written questions, petitions. |
| `draft-constituent-letter` | Draft a letter to an MP, grounded in their actual voting record and Hansard contributions on the issue. |
| `vote-explainer` | Explain a Commons division: the motion, the result, the party breakdown, and the surrounding debate. |

## The citation contract

Every tool response is a typed envelope:

```ts
type ToolResponse<T> = {
  data: T;
  sources: Array<{ title: string; url: string }>; // parliament.uk / hansard.parliament.uk
  meta?: {
    upstream_calls?: number;
    truncated?: boolean;
    truncation_hint?: string; // present when a response was capped — steers a narrower follow-up
  };
};
```

`sources` is always present and populated for factual results. The server's `instructions` field (sent to the model on connection) asks the agent to cite those URLs inline for any claim it makes. This is the project's central credibility lever: a grounded answer over a guessed one.

## Architecture

A clean layering, top to bottom:

```
tools/        intent-led tool definitions (Zod schema + response_format toggle + handler)
   │
domain/       hand-written, agent-friendly domain types + mappers (API shapes → clean output)
   │
clients/      one client per upstream API (members, hansard, votes, bills, committees, …)
   │
clients/http  shared fetch wrapper: retry + timeout, User-Agent, Open Parliament Licence headers
```

Cross-cutting concerns live in `lib/`: `citations` (URL builders), `errors` (structured tool errors), `responseFormat` (the concise/detailed toggle), `logger` (pino), and `registerTool` (the wrapper every tool registers through, so the envelope and contract can't drift).

TypeScript API types in `src/generated/` are produced from Parliament's OpenAPI specs and **committed** so the package installs with no network access. Locked decisions are recorded in [`docs/adrs/`](../../docs/adrs) — ESM-only Node 22 target (0001), committed generated types (0002), citation-contract enforcement (0003), the eval suite as contract (0004).

## Local development

```bash
pnpm install
pnpm --filter @jamesmccomish/mp-mcp build      # one-off compile to dist/
pnpm --filter @jamesmccomish/mp-mcp dev        # incremental tsc --watch into dist/
pnpm --filter @jamesmccomish/mp-mcp test       # vitest
```

Once built, the repo's [`.claude/settings.json`](../../.claude/settings.json) registers the local artifact in Claude Code under the `mp-mcp-local` name. With `dev` running, edits recompile on save; restart the MCP client to pick up the new `dist/`.

### Inspect tool calls

Drive the server directly, without a full client session:

```bash
pnpm --filter @jamesmccomish/mp-mcp build
npx @modelcontextprotocol/inspector node packages/mp-mcp/dist/stdio.js
```

### Generated types

`src/generated/` is committed (so installs need no network) and generated from Parliament's OpenAPI specs. Regenerate with `pnpm --filter @jamesmccomish/mp-mcp gen:types`; never hand-edit those files.

## Configuration

All configuration is via environment variables (all optional):

| Variable | Default | Purpose |
| --- | --- | --- |
| `MP_MCP_LOG_LEVEL` | `info` | pino level: `fatal`, `error`, `warn`, `info`, `debug`, `trace`, `silent`. |
| `MP_MCP_USER_AGENT_SUFFIX` | _(empty)_ | Appended to the outbound `User-Agent` on upstream calls. |
| `MP_MCP_UPSTREAM_TIMEOUT_MS` | `4000` | Per-request upstream timeout (1000–30000). |
| `MP_MCP_UPSTREAM_MAX_ATTEMPTS` | `2` | Upstream retry attempts (1–5). |
| `MP_MCP_UPSTREAM_BASE_BACKOFF_MS` | `200` | Base backoff between retries (0–5000). |
| `MP_MCP_FIXTURE_DIR` | `./fixtures` | Fixture directory used by replay-based integration tests. |

## Contributing

The tool surface is intentionally small — prefer extending an existing tool over adding one (see "Consolidate over multiply" in [`CLAUDE.md`](../../CLAUDE.md)). When a new tool is genuinely warranted, scaffold it with the `/new-tool` command ([`.claude/commands/new-tool.md`](../../.claude/commands/new-tool.md)); it encodes the full contract — Zod schema, `response_format` toggle, citation envelope, registration, and snapshot test — so the pattern can't drift. Don't hand-roll one.

## Data and licence

Data is provided under the [Open Parliament Licence v3.0](https://www.parliament.uk/site-information/copyright-parliament/open-parliament-licence/). When this MCP's output is surfaced to end users, attribute as:

> Contains Parliamentary information licensed under the Open Parliament Licence v3.0.

The code is MIT licensed — see the repo root [`LICENSE`](../../LICENSE).

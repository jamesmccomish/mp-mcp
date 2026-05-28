# mp-mcp — Implementation Plan (v1)

A concrete, milestone-driven plan for the first build of `mp-mcp` — a public, npm-publishable MCP server for UK Parliament data. Scoped to the MCP server only; a demo app is stubbed in the monorepo but not implemented here.

Self-contained: this file plus the repo's `CLAUDE.md` is everything Claude Code needs to start at M0.

---

## 0. Definition of Done

The build is done when *all* of the following are true:

1. **Monorepo** with two packages: `packages/mp-mcp` (implemented) and `packages/westminster-watch` (stubbed, README-only).
2. **~10 MCP tools** are implemented (10 firm + headroom for an 11th `parliament_list_policy_areas` if the eval set surfaces a need):
   - **Tier 1 (lookup)**: `parliament_find_member`, `parliament_find_constituency`
   - **Tier 2 (synthesis)**: `parliament_member_overview`, `parliament_member_voting_history`, `parliament_search_hansard`, `parliament_get_debate`, `parliament_topic_tracker`
   - **Tier 3 (drill-ins)**: `parliament_get_division`, `parliament_member_interests`, `parliament_get_committee`
3. **4 MCP prompts** ship: `mp-report-card`, `topic-tracker`, `draft-constituent-letter`, `vote-explainer`.
4. **Citation contract** is enforced — every tool response includes source URLs; the server's `instructions` field tells consumers to cite them inline.
5. **Eval set** (20 tasks) is implemented in `evals/` and runs in CI. Baseline accuracy is captured.
6. **CI green** on every PR: typecheck, lint, unit tests, integration tests (placeholder. skipped for v1. will be against live Parliament APIs, with a fixture-replay fallback).
7. **Read to be published to npm** as `@<org>/mp-mcp` with a working `claude mcp add` install path documented in the README.
8. **MCP registry** submission is filed (acceptance may post-date this build).
9. **OPL attribution** is surfaced in the server's `instructions` and the README.

---

## 1. Tooling stack (locked)

Each choice is opinionated. Claude Code can change any of these during refinement; the rationale is here so the change is informed.

| Concern | Choice | Why |
|---|---|---|
| Package manager | `pnpm` (≥9) with workspaces | Best monorepo support, deterministic, fast. Works under both Node and Bun. |
| Language | TypeScript 5.6+ with `strict: true`, `noUncheckedIndexedAccess: true`, `moduleResolution: "NodeNext"` | The strictness catches the kinds of bugs that hurt agentic tool reliability. |
| Published runtime target | Node 22 LTS (`engines.node: ">=22"`) | Broadest consumer compatibility. Native fetch stable, long support window. The library should run anywhere, not just where we develop. |
| Dev runtime | Bun 1.x supported as a first-class dev runtime alongside Node | Anthropic acquired Bun in 2026 and the MCP SDK officially supports Node/Bun/Deno. Use Bun for local dev install/test where it's faster; verify in CI under both. Don't lock consumers to it. |
| MCP SDK | `@modelcontextprotocol/sdk` (latest v1.x; revisit when v2 stable lands in 2026) | Official, kept in sync with the spec. Known Bun module-resolution edge cases (SDK issues #260, #709) — verify any Bun-specific build against these. |
| HTTP client | Native `fetch` + `undici` for keep-alive Agent | Avoids an extra dep; `undici` (already a Node dep) gives connection pooling. |
| Schema validation | `zod` | Tool input schemas as Zod, with `z.toJSONSchema()` exported to MCP. Single source of truth for runtime + types. |
| API type generation | `openapi-typescript` | Generate TS types from Parliament Swagger JSONs at build time. Pins us to real endpoint shapes. |
| Logging | `pino` | Structured, fast, JSON by default — production-grade for the moment the MCP gets hosted. |
| Testing | `vitest` | Fast, native TS, snapshot testing for tool response shapes. Verified to run under both Node and Bun. |
| Linting + formatting | `biome` | One tool, faster than ESLint + Prettier, modern. |
| Versioning | `changesets` | Standard for monorepos; PR-driven release notes. |
| CI | GitHub Actions | Free for public repos, fastest path to working CI. Matrix-test under Node 22 *and* Bun. |
| License | MIT for the code; OPL attribution for the data | Standard open source; Parliament data is OPL and attribution is mandatory. |

### Notable explicit rejections

- **Not Turborepo.** Two packages with simple builds; the overhead isn't worth it yet. Revisit if the demo app adds heavy build steps.
- **Not ESLint + Prettier.** Biome is simpler. If a contributor needs a rule Biome doesn't have, we revisit.
- **Not Yarn / npm.** pnpm's workspace ergonomics and disk efficiency are noticeably better, and pnpm works under both Node and Bun.
- **Not Bun-only.** Anthropic owns Bun and it's first-class for dev, but a published npm library needs to run under whatever runtime consumers choose. Target Node 22+ for the artifact; develop with Bun where it's faster.
- **Not `tsup`.** Fine for apps, but `tshy` produces cleaner dual-format library outputs.

---

## 2. Repo layout

```
parliament-app/                          # repo root
├── .changeset/
│   └── config.json
├── .claude/                             # Claude Code dev tooling — see §2.2
│   ├── settings.json                    # permissions allow-list + local MCP registration
│   ├── README.md                        # what's in this folder and why
│   ├── commands/
│   │   ├── new-tool.md                  # /new-tool <name>
│   │   └── new-adr.md                   # /new-adr <slug>
│   └── agents/
│       └── tool-description-reviewer.md # read-only critique sub-agent
├── .github/
│   └── workflows/
│       ├── ci.yml                       # typecheck, lint, test on PR + main
│       └── release.yml                  # changesets-driven publish on main
├── apps/
│   └── [demo-app-name]/                 # STUB ONLY in this build; name TBD (see §8)
│       ├── package.json
│       └── README.md                    # "planned: postcode→artifact demo"
├── docs/
│   ├── implementation-plan.md           # this file
│   └── adrs/                            # ADRs added as decisions get locked — empty at M0
├── packages/
│   ├── mp-mcp/                          # THE BUILD
│   │   ├── src/
│   │   │   ├── server.ts                # MCP server bootstrap + tool/prompt registration
│   │   │   ├── stdio.ts                 # stdio transport entrypoint (bin)
│   │   │   ├── config.ts                # env config (USER_AGENT, LOG_LEVEL, …)
│   │   │   ├── tools/
│   │   │   │   ├── findMember.ts
│   │   │   │   ├── findConstituency.ts
│   │   │   │   ├── memberOverview.ts
│   │   │   │   ├── memberVotingHistory.ts
│   │   │   │   ├── searchHansard.ts
│   │   │   │   ├── getDebate.ts
│   │   │   │   ├── topicTracker.ts
│   │   │   │   ├── getDivision.ts
│   │   │   │   ├── memberInterests.ts
│   │   │   │   ├── getCommittee.ts
│   │   │   │   └── index.ts             # registers all tools with the server
│   │   │   ├── prompts/
│   │   │   │   ├── mpReportCard.ts
│   │   │   │   ├── topicTracker.ts
│   │   │   │   ├── draftConstituentLetter.ts
│   │   │   │   ├── voteExplainer.ts
│   │   │   │   └── index.ts
│   │   │   ├── clients/                 # one file per upstream API
│   │   │   │   ├── http.ts              # shared fetch wrapper: retry, UA, attribution
│   │   │   │   ├── members.ts
│   │   │   │   ├── hansard.ts
│   │   │   │   ├── commonsVotes.ts
│   │   │   │   ├── lordsVotes.ts
│   │   │   │   ├── bills.ts
│   │   │   │   ├── committees.ts
│   │   │   │   ├── writtenQuestions.ts
│   │   │   │   ├── interests.ts
│   │   │   │   ├── petitions.ts         # petition.parliament.uk
│   │   │   │   ├── postcodes.ts         # postcodes.io
│   │   │   │   └── index.ts
│   │   │   ├── domain/                  # hand-written domain types (the shapes we expose to agents)
│   │   │   │   ├── member.ts
│   │   │   │   ├── vote.ts
│   │   │   │   ├── debate.ts
│   │   │   │   ├── interest.ts
│   │   │   │   └── citation.ts
│   │   │   ├── generated/               # openapi-typescript output (gitignored where possible)
│   │   │   │   ├── members.d.ts
│   │   │   │   ├── hansard.d.ts
│   │   │   │   ├── commons-votes.d.ts
│   │   │   │   └── …
│   │   │   ├── lib/
│   │   │   │   ├── citations.ts         # URL builders for parliament.uk / hansard
│   │   │   │   ├── errors.ts            # structured "steering" error responses
│   │   │   │   ├── logger.ts            # pino instance
│   │   │   │   └── responseFormat.ts    # concise|detailed toggle helpers
│   │   │   └── index.ts                 # public package entry (programmatic use)
│   │   ├── tests/
│   │   │   ├── unit/                    # per-module unit tests
│   │   │   └── integration/             # live API tests behind LIVE_APIS=1; fixture-replay otherwise
│   │   ├── evals/
│   │   │   ├── tasks.ts                 # the 20 seed eval tasks (see §6)
│   │   │   ├── runner.ts                # iterates tasks against a live Claude API
│   │   │   └── README.md
│   │   ├── scripts/
│   │   │   ├── gen-types.ts             # downloads Swagger + runs openapi-typescript
│   │   │   ├── check-apis.ts            # smoke-tests all upstreams
│   │   │   └── seed-fixtures.ts         # records fixtures from live APIs for integration tests
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── biome.json                   # extends root
│   │   ├── README.md                    # install + usage; copy-paste claude mcp add
│   │   └── CHANGELOG.md                 # changesets-managed
│   └── (libraries shared between mp-mcp and apps go here as they emerge)
├── .gitignore
├── .nvmrc                               # 22
├── .editorconfig
├── biome.json                           # workspace root config
├── tsconfig.base.json
├── package.json                         # workspace root
├── pnpm-workspace.yaml
├── LICENSE                              # MIT
├── README.md                            # repo-level overview, links to packages
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── llms.txt                             # for Claude Code: pointers to CLAUDE.md, brainstorm, mcp-design
└── CLAUDE.md                            # thin in-repo memory file; see §2.2

# Note: brainstorm.md and mcp-design.md (research docs) live in Cowork, NOT in this repo.
# See §2.1 for how research is referenced from the code (Architecture Decision Records).
```

### Why this shape

- **`tools/`, `prompts/`, `clients/`, `domain/`, `lib/`** mirror Anthropic's mental model from the engineering posts: tools are intent-shaped, clients are API-shaped, domain types are agent-friendly, lib is cross-cutting. Keeping these separated makes it obvious when a tool starts leaking implementation detail into its response.
- **`generated/` is for OpenAPI types, never edited by hand.** This is the seam between "what Parliament actually returns" and "what we expose to agents."
- **`evals/` ships in the package** so anyone running the MCP can reproduce our quality benchmarks. This is the kind of thing that makes a public MCP credible.
- **Demo app stubbed in `apps/`** because the monorepo is intended to host both the library and at least one consumer. Setting up the empty app now is one paragraph; setting it up later requires re-thinking workspace config. It lives in `apps/`, not `packages/`, because it's a consumer of the library, not another library.

### 2.1 Architecture Decision Records (`docs/adrs/`)

The `docs/adrs/` folder is created empty during M0. ADRs are added *as decisions are locked* during the build — not predefined. The convention is append-only: when a decision changes, write a new ADR that supersedes the old one rather than editing the original. Code comments can then point at an ADR by number when explaining a non-obvious choice.

Use the `/new-adr <slug>` slash command (defined in `.claude/commands/new-adr.md`) to scaffold a new ADR — it handles numbering and template.

### 2.2 `.claude/` — project tooling for Claude Code

Configures Claude Code itself when working in this repo. Everything here is opt-in and project-specific.

- **`settings.json`** — permissions allow-list for routine `pnpm`/`git` commands so Claude doesn't prompt on every action. Also registers the locally-built `mp-mcp` as an MCP server in Claude Code itself (`mcpServers.mp-mcp-local`), so once you've run `pnpm build` you can immediately test the MCP against Claude Code in this same session.

- **`commands/new-tool.md`** — `/new-tool <camelCaseName>` scaffolds a new MCP tool: Zod input schema, citation contract, `response_format` toggle, registration in the index, snapshot test. Encodes the project's tool-design contract so it doesn't drift across the ~10 tools.

- **`commands/new-adr.md`** — `/new-adr <kebab-slug>` finds the next ADR number and creates the file from the template. Enforces the append-only convention.

- **`agents/tool-description-reviewer.md`** — a read-only sub-agent that critiques MCP tool descriptions against Anthropic's effective-tools principles and this project's citation contract. Spawn it during M7 (eval + tuning) when iterating on descriptions, or any time the eval set surfaces a tool being mis-selected. Read-only by design: it returns a critique, the main agent makes the edits.

**What's deliberately not there:** Claude Code hooks (pre-commit checks belong in `lefthook`/`husky` so they fire on `git commit`, not on every edit); a `/new-client` or `/new-prompt` command (bounded sets, no ongoing utility); a `parliament-api` skill (would duplicate this plan and invite drift); a default-model pin (user-level concern).

---

## 3. Milestones

Each milestone is a single PR-sized chunk. Acceptance criteria are objective. The order is intentional — earlier milestones build the affordances later ones need.

### M0 — Scaffold (target: day 1–2)

Repo exists, tooling boots, "hello world" MCP server runs.

- [ ] `pnpm init`, `pnpm-workspace.yaml` declaring `packages/*`.
- [ ] `tsconfig.base.json` with strict settings; per-package `tsconfig.json` extends it.
- [ ] `biome.json` at root; lint and format scripts.
- [ ] `vitest` configured; one trivial passing test.
- [ ] `mp-mcp` package builds with `tsup` (or `tsc --emitDeclarationOnly` + bundler) into `dist/`.
- [ ] `mp-mcp` exposes a single `parliament_ping` tool that returns `{ ok: true, sources: [] }`. Validates the SDK wiring end-to-end.
- [ ] GitHub Actions: `ci.yml` runs `pnpm install`, typecheck, lint, test on PRs + main. Matrix: Node 22 and Bun 1.x.
- [ ] Root `README.md` skeleton, `LICENSE` (MIT), `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `llms.txt`.
- [ ] Repo-root `CLAUDE.md` in place (provided separately).
- [ ] `docs/implementation-plan.md` at repo root.
- [ ] `docs/adrs/` exists as an empty directory (with a `.gitkeep`) ready for ADRs as decisions are locked.
- [ ] `.claude/` scaffold in place per §2.2 (settings.json, README.md, commands/, agents/). Provided separately.
- [ ] Demo app stub: `apps/[demo-app-name]/` with `package.json` and a README that says "planned".

**Done when:** `claude mcp add mp-mcp ./packages/mp-mcp/dist/stdio.js` works, calling `parliament_ping` returns the canned response.

### M1 — Foundations (day 2–3)

The cross-cutting machinery every tool will lean on.

- [ ] `lib/citations.ts`: builders for canonical URLs — `members(id)`, `division(house, id)`, `hansardSpeech(date, columnId)`, `bill(id)`. Centralises URL shape so a Parliament URL change is one diff.
- [ ] `lib/errors.ts`: `ParliamentToolError(code, message, suggestion)` class + serializer. Structured "steering" error responses per §4.2.
- [ ] `lib/responseFormat.ts`: helper that takes `detailed` and `concise` shape definitions and picks one based on the tool's `response_format` input.
- [ ] `lib/logger.ts`: pino instance, env-driven level.
- [ ] `clients/http.ts`: shared fetch wrapper with retry (3x exponential), 10s timeout, User-Agent (`mp-mcp/<version> (+repo-url)`), Accept JSON, automatic OPL attribution headers on outbound where applicable.
- [ ] `scripts/gen-types.ts` runs `openapi-typescript` against the Members, Hansard, Commons Votes, and Bills swagger URLs. Output committed for reproducibility; regenerated by a `pnpm gen:types` script.
- [ ] `clients/postcodes.ts`: postcode → constituency lookup against `api.postcodes.io`. Direct calls (no caching in v1).

**Done when:** unit tests cover citations, errors, responseFormat, and postcodes client; `pnpm gen:types` regenerates `generated/` cleanly.

### M2 — Tier 1 tools (day 3–4)

Identity lookups. Smallest, most-used.

- [ ] `tools/findMember.ts`: input schema with `query`, `assembly`, `current_only`, `response_format`. Detects postcode pattern, routes via postcodes → constituency → member.
- [ ] `tools/findConstituency.ts`: input `query`. Returns constituency + current member.
- [ ] Both tools include positive + negative usage examples in their descriptions (per Anthropic guidance).
- [ ] `tools/index.ts` registers them with the server.
- [ ] Unit tests with mocked HTTP, integration tests against live APIs.

**Done when:** a Claude session calling `parliament_find_member` with "SW1A 0AA" returns Lindsay Hoyle (or whoever is the Speaker's seat MP at the time) with citations.

### M3 — Tier 2 synthesis tools (day 4–7)

The four tools that do real work. Largest single milestone.

- [ ] `tools/memberOverview.ts`: fans out to Biography, Contact, Focus, current committee memberships (summary names + roles), recent Voting (last 10), ContributionSummary, RegisteredInterests (summary). Single tool, one response, citations per section.
- [ ] `tools/memberVotingHistory.ts`: pulls `/Members/{id}/Voting`, joins division metadata for context, supports `topic` filter (string keyword match against division title), `from_date`/`to_date`, `limit` (default 20, max 100).
- [ ] `tools/searchHansard.ts`: Hansard search with `query`, optional `member_id`, optional `section` (`debates`/`written_answers`/`statements`/`all`), date range, `limit` (default 20, max 50). Excerpts capped at 400 chars per hit.
- [ ] `tools/getDebate.ts`: drill-in via `hansard_url`, `debate_id`, or `column_id`. 15K-token truncation with steering message.
- [ ] Each tool ships at least one snapshot test pinning the response shape, so future refactors don't accidentally change the agent-facing contract.

**Done when:** the `mp-report-card` prompt (M6) has all the data it needs from a single `parliament_member_overview` call.

### M4 — Topic tracker (day 7–9)

The fan-out tool. Most architecturally interesting.

- [ ] `clients/bills.ts`: search bills by keyword.
- [ ] `clients/writtenQuestions.ts`: search written questions by keyword.
- [ ] `clients/commonsVotes.ts`: search divisions by keyword.
- [ ] `clients/petitions.ts`: search petitions by keyword. `petition.parliament.uk` exposes JSON at `/petitions.json` (filterable by state, with signature counts). No key, no auth. Sized for constituent demos because public petitions are how voters actually engage with Parliament between elections.
- [ ] `tools/topicTracker.ts`: `topic` (string), `lookback_days` (default 90, max 365). Internally parallelises five searches with `Promise.all`. Caps internal calls to 14.
- [ ] Returns structured digest: `bills_in_progress`, `recent_debates` (5), `recent_votes` (5 with party breakdown), `recent_written_questions` (5), `active_petitions` (top 5 by signature count, with state). Every item citation-tagged.

**Done when:** `parliament_topic_tracker({ topic: "renters reform", lookback_days: 180 })` returns five populated sections with sources.

### M5 — Tier 3 drill-ins (day 9–10)

The targeted lookups.

- [ ] `clients/interests.ts`: Register of Members' Financial Interests.
- [ ] `tools/getDivision.ts`: full division detail, ayes/noes by party. Inputs: `division_id`, `assembly`.
- [ ] `tools/memberInterests.ts`: per-member interests with optional `category` filter and `from_date`. Description explicitly steers the agent away from characterising interests as conflicts.
- [ ] `tools/getCommittee.ts`: committee detail by `committee_id` or `name` — current membership, chair, recent reports + evidence. Inputs: `committee_id` *or* `name`, `include_evidence` (default false), `response_format`. Validated as a v1 tool against prior-art evidence (i-dot-ai surfaces committees as a top-five user intent) and because `member_overview` lists committees by name without the depth needed to answer "what is this committee doing".

**Done when:** `parliament_get_division` can drill into a division surfaced by `member_voting_history`, and `parliament_get_committee` can drill into a committee named by `member_overview`.

### M6 — Skills / prompts (day 10–11)

MCP prompts, not tools. Reusable workflows.

- [ ] `prompts/mpReportCard.ts`: arg `postcode_or_name`. Generates the "postcode → report card" prompt that orchestrates `find_member` → `member_overview` and renders an artifact-ready summary.
- [ ] `prompts/topicTracker.ts`: arg `topic`. Calls `topic_tracker` and shapes the output into a narrative briefing.
- [ ] `prompts/draftConstituentLetter.ts`: args `member_name_or_postcode`, `issue`. Grounds the letter by calling `member_voting_history` and `search_hansard` first.
- [ ] `prompts/voteExplainer.ts`: arg `division_id_or_hansard_url`. Calls `get_division` + `get_debate`, explains the vote with party breakdown.
- [ ] All four prompts list the citation requirement explicitly.

**Done when:** each prompt is invokable via the MCP client and produces a coherent output against live data.

### M7 — Eval suite + tuning (day 11–13)

The 20-task seed eval. See §6 for the actual tasks.

- [ ] `evals/tasks.ts` exports the 20 task definitions: `{ id, prompt, expected_tools, verifier }`.
- [ ] `evals/runner.ts` runs each task against a real Claude API (interleaved thinking on), logs tool calls, tokens, errors, and the final response.
- [ ] `pnpm eval` runs the whole set; output is a markdown report committed to `evals/reports/<date>.md`.
- [ ] Iterate on tool descriptions / parameter naming based on failures. Re-run eval, commit improvement.
- [ ] At least two improvement passes; baseline accuracy + delta documented in `evals/README.md`.

**Done when:** baseline accuracy is captured and at least one round of tool-description refinement has measurably improved it.

### M8 — Publish prep (day 13–14)

The release.

- [ ] Full `packages/mp-mcp/README.md`: install (`claude mcp add` and direct npm), usage examples per tool, citation contract explainer, OPL attribution, limitations, and a "Prior art" section that acknowledges the two existing Parliament MCPs and how this one differs: `i-dot-ai/parliament-mcp` (analyst-grade, Python + Qdrant semantic search, hosted-only) and `kupad95/uk-parliament-mcp-server` (cross-dataset analysis, generic entity-typed tools). Frame mp-mcp's distinction as constituent-friendly, zero-infra, npm-installable, citation-disciplined, with intent-led tool design — not "more data than the others".
- [ ] Root `README.md`: the monorepo overview, link to each package, link to the brainstorm + design + plan docs.
- [ ] Changesets configured for `mp-mcp` only (westminster-watch is private until built).
- [ ] First changeset created; PR to main triggers `release.yml`; package published as `@<scope>/mp-mcp@0.1.0`.
- [ ] MCP registry submission filed.
- [ ] `claude mcp add` smoke test from a fresh machine documented.

**Done when:** a developer who has never seen the repo can `pnpm dlx @<scope>/mp-mcp` (or equivalent) and have it work in Claude Desktop in under 5 minutes.

---

## 4. Cross-cutting concerns (designed once, applied everywhere)

### 4.1 Response envelope

Every tool returns this shape:

```ts
type ToolResponse<T> = {
  data: T;
  sources: Array<{ title: string; url: string }>;
  meta?: {
    upstream_calls?: number;
    truncated?: boolean;
    truncation_hint?: string;        // present iff truncated
  };
};
```

`sources` is non-optional and must contain at least one entry for any factual response. Empty `sources` is reserved for errors / pure lookups that have nothing to cite (rare).

### 4.2 Error responses

```ts
type ToolError = {
  error: {
    code: string;                    // e.g. "QUERY_TOO_BROAD", "NO_MEMBER_FOUND"
    message: string;                 // human-readable
    suggestion: string;              // what the agent should try next
  };
};
```

The `suggestion` field is the *steering*. Examples:

- `NO_MEMBER_FOUND` → "Try a different spelling, or use a postcode (e.g. SW1A 0AA). For historic members, use `parliament_find_member` with `current_only: false`."
- `QUERY_TOO_BROAD` → "Hansard returned 4,800 hits. Narrow with `from_date`/`to_date` (suggest 90 days), or add `member_id` to scope to one MP."
- `UPSTREAM_UNAVAILABLE` → "Parliament's Hansard API is temporarily unreachable. Retry in 30s; if persistent, fall back to `search_hansard` with smaller date ranges."

### 4.3 Rate limiting & politeness

- All upstream calls go through `clients/http.ts`, which holds an `undici` Agent with connection pooling. No caching in v1 (see §8 for the defer rationale); every tool call hits live upstream.
- Outbound `User-Agent` is `mp-mcp/<pkg.version> (+<repo-url>)` so the Parliament APIs team can identify us if anything goes wrong.
- `topic_tracker` caps internal fan-out at 12 calls. If we'd exceed it, the tool returns partial data and a `meta.truncated: true` with a suggestion to narrow `lookback_days`.
- During local dev and eval runs, be considerate: don't loop the eval suite tightly against live APIs.

### 4.4 Citation discipline

Tool descriptions all contain this clause:

> "This tool's response includes a `sources` array of parliament.uk URLs. When you make any factual claim about an MP, vote, debate, or bill in your response to the user, cite the corresponding URL inline."

This is *also* in the server-level `instructions` field, doubled up because Anthropic's guidance is that description-level steering is the most reliable.

### 4.5 OPL attribution

The MCP server's `instructions` field includes:

> "Data is provided under the Open Parliament Licence v3.0. When this MCP's output is surfaced to end users, attribute as: 'Contains Parliamentary information licensed under the Open Parliament Licence v3.0.'"

The README repeats this prominently.

### 4.6 Tool naming convention

Tools are named for the **question they answer**, not the entity type they touch or the verb-object of the underlying API. The model picks tools by matching the user's intent to the tool description; intent-led names make that selection unambiguous.

**Good (this project):** `parliament_find_member`, `parliament_member_voting_history`, `parliament_search_hansard`, `parliament_topic_tracker`. Each name is a complete answer to "what does this tool do for the user".

**Bad (avoid):** generic entity-typed tools that take a `type` discriminator — e.g. `find_entities(type, query)`, `query_entities(...)`, `analyze_patterns(...)`. These force the LLM to invent the right argument shape per call and degrade selection accuracy. Anthropic's *Writing effective tools for agents* (Sep 2025) calls this out specifically. The `kupad95/uk-parliament-mcp-server` repo is a public example of the pattern we are deliberately not following.

**Practical rules:**
- Prefix every tool with `parliament_` so the namespace is obvious in a multi-MCP session.
- Use noun_phrase or verb_noun form, never camelCased English ("memberVotingHistory" is fine for the *file*, but the *tool name* is `parliament_member_voting_history`).
- If two tools would have near-identical descriptions, that's a smell — collapse them or make the distinction explicit in the names (e.g. `find_member` vs `find_constituency`, not `find_member_by_name` vs `find_member_by_postcode`).
- The `parliament_list_policy_areas` headroom slot is named to the same rule, not "get_policy_taxonomy" or similar.

### 4.7 Config

All config via env vars with sensible defaults:

| Var | Default | Purpose |
|---|---|---|
| `MP_MCP_LOG_LEVEL` | `info` | Pino log level |
| `MP_MCP_USER_AGENT_SUFFIX` | (empty) | Append to UA, e.g. for downstream attribution |
| `MP_MCP_FIXTURE_DIR` | `./fixtures` | For integration test fixture replay (v1.1) |

---

## 5. Testing strategy

**v1 ships:** unit tests + snapshot tests + eval set.
**v1.1 adds:** integration tests against live Parliament APIs + fixture replay infrastructure.

- **Unit tests** (vitest): every `lib/*`, every `clients/*` (with `undici/mock-agent`), every `tools/*` (mock client layer). Target 80%+ line coverage on `tools/` and `lib/`. **Required for v1.**
- **Snapshot tests**: every tool's success response and at least one error response. Catches accidental shape changes. **Required for v1.**
- **Evals** (see §6): the highest-level test — agent-in-the-loop quality. Not run in CI on every PR (cost); run weekly and before each release. **Required for v1.**
- **Integration tests** (vitest, `LIVE_APIS=1` env flag): hit real Parliament APIs for a handful of canonical queries. **Scaffolded but not implemented in v1**; full implementation is v1.1. Skipped in CI by default to avoid flakiness; runnable locally and weekly via a scheduled GitHub Action when implemented.
- **Fixture replay**: `scripts/seed-fixtures.ts` captures real API responses into `fixtures/*.json`. **Scaffolded but not used in v1**; pairs with integration tests in v1.1.

The reason integration tests are scaffolded-but-deferred: the upstream API shapes are pinned by the generated OpenAPI types and verified by manual exploration during M1–M5. Adding the integration test runner is mechanical once the architecture is there; doing it later doesn't change the design.

---

## 6. Eval set — 20 seed tasks

These are committed to `packages/mp-mcp/evals/tasks.ts` and run by `evals/runner.ts`. Each task is `{ id, prompt, expected_tools (optional), verifier }`. The verifier is either an exact-string check or a Claude-as-judge rubric.

### Category A — Postcode → MP report card (5)

1. **A1**: "Who is the MP for SW1A 0AA and what's their voting record?" — expect `find_member` + `member_overview` or `member_voting_history`; verify Lindsay Hoyle named with at least one parliament.uk citation.
2. **A2**: "Tell me about my MP, postcode BS3 4QH." — expect `find_member` + `member_overview`; verify response includes constituency, party, and citations.
3. **A3**: "What does my MP do on committees? Postcode M14 5SH." — expect `find_member` + `member_overview` with committees section; verify at least one committee named.
4. **A4**: "I'm in EH8 9NX. Has my MP ever spoken about housing?" — expect `find_member` + `search_hansard` with `member_id`; verify at least one Hansard URL.
5. **A5**: "Show me Stephen Flynn's recent activity." — expect `find_member` + `member_overview`; verify Aberdeen South returned.

### Category B — Topic-filtered voting (5)

6. **B1**: "How has the MP for Holborn and St Pancras voted on climate?" — expect `find_member` + `member_voting_history` with `topic: climate`; verify response uses `member_voting_history`, not `search_hansard`.
7. **B2**: "Did Diane Abbott vote for the Renters' Rights Bill?" — expect `find_member` + `member_voting_history` filtered to that bill; verify aye/no/abstain reported.
8. **B3**: "How did Conservatives vote on the latest tax measure?" — expect `topic_tracker` or `get_division`; verify party breakdown present.
9. **B4**: "Find votes about AI in the last year." — expect `topic_tracker`; verify divisions list non-empty.
10. **B5**: "Has Keir Starmer ever voted against his own party?" — expect `find_member` + `member_voting_history`; verify response includes `party_line_match: false` rows or honestly reports if none found.

### Category C — Topic tracking (5)

11. **C1**: "What is Parliament doing about NHS waiting lists?" — expect `topic_tracker`; verify four sections (bills, debates, votes, written Qs) all populated.
12. **C2**: "Tell me about the AI Bill." — expect `search_hansard` and/or `topic_tracker`; verify bill name + recent activity cited.
13. **C3**: "What's happening with the renters' rights bill?" — expect `topic_tracker`; verify bill stage reported.
14. **C4**: "Recent debates about Ukraine." — expect `search_hansard`; verify excerpts < 400 chars and citations present.
15. **C5**: "Climate-related written questions this month." — expect `topic_tracker` or `search_hansard` with `section: written_answers`; verify written-questions section populated.

### Category D — Trap prompts that should NOT call the MCP (5)

These test that the agent doesn't over-call tools.

16. **D1**: "What is the House of Commons?" — should be answered from training; verify zero tool calls or at most one unnecessary call.
17. **D2**: "What's the difference between an MP and a Lord?" — same as D1.
18. **D3**: "How does first-past-the-post work?" — same as D1.
19. **D4**: "What time does Parliament sit?" — could be either; verify if it does call, citation is included.
20. **D5**: "Who is the current Prime Minister?" — should answer from search/training, not from this MCP (we don't have a current-PM tool).

### Metrics tracked per run

- Per-task: correct (binary), tool calls made, tokens consumed, errors, elapsed ms.
- Aggregate: accuracy %, mean tool calls per correct task, mean tokens per correct task.
- Per-tool: call frequency, error rate, mean latency. Reveals if any tool is consistently misused or over-called.

---

## 7. Publishing checklist (M8)

- [ ] `package.json` has: `name`, `version`, `description`, `keywords` (incl. `mcp`, `parliament`, `civic-tech`), `repository`, `license`, `bugs`, `homepage`, `bin`, `exports`, `files`, `engines` (`node >= 22`).
- [ ] `dist/` cleanly builds and runs from a fresh `pnpm install`.
- [ ] README has a "Quickstart" with the literal `claude mcp add` command.
- [ ] README has a "Tools" section auto-generated from the registered tool list (build script reads the registry, writes a markdown table).
- [ ] CHANGELOG.md generated by changesets.
- [ ] License notice in every published file is unnecessary (the LICENSE file is enough), but the README's first line attributes Parliament data under OPL.
- [ ] `npm publish --access public` from CI.
- [ ] MCP registry submission filed at the official registry URL.

---

## 8. Open implementation questions (resolve in PR review or refinement)

These don't block the start of work; flag them when you hit them.

1. **Demo app name.** Shortlist: *Open House*, *In Session*, *Order Paper*, *Constituent*, *Aye Aye*. Until picked, the plan uses `apps/[demo-app-name]` as a placeholder. Pick before M0 so the workspace config doesn't churn.
2. **Caching.** Deferred from v1. We're testing locally with direct upstream calls. Revisit when going hosted / streamable HTTP MCP; expect to add an LRU layer at `lib/cache.ts` with per-namespace TTLs at that point.
3. **Whether to include `parliament_list_policy_areas` as the 10th tool.** Seeded from `Reference/PolicyInterests`. Add only if the eval set shows `topic_tracker` consistently picks bad keywords. The plan keeps headroom for this.
4. **Photo URLs in member responses.** Anthropic guidance says hide low-signal IDs/URLs by default. But MP photos are high-signal for the eventual artifact. Compromise: only in `response_format: "detailed"`.
5. **Hansard search query syntax.** The upstream API supports an undocumented but powerful query language (quotes, NEAR, party:, section:). Decide whether to expose this or wrap it. Recommend: hide for v1, document for power users in README.
6. **Lords Votes API URL.** Still needs a live check before M5. If the URL doesn't resolve, fall back to a documented "Commons-only for v1" limitation.
7. **Sub-agent orchestration.** Out of scope for this build (Phase 2). Don't accidentally implement it in `topic_tracker`; that tool fans out via `Promise.all` in the same process, not via Claude sub-agents.
8. **Telemetry.** Should published `mp-mcp` collect anonymous usage stats (counts only)? Recommend: no, full stop, for a civic tool. Flag in README that there is no telemetry.
9. **Bun-specific MCP SDK issues.** Track upstream SDK issues #260 and #709 — verify the published artifact resolves cleanly under Bun before each release. If breakage is detected, drop Bun from the CI matrix temporarily and flag in CHANGELOG.

---

## 9. Out of scope (explicit)

So nobody accidentally builds these:

- The Westminster Watch demo app (separate plan)
- Sub-agent orchestration (Phase 2)
- Streamable HTTP MCP transport (Phase 2)
- SQLite-backed caching (v2)
- APPGs tool (deferred)
- Historic members (pre-2010) — `Members/SearchHistorical` exists but isn't exposed
- TheyWorkForYou integration (deliberately avoided; see CLAUDE.md)
- A "potential conflicts" tool that joins `Voting` with `RegisteredInterests`. Discussed and explicitly rejected: characterising overlap as a conflict is a legal and reputational hazard the MCP shouldn't take on. `parliament_member_interests` exposes the data and its description steers the agent away from the conflict framing; downstream callers can draw their own conclusions.

---

## 10. Reading order for Claude Code

All references below are in-repo. The Cowork research docs are deliberately not in this repo (see §0.1).

1. Read `CLAUDE.md` at the repo root for current milestone, locked conventions, and entry points.
2. Read this file (`docs/implementation-plan.md`) — §0 (Definition of Done), §1 (tooling), §2 (layout), §4 (cross-cutting), then the milestone you're on.
3. When a decision needs justifying, read the relevant ADR under `docs/adrs/`.
4. After completing a milestone:
   - Update `CLAUDE.md` "Current milestone" line.
   - Add a changeset describing the user-visible change.
   - Open a PR; rely on the CI matrix (Node 22 + Bun) to gate merge.

# ADR-0007: Langfuse observability for the demo apps

Status: Accepted
Date: 2026-06-03

## Context

We want observability for the demo to answer two engineering questions — **how
are tokens being spent**, and **how should the MCP tools be designed** (which
tools get called, with what args, returning what, how large, how often empty or
truncated, how slow). This is for improving `mp-mcp`, not product analytics.

The constraint that shaped everything: we do **not** own the agent loop. The LLM
call lives in the browser (`apps/agent-of-parliament`) and uses Anthropic's
hosted MCP connector (`mcp_toolset`), so Anthropic — not our code — runs the tool
loop and calls `apps/mcp-host` for each tool. Token usage is therefore visible
only in the browser stream; accurate server-side tool latency is visible only in
mcp-host. The only field Anthropic forwards from the connector config to the MCP
server is `authorization_token` (verified against `@anthropic-ai/sdk` 0.100.1:
`BetaRequestMCPServerURLDefinition` exposes only `name`/`type`/`url`/`authorization_token`/`tool_configuration`).

Alternatives considered and rejected: (a) OpenTelemetry with a browser→Anthropic→server
distributed trace — the hosted connector breaks W3C context propagation and the
only carrier is `authorization_token` anyway, so OTel added machinery without
removing the core constraint; (b) moving the agent loop server-side to own it
cleanly — rejected to preserve the app's zero-backend, bring-your-own-key shape;
(c) Langfuse's browser SDK with a public key — its browser client is scores-only
and cannot write traces.

## Decision

Use **Langfuse** (no OpenTelemetry) and assemble **one trace per turn** from two
ends, joined by a Langfuse `traceId` the browser carries in the connector's
`authorization_token`:

- **Browser** owns the trace, the `generation` (model + token usage incl. cache
  read/creation, so Langfuse computes cost), and a **client-side span per tool
  call** with the args, the (capped) result body, result size, `upstream_calls`,
  `truncated`, and citation count it sees in the stream. It holds **no Langfuse
  credential** — it POSTs the captured turn to a same-origin Next route handler
  (`app/api/trace/route.ts`) that writes to Langfuse with the **server-side secret
  key**.
- **mcp-host** writes a **server-side span per tool call** with accurate wall-clock
  latency, using its own server key, attached to the same `traceId`.
- **`mp-mcp` is untouched** — no telemetry code, no new dependency in the
  published package.

Tool result bodies (public OPL parliamentary data, no PII) are recorded for
tool-design inspection, capped to 10 KB per call (`TELEMETRY_OUTPUT_CAP`) because
the whole turn is POSTed in one `keepalive` request (~64 KB browser limit);
`response_bytes` keeps the true uncapped size as a queryable metric.

## Consequences

- Both questions are answerable from one trace: token cost/cache health on the
  generation; tool name, args, actual response, size, empties, truncation, and
  accurate server latency on the spans — sliceable per tool in Langfuse.
- The instrumentation is Langfuse-specific by choice (simplest for the demo), but
  the data model (turn → generation + spans) is conventional; re-pointing at
  another backend later is a contained change in two writers.
- **Trade-offs accepted for a demo, not production-grade:** the trace is
  assembled from two independent writers rather than a single propagated context;
  `authorization_token` is repurposed as the trace-link carrier (mcp-host has no
  real auth today — if it gains some, the token must carry both); tool **args**
  may contain user PII (e.g. a postcode) sent to our own Langfuse; and the
  per-call Parliament API upstream waterfall is not captured (that would require
  instrumenting `mp-mcp`).
- Telemetry is opt-in and inert by default: off without `NEXT_PUBLIC_TELEMETRY_ENABLED`
  (browser) or the `LANGFUSE_*` env (mcp-host), and failures never break a turn.
- No changeset: `packages/mp-mcp` is unchanged and the apps are unpublished. A
  vitest config was added to `apps/mcp-host` so its `src` tests are discovered
  (they previously matched no config).
- Reversing this is cheap: delete the route handler, the two telemetry modules,
  the sink hook in `transform.ts`, and the `authorization_token`/span additions;
  nothing else depends on it.

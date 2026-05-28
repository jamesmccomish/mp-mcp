---
description: Scaffold a new MCP tool following project conventions
argument-hint: <toolName in camelCase, e.g. searchHansard>
---

Scaffold a new MCP tool named `$ARGUMENTS` for the `mp-mcp` package. Follow these conventions exactly — they encode the project's tool-design contract:

## 1. Verify the name

- Must be camelCase in source (e.g. `searchHansard`).
- The corresponding MCP tool name (registered with the SDK) must be `parliament_<snake_case>` (e.g. `parliament_search_hansard`). All tools share this prefix.
- If a tool of this name already exists, stop and ask whether to overwrite.

## 2. Create the handler

File: `packages/mp-mcp/src/tools/$ARGUMENTS.ts`

The handler must:

- Define inputs with a **Zod schema**. Export both the schema and the inferred TS type.
- Include a `response_format: z.enum(["concise", "detailed"]).default("concise")` input on any tool that surfaces IDs or URLs the agent might need for chaining.
- Wrap upstream calls through `clients/http.ts`. Do not call `fetch` directly.
- Return the shared envelope from `src/lib/responseFormat.ts` and `src/lib/citations.ts`:

  ```ts
  type ToolResponse<T> = {
    data: T;
    sources: Array<{ title: string; url: string }>;
    meta?: { upstream_calls?: number; truncated?: boolean; truncation_hint?: string };
  };
  ```

- `sources` must be non-empty for any factual response. Use the builders in `src/lib/citations.ts`.
- On errors, throw `ParliamentToolError(code, message, suggestion)` from `src/lib/errors.ts`. The `suggestion` field must tell the agent what to try next — not just describe the error.

## 3. Write the tool description

The description is prompt engineering, not documentation. It must include:

- **One sentence** stating what the tool returns.
- **One positive example** of a query the tool is good for.
- **One negative example** of a query the tool is wrong for (steers agents to a sibling tool).
- **A citation reminder**: *"This response includes a `sources` array of parliament.uk URLs. Cite them inline when making factual claims to the user."*

When the description is drafted, invoke the `tool-description-reviewer` sub-agent (under `.claude/agents/`) to critique it before committing.

## 4. Register the tool

Update `packages/mp-mcp/src/tools/index.ts` to import and register the new tool with the MCP server.

## 5. Add a snapshot test

File: `packages/mp-mcp/tests/unit/$ARGUMENTS.test.ts`

- Mock the upstream client(s) with a representative response shape.
- Snapshot the tool's success response.
- Snapshot at least one error response (use one of the `ParliamentToolError` codes).

## 6. Verify

Run `pnpm typecheck && pnpm lint && pnpm test`. All three must pass before the work is considered complete.

## 7. Tell me what you did

Print a short summary: the tool name (both source and MCP-registered forms), the files created/modified, and any open follow-ups (e.g. "description still needs reviewer pass").

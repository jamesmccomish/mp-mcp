# `src/generated/`

OpenAPI type definitions emitted by `pnpm gen:types`. **Do not edit by hand** —
changes will be overwritten on the next refresh.

The script `scripts/gen-types.ts` fetches Swagger specs from
[developer.parliament.uk](https://developer.parliament.uk/) and runs them
through `openapi-typescript`. Output is committed for reproducibility so
consumers don't need network access at install time.

Refresh after a known Parliament API change:

```bash
pnpm --filter mp-mcp gen:types
```

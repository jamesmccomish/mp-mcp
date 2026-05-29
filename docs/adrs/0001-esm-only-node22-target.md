# ADR-0001: ESM-only build targeting Node 22

Status: Accepted
Date: 2026-05-29

## Context

`mp-mcp` is published to npm for agent runtimes to launch as a subprocess. The
stack was locked in `CLAUDE.md` and `docs/implementation-plan.md` §1: TypeScript
5.6+ strict, a `tsc` build with no bundler, Node 22 as the published target, and
Bun supported only as a dev runtime. Node 22 is the active LTS for the publish
window, and every runtime dependency (`@modelcontextprotocol/sdk`, undici, pino,
zod) ships ESM. A dual CJS/ESM build via tooling such as tshy was tried and
removed during M7 (commit `118cfec`: "drop tshy; fix MCP registration + ESM
cycle").

## Decision

Ship ESM-only, compiled with `tsc` to `dist/`, targeting Node ≥22 (declared in
`engines`). No CommonJS output and no bundler. The `exports` map exposes `.` and
`./stdio`; `bin: mp-mcp` resolves to `dist/stdio.js`.

## Consequences

- Simpler build and publish shape: one module format, no dual-package hazard,
  `tsc` as the only build step. `publint` and `@arethetypeswrong/cli` gate the
  published shape.
- Drops Node <22 and CJS-only consumers. Acceptable because the server runs as a
  stdio subprocess, so the host's own module system is irrelevant — only its Node
  version matters.
- Reversing this (adding CJS) means reintroducing a dual-build tool and re-solving
  the ESM import cycle that M7 removed, so it is not a cheap change.

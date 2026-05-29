# ADR-0002: Commit generated OpenAPI types instead of generating on install

Status: Accepted
Date: 2026-05-29

## Context

The upstream clients are typed from the UK Parliament OpenAPI specs via
`openapi-typescript`, emitted under `src/generated/`. There were two options:
regenerate the types during a `postinstall` hook, or commit the generated output
to the repo. The implementation plan (§1) prioritises an offline-installable,
network-free install.

## Decision

Commit `src/generated/` to the repo. Regeneration is a manual, explicit step
(`pnpm gen:types`), never wired into an install hook. The generated files are
never hand-edited.

## Consequences

- `pnpm install` needs no network access to Parliament APIs and cannot break when
  an upstream spec endpoint is down or has changed shape unexpectedly.
- Upstream schema drift is surfaced deliberately — re-run `gen:types` and review
  the diff — rather than silently at install time. The `domain/` and `clients/`
  layering contains the blast radius of a regenerated `generated/`.
- Trade-off: the committed types can fall out of date between regenerations. The
  README documents the regen command so contributors keep them current.

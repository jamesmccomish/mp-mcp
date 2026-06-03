---
description: Add a changeset for pending mp-mcp changes and verify the package is shippable. Does not publish — that happens automatically when the resulting Changesets PR merges to main.
argument-hint: [bump-type: patch|minor|major] [summary]
---

You are helping the user prepare a release of `@jamesmccomish/mp-mcp`. The package publishes to npm automatically via the Changesets GitHub Action on `main`. The two apps in this repo (`agent-of-parliament`, `mcp-host`) consume the package via the monorepo workspace, not from npm — they are deliberately ignored by Changesets and do not need a version bump. This skill is purely about the public npm artifact.

The arguments are optional. If `$ARGUMENTS` is empty, ask the user once for the bump type and a one-line summary, then proceed. If they pass arguments, use them as-is and skip the question.

## 1. Verify the package has changes worth releasing

Run `git diff --stat origin/main...HEAD -- packages/mp-mcp/src packages/mp-mcp/package.json` to confirm there are actual source changes on this branch.

- If there are **no changes** under `packages/mp-mcp/src/` or its `package.json`: stop. Tell the user no release is needed and exit. Do not create a changeset for a no-op.
- If the only changes are to **tests, docs, or evals**: ask the user whether this still warrants a release. Test-only changes typically do not — they should land without a changeset.

## 2. Check whether a changeset already exists

Run `ls .changeset/*.md 2>/dev/null | grep -v README.md`.

- If a non-README changeset file already exists on this branch, **stop and report** — do not add a second one. Show the user the existing changeset content and confirm whether to amend or skip.
- Otherwise proceed.

## 3. Pick the bump type

If not supplied via `$ARGUMENTS`, ask the user once:

- `patch` — bug fixes, internal refactors, no API change visible to consumers.
- `minor` — new functionality, additive API changes. **Pre-1.0 convention in this repo: also use `minor` for breaking changes** (since SemVer's "anything goes pre-1.0" is the explicit posture until a 1.0 is cut).
- `major` — only once the package is at 1.0 or higher.

Inspect the diff from step 1 and **recommend** a type with reasoning before asking. If the response shape of an exported tool or type changed, that is a breaking change → `minor` (pre-1.0) or `major` (post-1.0). If only internals changed, `patch`.

The user can override your recommendation; trust their judgement.

## 4. Write the changeset

Generate a kebab-case slug from the summary (e.g. `hansard-dual-mode-search`). Create `.changeset/<slug>.md` with this exact format:

```markdown
---
"@jamesmccomish/mp-mcp": <bump-type>
---

<one-line summary in the imperative — what changed and, briefly, why it matters to a consumer>
```

The summary becomes the public changelog entry on npm. Write it as something an external consumer of the package would want to read — e.g. "search_hansard now returns debate titles by default; supply member_id to drill into a member's contributions" — not as an internal task description.

If the change is breaking, **explicitly flag it** in the summary with a leading `BREAKING:` so it surfaces in the changelog.

## 5. Verify the package is healthy

Run the full package gate, from the repo root:

```bash
pnpm --filter @jamesmccomish/mp-mcp typecheck && \
pnpm --filter @jamesmccomish/mp-mcp test && \
pnpm --filter @jamesmccomish/mp-mcp build
```

All three must pass. If any fails, **do not commit the changeset** — surface the failure and stop. A red gate means the release is not ready; adding a changeset on top is premature.

## 6. Stage the changeset

Stage only the changeset file:

```bash
git add .changeset/<slug>.md
```

Do not auto-commit. The user may want to bundle the changeset into an existing commit (e.g. `git commit --amend`) or write its own commit message. Tell them which command to run next based on context:

- If the branch already has a commit for this work and no other staged changes: suggest `git commit --amend --no-edit` (the changeset rides along on the existing commit).
- Otherwise: suggest `git commit -m "chore: add changeset for <summary>"`.

Never push. The user pushes when they're ready.

## 7. Report what happens next

Print a short summary:

- The changeset file path and contents.
- The bump type and reasoning.
- What happens after merge to `main`: the Changesets action opens a "chore: release packages" PR that bumps the version and updates the changelog. Merging that PR publishes to npm and tags a release. The two apps consume the workspace source and will redeploy on their own commit cadence — they are intentionally not bumped here.

## Rationalisations to refuse

- "Skip the build step, tests are fine" — no. The package gate is typecheck + test + **build**. Build failures are how broken type exports surface. Run all three.
- "Just publish manually with `pnpm publish`" — no. The release workflow has signing, provenance, and the changelog automation wired up. Manual publish skips all of that. If the user insists, ask why and defer to them.
- "Add a changeset for the test changes too" — no. Changesets describe consumer-visible changes. Test-only or eval-only changes do not warrant a release entry.
- "The two apps need a bump in their package.json" — no. They consume `@jamesmccomish/mp-mcp` via the workspace protocol and are listed in `.changeset/config.json`'s `ignore` array. Their deploy cadence is independent of the package's npm release.

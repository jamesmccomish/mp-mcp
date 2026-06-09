---
name: release-package
description: Add a changeset for pending mp-mcp changes and verify the package is shippable. Does not publish.
---

# Release Package

Prepare a release of `@jamesmccomish/mp-mcp`. The package publishes to npm automatically via the Changesets GitHub Action on `main`. The two apps in this repo (`agent-of-parliament`, `mcp-host`) consume the package via the monorepo workspace, not from npm; they are ignored by Changesets and do not need a version bump.

Arguments are optional. If no bump type and summary are supplied, ask the user once for them, then proceed. If the user supplies arguments, use them as-is and skip the question.

## 1. Verify the package has changes worth releasing

Run:

```bash
git diff --stat origin/main...HEAD -- packages/mp-mcp/src packages/mp-mcp/package.json
```

- If there are no changes under `packages/mp-mcp/src/` or `packages/mp-mcp/package.json`, stop. Tell the user no release is needed. Do not create a changeset for a no-op.
- If the only changes are to tests, docs, or evals, ask whether this still warrants a release. Test-only changes typically do not.

## 2. Check whether a changeset already exists

Run:

```bash
ls .changeset/*.md 2>/dev/null | grep -v README.md
```

- If a non-README changeset file already exists on this branch, stop and report it. Show the existing changeset content and ask whether to amend or skip.
- Otherwise proceed.

## 3. Pick the bump type

If not supplied by the user, ask once:

- `patch` — bug fixes, internal refactors, no API change visible to consumers.
- `minor` — new functionality, additive API changes. Pre-1.0 convention in this repo: also use `minor` for breaking changes.
- `major` — only once the package is at 1.0 or higher.

Inspect the diff from step 1 and recommend a type with reasoning before asking. If the response shape of an exported tool or type changed, that is a breaking change: `minor` pre-1.0, `major` post-1.0. If only internals changed, use `patch`.

The user can override the recommendation.

## 4. Write the changeset

Generate a kebab-case slug from the summary. Create `.changeset/<slug>.md` with this exact format:

```markdown
---
"@jamesmccomish/mp-mcp": <bump-type>
---

<one-line summary in the imperative — what changed and, briefly, why it matters to a consumer>
```

The summary becomes the public changelog entry on npm. Write it for an external consumer of the package, not as an internal task description.

If the change is breaking, start the summary with `BREAKING:`.

## 5. Verify the package is healthy

Run the full package gate from the repo root:

```bash
pnpm --filter @jamesmccomish/mp-mcp typecheck && \
pnpm --filter @jamesmccomish/mp-mcp test && \
pnpm --filter @jamesmccomish/mp-mcp build
```

All three must pass. If any fails, do not stage the changeset; surface the failure and stop.

## 6. Stage the changeset

Stage only the changeset file:

```bash
git add .changeset/<slug>.md
```

Do not auto-commit. Tell the user which command to run next:

- If the branch already has a commit for this work and no other staged changes, suggest `git commit --amend --no-edit`.
- Otherwise, suggest `git commit -m "chore: add changeset for <summary>"`.

Never push.

## 7. Report what happens next

Print a short summary:

- The changeset file path and contents.
- The bump type and reasoning.
- What happens after merge to `main`: the Changesets action opens a release PR that bumps the version and updates the changelog. Merging that PR publishes to npm and tags a release.

## Refuse these shortcuts

- Skipping the build step.
- Publishing manually with `pnpm publish`.
- Adding changesets for test-only or eval-only changes without user confirmation.
- Bumping the two apps' package versions.

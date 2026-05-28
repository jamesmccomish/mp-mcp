# Changesets

This folder is managed by [changesets](https://github.com/changesets/changesets).

To add a new changeset describing a user-visible change, run:

```bash
pnpm changeset
```

The CLI will prompt for the affected package, the bump type (patch/minor/major),
and a short summary. The resulting markdown file is committed alongside the PR
that introduces the change. On merge to `main`, the release workflow opens a
"Version Packages" PR that consumes the changesets, bumps versions, and updates
changelogs.

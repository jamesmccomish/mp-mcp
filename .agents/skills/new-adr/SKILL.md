---
name: new-adr
description: Append a new numbered Architecture Decision Record under docs/adrs/. Use when recording a new project decision.
---

# New ADR

Create a new ADR with a short kebab-case slug under `docs/adrs/`.

## 1. Determine the next ADR number

- List existing files in `docs/adrs/` matching the pattern `NNNN-*.md`.
- Take the highest number and add 1. Pad to 4 digits.
- If the directory is empty, the next number is `0001`.

## 2. Create the file

Path: `docs/adrs/<NNNN>-<slug>.md`

Use exactly this template. Do not invent extra sections:

```markdown
# ADR-<NNNN>: <Title in Sentence case>

Status: Proposed
Date: <YYYY-MM-DD>

## Context

What's the problem or situation that prompted this decision? Be concrete and citable — name the milestone, PR, or eval finding that surfaced it.

## Decision

What did we decide? State it in one or two sentences. If the decision supersedes a previous ADR, name it here (e.g. "Supersedes ADR-0003").

## Consequences

What changes as a result? Include both upsides and trade-offs. If the decision is reversible, note what reversing it would cost.
```

## 3. Leave placeholders

Do not pre-fill the body. Leave the placeholders in place so the user can fill them in. The point of this workflow is to enforce numbering, status, and structure.

## 4. Remind the user of the append-only rule

ADRs are append-only. If a decision changes later, write a new ADR that supersedes the old one rather than editing the original. The audit trail is the value.

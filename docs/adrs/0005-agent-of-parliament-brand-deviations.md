# ADR-0005: Agent of Parliament brand deviations

Status: Accepted
Date: 2026-06-01

## Context

`apps/agent-of-parliament` implements the "Modern civic" / Order Paper aesthetic
from `docs/visual-brand.md`. During the brainstorming session for M8 (UI redesign),
three intentional departures from the brand doc were agreed with the product owner.
All three are presentation-layer decisions scoped entirely to this demo app; the
`packages/mp-mcp` server and its brand rules are unaffected.

## Decision

### 1. Chat bubbles (overrides brand doc §4.2)

**Brand doc says:** "No avatar, no bubble" — a flat editorial rail with no
speech-bubble containers.

**We do instead:** Two distinct bubble styles — user turns are green-filled and
right-aligned; assistant turns are cream-paper bubbles with a hairline border,
left-aligned, preceded by a small mono `CLAUDE` label in gilt.

**Rationale:** Bubbles give clearer visual separation between user and assistant
turns in a streaming context where multiple partial messages appear in sequence.
They are rendered in brand colours (civic green / paper) so the aesthetic remains
civic, not iMessage-like.

### 2. On-demand map popover (overrides brand doc §4.9)

**Brand doc says:** The map is an ambient watermark behind the canvas — "never
above … never a control".

**We do instead:** A `Map` button in the top bar, dormant by default, with a gilt
count badge when constituencies are in context. Clicking it opens a popover
anchored under the button, showing the `ConstituencyMap` with in-context
constituencies highlighted.

**Rationale:** An always-on faint watermark was judged wasteful and visually noisy
for a chat-first layout. The on-demand popover gives cards full canvas width in the
default state and surfaces the map only when it is meaningful (i.e. a constituency
is in context). The badge count communicates map relevance without forcing it on
screen.

### 3. Folder framing (overrides brand doc §3)

**Brand doc says:** "Single page, no nav" — a single conversation with no chrome
suggesting multiple threads.

**We do instead:** A manila-folder visual treatment wrapping the single
conversation — a tab labelled `CONVERSATION` (mono) sitting on a bordered panel.

**Rationale:** Visual only. There is no multi-thread state, no persistence, and no
switching mechanism. The folder metaphor reinforces the "parliamentary session"
concept and gives the chat rail a contained, document-like feel without adding any
navigation infrastructure.

## Consequences

- All three deviations are confined to `apps/agent-of-parliament` presentation
  layer. No changes to agent behaviour, tool definitions, adapters, or data.
- If the brand doc is later revised to accommodate these patterns, this ADR can be
  superseded. Until then it records the explicit override so future contributors
  know the departures are intentional.
- The rest of the brand doc holds without exception: tokens, three-typeface system,
  paper/ground surfaces, green top stripe, noise overlay, kicker + display-title
  card headers, division-lobby bar, mandatory mono sources row, restrained motion,
  no emoji, OPL attribution.

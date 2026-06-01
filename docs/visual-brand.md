# Visual brand — Agent of Parliament

A short, code-actionable guide for building the demo app's UI. The brand already exists in two places: the principles in `agent-of-parliament-concept.md` §8 ("Modern civic") and the executed `apps/mcp-host` landing page. This doc consolidates them into tokens and component rules a developer (or Claude Code) can apply without re-deciding anything.

**North star, in one line.** A well-made public-institution product — paper, ink, and a green rule — rendered with a touch of pastiche from the Order Paper and Hansard, but interactive and quietly modern. Not GOV.UK austerity, not a startup dashboard.

---

## 1. Design tokens

Paste these as CSS custom properties at the app root. They are identical to the landing page, plus a few additions the interactive UI needs (Lords red, party accents, focus, danger).

```css
:root {
  /* Paper & ink */
  --paper:       #f4f0e6;  /* card / surface background */
  --ground:      #e3dccb;  /* page background behind paper */
  --ink:         #211e18;  /* primary text — warm near-black */
  --muted:       #6b6453;  /* secondary text, labels */
  --rule:        #cdc4ad;  /* hairline separators */

  /* Civic accents */
  --green:       #00603c;  /* Commons benches — primary accent */
  --green-tint:  rgba(0, 96, 60, 0.05);  /* citation / highlight wash */
  --green-line:  rgba(0, 96, 60, 0.25);
  --lords-red:   #a3253f;  /* Lords — secondary accent, used sparingly */
  --gilt:        #a9842c;  /* drop cap, prompt $, hover underline */

  /* Party accents — used ONLY inside cards where they carry meaning */
  --party-con:   #0087dc;
  --party-lab:   #d50000;
  --party-libdem:#faa61a;
  --party-snp:   #fff685;
  --party-green: #6ab023;
  --party-reform:#12b6cf;
  --party-pc:    #008142;  /* Plaid Cymru */
  --party-dup:   #d46a4c;
  --party-sf:    #326760;
  --party-ind:   #888888;

  /* Status */
  --aye:         var(--green);
  --no:          var(--lords-red);
  --focus:       var(--gilt);
  --danger:      #8b1e1e;

  /* Type */
  --serif:   "EB Garamond", Georgia, "Times New Roman", serif;
  --display: "Libre Caslon Display", Georgia, serif;
  --mono:    "IBM Plex Mono", ui-monospace, "SFMono-Regular", monospace;

  /* Geometry */
  --radius-sm: 2px;
  --radius:    3px;
  --radius-lg: 6px;
  --rule-1:    1px solid var(--rule);
  --rule-ink:  1px solid var(--ink);

  /* Elevation — keep low; whitespace does the work */
  --shadow-card: 0 1px 0 rgba(255,255,255,.6) inset,
                 0 6px 18px -10px rgba(40,32,12,.25);
  --shadow-page: 0 1px 0 rgba(255,255,255,.6) inset,
                 0 24px 60px -28px rgba(40,32,12,.45),
                 0 2px 6px rgba(40,32,12,.10);
}
```

Dark mode is **out of scope for v1**. The product is paper; paper doesn't go dark.

---

## 2. Typography

Three faces, each with one job. Do not introduce a fourth without a strong reason.

| Face | Role | Examples |
|---|---|---|
| **Libre Caslon Display** (`--display`) | Display only — page titles, MP names on cards, drop cap | "How has my MP voted on climate?", "Stella Creasy" |
| **EB Garamond** (`--serif`) | Body copy, narration, debate excerpts, card prose | Chat messages, Hansard quotations, descriptions |
| **IBM Plex Mono** (`--mono`) | Metadata, labels, refs, code, dates, tool names | Section heads, "REF.", division IDs, `parliament_get_division` |

**Scale (rem-based, 16px root).** Use this as a starting point; deviate only with a reason.

| Token | Size | Line-height | Weight | Use |
|---|---|---|---|---|
| `text-display-lg` | 2.4–3rem (clamp) | 1.08 | 400 | Page title / hero |
| `text-display` | 1.5rem | 1.15 | 400 | Card title (MP name) |
| `text-body-lg` | 1.1875rem | 1.6 | 400 | Chat narration, lead paragraphs |
| `text-body` | 1.0625rem | 1.55 | 400 | Card body, descriptions |
| `text-meta` | 0.78rem | 1.4 | 500 | Mono labels, section heads, refs (`letter-spacing: .22–.26em; text-transform: uppercase`) |
| `text-data` | 0.9rem | 1.4 | 400 | Mono numerics, tool names |
| `text-caption` | 0.78rem | 1.5 | 400 | Citations, footnotes |

**Rules of thumb.**
- Mono is always uppercase + letter-spaced when used as a label (`letter-spacing: .22em`); never as a paragraph.
- The display face never sets body text. Garamond never sets a number tag or a tool name.
- Generous line-height. Nothing cramped. Body line-length: 60–75ch.

---

## 3. Surfaces & layout

The page is **paper on ground**. Cards are smaller pieces of the same paper. Everything sits on the warm cream background of the host.

```
┌─────────────────────────────────────────────────────────────────┐  ← --ground
│   ┌─────────────────────────────────────────────────────────┐   │
│   │                       PAPER (--paper)                   │   │  ← top: 3px solid --green
│   │   subtle noise overlay @ 4% opacity                     │   │
│   │   ── double rule (--ink, 4px gap) ───────────────────── │   │
│   │   refline (mono, muted)                                 │   │
│   │   title (display)                                       │   │
│   │   body…                                                 │   │
│   └─────────────────────────────────────────────────────────┘   │  ← --shadow-page
└─────────────────────────────────────────────────────────────────┘
```

**Carry these from the landing page into the app:**

- **Green top stripe** (3px) on the page chrome. It is the signature.
- **Paper texture**: the SVG fractal-noise overlay at ~4% opacity, `mix-blend-mode: multiply`. One declaration, applied once on the page shell.
- **Double rule** (`border-top + border-bottom`, 4px tall) under the letterhead. Reuse on card sections that deserve formal punctuation; do not over-use.
- **Section heads** are mono uppercase, gilt, with a hairline rule that fills the remaining width (`::after { flex: 1; height: 1px; background: var(--rule); }`).
- **Citation block** for prominent attribution / a quoted excerpt: green-tint background, 3px left border in `--green`. This is the canonical "look at this source" surface.

**App layout (desktop).** Reuses the concept doc §5 zones — chat rail (~38%), canvas (~62%), ambient map watermark behind the canvas, slim top bar, OPL footer. Single page, no nav.

---

## 4. Component patterns

Every component below should be implementable as a self-contained React/HTML block reading only the tokens above.

### 4.1 Top bar
Slim, paper. Left: emblem + wordmark (`Agent of Parliament` set in display). Right: `[Plain English ⌄]` toggle, `[API key ●]` status pip (green when set), `[About]`. Border-bottom: `--rule-1`. Height ~56px.

### 4.2 Chat rail
- Background `--paper`. Right edge: `--rule-1` separating from canvas.
- **User turn:** Garamond, ink, indent 0, preceded by a thin gilt vertical rule.
- **Assistant turn:** Garamond, ink. No avatar, no bubble. A small mono label `CLAUDE` above the first line of each new turn, in `--muted`.
- **Streaming caret:** a 1ex-tall block in `--gilt` that blinks at 1.2s; remove on stream end.
- **Composer:** at bottom, full-width, ink-on-paper input, 1px ink rule on focus, Garamond text. The send button is a mono pill labelled `ASK →` in `--green`.

### 4.3 Sample prompt chips (empty state)
Mono-uppercase 11px, letter-spaced. Pill: 1px `--rule`, no fill, hover fill `--green-tint` and border `--green`. Five chips, single row, horizontally scrollable on overflow. Use the six prompts from concept doc §6.

### 4.4 Cards (general rules)
- Surface `--paper`, `--shadow-card`, `--radius-lg`, hairline border `--rule-1`. **Never** a heavy shadow.
- 24px internal padding desktop, 16px mobile.
- Card header has a **kicker** (mono uppercase, 10.5px, letter-spacing .22em) naming the card type — `MP PROFILE`, `DIVISION`, `HANSARD`, `TOPIC` — followed by the title in display face.
- Each card carries a **source row** at the foot: mono caption, parliament.uk / hansard.parliament.uk links. This is the inline-citation contract made visible.
- Cards stack newest-on-top. Entry motion: see §6.
- Top-right of each card: a small mono `SNAPSHOT` button (ghost, gilt on hover) — exports as image.

### 4.5 MP profile card (the hero)
- Two-column layout on desktop: photo + name/party/constituency block on the left, recent-activity strip and voting snapshot on the right.
- **Party colour bar**: a 4px stripe across the top of the photo or below the name, using the relevant `--party-*` token. This is the *only* place party colour appears at this scale.
- The map highlights the seat in `--green` (see §4.9).

### 4.6 Vote / division card — **division-lobby bar**
This is the brand's signature interactive motif. Do not replace it with a generic progress bar.

```
  AYES  ████████████████████░░  324
  NOES  ████████░░░░░░░░░░░░░░  198
                 (tellers · 4)
```

- Two stacked rows labelled `AYES` and `NOES` in mono uppercase. Bars set in `--aye` / `--no`.
- The two bars share the same baseline width; the fill is proportional to the count, with the unused portion in `--rule` at low opacity.
- When the card is reached through an MP, the row matching that MP's vote gets a 2px outline in `--gilt` and a small caption: `Stella Creasy voted AYE` in mono.
- Below the bar: party-by-party breakdown as a single horizontal stack of party-coloured segments, with a mono legend underneath. Hover reveals counts.
- If the division happened in the Lords, the kicker reads `LORDS DIVISION` and the chrome uses `--lords-red` in place of `--green` for that one card only.

### 4.7 Hansard / debate card
- Excerpt in Garamond, *italic*, set in a column-style block: max-width ~52ch, left rule `--rule-1`, indent. Capped at the 400-char tool contract.
- Speaker (display face, small) + date (mono).
- **Plain English toggle**: a mono pill in the card header, two states `VERBATIM` / `PLAIN ENGLISH`. When on, the excerpt is re-rendered by Claude in place; a small mono caption notes `re-rendered`.

### 4.8 Topic tracker card (the synthesis)
A vertical, sectioned panel — *not* one tight card. Sections in this fixed order with mono group labels (same style as the landing page's "Identity / Synthesis / Detailed lookups" groups):

1. `BILLS IN PROGRESS`
2. `RECENT DEBATES`
3. `RECENT VOTES` (with mini division-lobby bars)
4. `WRITTEN QUESTIONS`
5. `PETITIONS` (with signature counts)

Each section is separated by `--rule-1`. Items inside are rows in the order-paper rhythm: mono identifier left, Garamond description right.

### 4.9 Ambient UK map
- TopoJSON of 2024 constituency boundaries, simplified with mapshaper, <300KB, lazy-loaded.
- Default state: flat fill `--ground` (the page background, so the map disappears at rest), strokes `--rule` at 0.5px.
- Active state: the constituency in focus fills `--green` at 35% opacity, with a 1.5px `--green` stroke. Cross-fade 320ms.
- The map is positioned absolute behind the canvas, never above. **Never** a control — you cannot click it.

### 4.10 Footer
Mono caption, `--muted`, single line where possible: *Contains Parliamentary information licensed under the Open Parliament Licence v3.0.* OPL link with hover underline in `--gilt`.

---

## 5. Iconography & emblem

- **Emblem.** Reuse the portcullis-inspired SVG from the landing page (5 bars, 3 horizontals, 5 triangular foots, all in `--green`). It is an *original* mark — do not swap it for the official crowned portcullis (trademark-restricted).
- **Icon set.** Single-stroke line icons at 1.5–2px, stroke `currentColor`. Use [Lucide](https://lucide.dev) as the source library; never mix with another set.
- **No emoji** in UI surfaces or copy.

---

## 6. Motion

Restrained and purposeful. Motion exists to communicate *the agent is working* and *a new object has arrived* — never decoration.

- Card entry: `opacity 0→1, translateY 8px→0`, **220ms**, `cubic-bezier(.2,.7,.2,1)`.
- Map highlight cross-fade: **320ms** linear, both regions in flight at once.
- Tool-trace step tick: a single 1px line draws across the active step, **180ms**.
- Streaming caret: 1.2s blink.
- Reduce-motion: respect `prefers-reduced-motion: reduce` — disable card slide-in (fade only), disable map crossfade (snap), keep caret.

No spinners. If something is loading, *say* so in mono caption (`fetching division…`). The trace itself is the loading state.

---

## 7. Tone of voice (microcopy)

The landing page voice is half formal-letter, half public-record. The app dials this down — interactive UIs can't be archaic — but keeps the *register*.

- Empty state greeting: one warm civic line, no exclamation marks. *"Ask Parliament a question."*
- Buttons: short, mono uppercase or display-cased verbs. `ASK →`, `SNAPSHOT`, `PLAIN ENGLISH`, `COPY CITATION`.
- Errors: stated plainly, no apology theatre. *"Members API returned no results for postcode BS3 4QH."*
- Sources line: *"Sources:"* then a comma-separated list of mono URLs. Never "References" or "Refs".
- API-key prompt: warm, explanatory, exactly as concept doc §5 — *"This runs on your own Anthropic key — paste it once, it stays in your browser."*

Avoid: "Awesome", "Let's…", "✨", marketing voice, "powered by AI".

---

## 8. Don'ts

- **Don't** use party colours as chrome — only inside cards where the colour carries meaning.
- **Don't** use the official Crowned Portcullis emblem. Trademark-restricted.
- **Don't** introduce a fourth typeface, an icon-set hybrid, or a coloured background other than `--paper` / `--ground`.
- **Don't** render a vote tally as a generic progress bar or pie chart. Use the division-lobby bar (§4.6).
- **Don't** show Hansard text without a citation row.
- **Don't** stack heavy drop-shadows. Hairlines and whitespace, not elevation.
- **Don't** put the ambient map above content or make it interactive.
- **Don't** use emoji or marketing-voice copy anywhere in the UI.

---

## 9. Implementation checklist (first card to ship)

When building the MP profile card as the vertical-slice (concept doc §9 step 3), the brand is correctly applied if:

- Page chrome carries the 3px `--green` top stripe and noise overlay.
- Card sits on `--paper` with `--shadow-card` and a hairline `--rule` border, on `--ground`.
- MP name is set in Libre Caslon Display; constituency in EB Garamond; party stripe uses one `--party-*` token; "MP PROFILE" kicker is mono uppercase, letter-spaced, in `--muted`.
- Sources row at card foot lists parliament.uk URLs in mono.
- Map behind the canvas tints the matching constituency in `--green` at 35%.
- Footer shows the OPL attribution in mono.

If all six pass, every later card type is a variation on the same machine.

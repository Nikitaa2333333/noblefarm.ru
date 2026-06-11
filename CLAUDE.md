# CLAUDE.md — Blagorodny Sever Design Law

> **This file is the single source of truth for how this site is built.**
> If you (Claude) find a pattern in the codebase that contradicts this file — fix the codebase, do not invent a new rule.

---

## 1. Project

**What**: marketing website for «Благородный Север» — premium farmed deer breeding, velvet antlers (panty), eco-tourism, wellness.
**Stack**: React 19 + Vite 6 + Tailwind v4 + Motion (Framer). TS, RU/EN/CN.
**Pages**: 8 tabs, rendered as a single SPA with `activeTab` state in `App.tsx`.

| # | Tab | Component | Status |
|---|---|---|---|
| 1 | Главная | `src/components/TabMain.tsx` | **ETALON** — do not modify without explicit approval |
| 2 | Генетика | `src/components/TabGenetics.tsx` | drift — needs katok refactor |
| 3 | Панты | `src/components/TabAntlers.tsx` | drift |
| 4 | Отрасль | `src/components/TabIndustry.tsx` | drift |
| 5 | Познакомиться | `src/components/TabPopularization.tsx` | drift |
| 6 | В СМИ | `src/components/TabMedia.tsx` | drift |
| 7 | Новости | `src/components/TabNews.tsx` | drift |
| 8 | Контакты | `src/components/TabContacts.tsx` | drift |

Content briefs (word-for-word, from client): `docs/specs/Вкладка-N.md`.

---

## 2. The Two Sources of Truth

| Source | Governs | Does NOT govern |
|---|---|---|
| `docs/specs/Вкладка-N.md` | texts, headings, section order, photo subjects | how it looks — radius, shadow, animation, card layout |
| **This file + `src/components/TabMain.tsx`** | every visual decision | what the content says |

**Word-for-word rule**: all texts on a page must come from the corresponding spec MD verbatim, in RU + EN + CN. Never paraphrase, never shorten, never invent.

---

## 3. The Etalon Law

`src/components/TabMain.tsx` is the etalon. Every other tab must be expressible using:
1. The same `motion`-wrapper shape (see §6).
2. The same section-flow rhythm (see §5).
3. The same set of utility classes from `src/index.css` (see §7–§9).
4. The same animation set (see §10).

**If a pattern from another tab is not in this list — it's a bug, not a feature.** Replace it. Do not document it. Do not preserve it.

If a genuinely new pattern is required, the protocol is: stop, propose it to the human, get explicit approval, add it to `src/index.css` AND to this file, then use it.

---

## 4. Design Tokens

All tokens live in `src/index.css` under `@theme`. Never hard-code colors, never invent shades.

### Colors
| Role | Hex | Tailwind | Usage |
|---|---|---|---|
| Primary | `#0F2A47` | `bg-primary`, `text-primary` | midnight navy — main brand color |
| Secondary | `#06111E` | `bg-secondary`, `text-secondary` | almost-black — hero, dark sections |
| Accent | `#D0B18A` | `bg-accent`, `text-accent` | matte gold — eyebrows, gold pills, links/hover |
| BG Light | `#F2EEE6` | `bg-bg-light`, `text-text-light` | main body background, light text on dark |
| BG Card | `#FFFFFF` | `bg-bg-card` | same as bg-light — cards & widget containers differentiate via shadow, not bg-color |
| Text Dark | `#1A2333` | `text-text-dark` | body text on light bg |
| Border Light | `#DEDBD3` | `border-border-light` | dividers on light bg |
| Border Dark | `#1E3F5E` | `border-border-dark` | dividers on dark bg |

### Brand palette: 3 main + 1 accent

The brand has **exactly four** colors. Everything else (text-text-light, border-X, bg-card) is the same color as one of the four, just used in a different context.

| # | Role | Hex | Token | Used for |
|---|---|---|---|---|
| 1 | **WHITE** | `#FFFFFF` | `bg-bg-light`, `bg-bg-card`, `text-text-light` | every light surface — sections, cards, widgets, text on dark bg |
| 2 | **NAVY** | `#0F2A47` | `bg-primary`, `text-primary` | brand — accent sections, primary buttons, active states, hover targets |
| 3 | **DARK** | `#06111E` | `bg-secondary`, `text-secondary`, ≈`text-text-dark` (#1A2333, navy-graphite) | body text, cinematic sections, anchor tile bg on dark sections |
| 4 | **GOLD** | `#D0B18A` | `bg-accent`, `text-accent` | accent ONLY — eyebrows, gold pills, hover hint, stat values. **Never inside a heading.** |

Border tokens (`border-border-light` #DEDBD3, `border-border-dark` #1E3F5E) are utility shades for **dividers between siblings** — they're not part of the brand palette. They never wrap a surface.

### Color combinations cheat sheet

On **WHITE surface** (most inner content):
- Body text & headings: solid DARK (`text-text-dark`) — whole heading one color, no gold word
- Primary button: NAVY fill, WHITE text → on hover: GOLD fill, DARK text
- Card eyebrow: GOLD (`card-feature__eyebrow`)
- Pills (pedigree/stat): full **GOLD fill** + DARK text — `bg-accent text-secondary px-3 py-1.5 rounded-[6px]`
- Card surface: same WHITE as section — differentiated by `.shadow-soft` only

On **NAVY surface** (`.section-accent`):
- Body text & headings: solid WHITE (`text-text-light`) — whole heading one color, no gold word
- Inline tile bg (for info plates like "Ветеринарный контроль"): `bg-secondary/40` (no border)
- Buttons: outline-light (white outline)

On **DARK surface** (`.section-cinematic`, rare):
- Body text & headings: WHITE — whole heading one color, no gold word
- Buttons: outline-light

What is **NOT** allowed:
- A fifth brand color (cream, beige, gray)
- Two light tones (white + cream) — collapsed to one white
- GOLD as a large surface (`bg-accent` on a whole card/section) — gold is for **small accents only**
- DARK text with opacity `/85`, `/70`, etc. on light bg — always solid

### Color dominance rule (page-level)

The palette has three colors. They divide responsibility between home and inner pages:

| Page | Dominant | Secondary | Accent (rare) |
|---|---|---|---|
| `TabMain` (Главная) | **Gold** (`accent` #D0B18A) + dark (`secondary` #06111E) — cinematic, brand-led | navy (`primary`) | light bg |
| All inner tabs | **Light bg** (`bg-light` #F2EEE6) + **navy** (`primary` #0F2A47) | dark (`secondary`) for heroes | **gold (`accent`) — small only**: eyebrows, stat pills, link hover (never inside a heading) |

**Why this split**: the home page is the brand statement — gold is the signature and is allowed to dominate. Inner pages are content surfaces — they breathe with white and navy, and gold appears as a small accent that catches the eye, never as a block color.

**How to apply**:
- On inner pages, never use `bg-accent` (gold fill) on large surfaces (sections, full cards, big tags). Reserve gold for: `.card-feature__eyebrow`, small stat pills, link hover states. **Never inside a heading** — headings are one solid color.
- The predominant section background on inner pages is `.section-calm` (white), which provides elegant, spacious breathing room. Do **not** alternate backgrounds mechanically (white, navy, white, navy). Instead, color sections based on their **semantic meaning**—navy (`.section-accent`) is reserved **rarely** and **strategically** for high-impact accents (like key summaries or final CTAs). White (`.section-calm`) sections are fully allowed to be consecutive. `.section-cinematic` (almost-black) is reserved for rare full-bleed dramatic statements.

### Typography — the locked scale

> Visual reference: `docs/typography.html`. Open it in a browser — that document is the single source of truth for every text element on the site.

**Every text element belongs to one of these utilities. Inline ad-hoc combinations (`font-serif text-Xxl font-bold text-X`) are forbidden.**

#### Headings — 5 utilities

| Class | Spec | Where |
|---|---|---|
| `.hero-title` / `.hero-title-light` | serif, 40 → 80 px, medium (500), `tracking-tight`, `leading-[0.9]` | H1 in `.hero-side-image`. |
| `.h-section` / `.h-section-light` | serif, 30 → 46 px, medium (500), `tracking-tight`, `leading-[0.9]` | H2 — section opener on **inner pages**. One solid color, one font — no gold word, no italic. |
| `.h-section-xl` / `.h-section-xl-light` | serif, 30 → 64 px, medium (500), `tracking-tight`, `leading-[0.9]` | H2 — section opener on **TabMain (etalon) only**. Larger display variant for the home brand statement. |
| `.h-block` / `.h-block-light` | serif, 20 → 24 px, bold (700), leading tight, `text-text-dark` | H3 — subsection title (e.g. "Где применяется", "Что изучается"). **Always serif, always dark.** Never gold, never navy, never sans-serif. |
| `.card-feature__title` | serif, 20 → 24 px, bold (700), `text-text-dark` | Card title inside `.card-feature`. Same visual weight as `.h-block`. |
| `.card-stat__value` | serif, 30 → 48 px, semibold (600), leading-none, `text-accent` | Big number. Use also for **naked-number stacks**. |

#### Body — exactly 2 sizes

| Class | Spec | Where |
|---|---|---|
| `.body-lead` | 16 → 18 px, medium (500), leading-relaxed (1.6), `text-text-dark` | Lead paragraph under hero / section opener. |
| `.body-sm` | 16 px, medium (500), leading-snug (~1.3), `text-text-dark` | Compact descriptions, card descs, list items, captions. |
| default `<p>` | 16 px, medium (500) — inherits from `<body>` | Regular paragraph. |

**14 px and below as a body level — does not exist.** No `.body-xs`. No `text-sm` paragraphs.

#### Small labels — exactly 2

| Class | Spec | Where |
|---|---|---|
| `.label-eyebrow` (canonical) — aliases: `.hero-eyebrow`, `.card-feature__eyebrow` | 14 px, bold (700), **no tracking**, `text-accent` (gold) | Gold label above any heading. The only 14 px label colored gold. |
| `.label-meta` (canonical) — alias: `.card-stat__label` | 14 px, bold (700), **no tracking**, `text-text-dark` | Dark caption under `.card-stat__value`. |

#### Inline accents — only 1 form

The two-tone heading (light text + one gold italic word) is **retired**. Every heading is one solid color and one font — no gold word, no italic. The `.h-section__accent` utility still exists but is now a **no-op** (it inherits the heading's own color and normal style), so legacy `<span className="h-section__accent">…</span>` markup renders uniform; new markup needs no span at all.

| What | How |
|---|---|
| Bold lead-in inside a list/paragraph ("Спорт и высокие нагрузки:") | `<strong>` or `font-bold` — same size and color as wrapping text. |

#### Locked typographic bans

1. **Italic anywhere** — forbidden. Headings, quotes, disclaimers, captions, footnotes → plain upright utility. (The old gold italic accent word in headings is retired.)
2. **`text-accent` (gold) anywhere inside a heading** — forbidden, whether the whole heading or a single word. Gold = eyebrow, stat value, links/CTAs only. Headings are one solid color: `text-text-dark` on light bg, `text-text-light` on dark bg.
3. **`text-primary` as heading color** on white background — forbidden. Headings on light bg are always `text-text-dark`; on dark bg `text-text-light`.
4. **`font-sans` on any heading** — forbidden. Every heading is `font-serif`.
5. **Any `text-[Npx]` below 14 px** — forbidden (`text-[10px]`, `text-[11px]`, `text-[13px]`).
6. **`text-xs` (12 px) anywhere** — forbidden. No exception for eyebrows: eyebrows are 14 px (`.label-eyebrow`).
7. **Positive letter-spacing** (`tracking-wide`, `tracking-wider`, `tracking-widest`) — forbidden everywhere. Eyebrows, meta-labels, badges, footer column titles — no разрядка. Allowed only: negative `tracking-tight` on big serif headlines (`.hero-title`, `.h-section`).
8. **Arbitrary hero sizes** (`lg:text-7xl`, `lg:text-[5.5rem]`) — forbidden. Hero is exactly `.hero-title`.
9. **Opacity on `text-text-dark` over light bg** (`/85`, `/70`, etc.) — forbidden. Solid color always. Opacity allowed only on light text over dark bg.
10. **`uppercase` on headings, buttons, eyebrows, footer column titles** — forbidden. Natural case everywhere.
11. **Raw `text-gray-*`** — forbidden anywhere.

#### Workflow

When writing or refactoring text in a `.tsx` file, the only correct markup is one of the utilities above. If you reach for `font-serif text-Xxl font-bold text-X` inline — you're making a mistake. Pick the right utility. If nothing fits, stop and ask before inventing.

### Section header block — locked vertical rhythm

Every (eyebrow + H2 + lead paragraph[s]) group MUST be wrapped in `.section-header`. The class is defined in `src/index.css` as `flex flex-col gap-6` — that is the **only** legal vertical rhythm between an eyebrow, an H2, and the lead paragraph(s) below it.

```tsx
<div className="max-w-3xl section-header">
  <span className="card-feature__eyebrow">Eyebrow</span>
  <h2 className="h-section">
    Title in one solid color, one font
  </h2>
  <p className="body-lead">First lead paragraph.</p>
  <p className="body-lead">Second lead paragraph.</p>
</div>
```

Locked bans:
- **No `mt-*` / `mb-*` on any child** inside `.section-header` (`h2 mt-4 mb-6`, `p mt-4`, `p mt-2` — all forbidden). The `gap-6` is the rhythm.
- **No alternative gap values** (`gap-2`, `gap-3`, `gap-4`, `gap-8`, `gap-10`) on this block. If `gap-6` feels wrong, the content is wrong — not the gap.
- **No splitting** an H2 and its lead paragraph into two sibling `<div>`s with `mb-10` between them. The H2 + lead belong to one block.
- The wrapper itself MAY take an outer margin (e.g. `mb-10`) when the next block is a grid of cards — the outer margin separates the header from the grid, not the H2 from its lead.

### Two-column blocks — text left, decoration right (universal split)

**The universal rule for every 2-column section on inner pages**: calm reading content (eyebrow + H2 + body paragraphs) lives in the **LEFT** column. Everything decorative or structural (bullets, numbered lists, stat callouts, gold accents, image, illustration tile) lives in the **RIGHT** column.

The split is locked at **`lg:grid-cols-12`** with **`lg:col-span-7`** (left, text) + **`lg:col-span-5`** (right, decoration). No other ratios are allowed (no 6/6, no 8/4, no 5/7 — column widths must be the same on every section so the page reads as one consistent grid, not a series of mismatched layouts).

```tsx
<section className="section-calm">
  <div className="section-inner">
    <div className="grid lg:grid-cols-12 gap-10 lg:gap-20 items-start">
      <div className="lg:col-span-7">
        <div className="section-header">
          <span className="label-eyebrow">…</span>
          <h2 className="h-section">…</h2>
          <p className="body-lead">…</p>
          <p className="body-lead">…</p>
        </div>
      </div>
      <div className="lg:col-span-5 lg:pt-14">
        {/* bullets, numbers, image, accents — whatever the section needs */}
      </div>
    </div>
  </div>
</section>
```

Variants:
- **Only prose, no decoration** → use the same 7/5 grid with the right column empty. Right-side air is intentional — do **not** stretch text to full width and do **not** fill the right column with a decorative plate "to balance".
- **Only decoration, no prose body** → still keep the eyebrow + H2 in the left column (col-7), put the visual stack in the right column (col-5).

Locked bans:
- **Text on the right, decoration on the left** — flipped variant is forbidden, even for "rhythm". The split is one-way: text LEFT, decoration RIGHT, on every section, on every inner tab.
- **Other column ratios** (`lg:col-span-6 lg:col-span-6`, `lg:col-span-8 lg:col-span-4`, etc.) — forbidden. 7/5 is the only legal split.
- **Full-width body text** (single column spanning all 12 cols) for a section with H2 + body — forbidden. Even a "text only" section uses the 7/5 grid; the right 5 cols are air.
- **Decoration stuffed into the left column alongside the text** (bullets right under the body paragraphs) — forbidden. Decoration moves to the right column.

Exceptions (sections where this rule does NOT apply):
- `.hero-side-image` — already locked to its own grid (col-7 text + col-5 photo).
- CTA sections — text + buttons stack vertically per the "CTA below text" rule (§5).
- Card grids (3-col or 4-col rows of `.card-feature` / `.card-flat`) — independent grid pattern, not the text/decoration split.

### Two-column blocks — x-height alignment

**The universal rule**: whenever a 2-column grid (`lg:grid-cols-12` with `items-start`) puts a big `.h-section` / `.hero-title` on the **left** and any content on the **right**, the right column's first line must sit on the **x-height** of the left H2 (top of its lowercase letters), not at the cap-top and not at the grid-cell top. Cap-top / cell-top alignment looks broken — the big serif H2 is much taller than the right content and the right text reads as floating above the heading.

**The offset depends on the LEFT column's structure, not the right one.** This is the critical insight: the eyebrow above the H2 pushes the H2 down by ~45 px (eyebrow line ~17 px + `section-header` `gap-6` 24 px). The right column must travel that same distance plus a small fine-tune to land on the H2's x-height.

| Left column leads with… | Right column gets… |
|---|---|
| Bare `.h-section` directly at cell-top (no eyebrow above it) | `lg:pt-3` (12 px) — only fine-tune needed; the right content is naturally close to the H2 |
| `.section-header` (eyebrow + H2, with or without lead/body below) | `lg:pt-14` (56 px) — must clear the eyebrow + gap-6 + reach down to the H2's x-height |

**This applies regardless of what's on the right** — `.h-block` heading, `body-lead` paragraph, `<ul>` body list, buttons, image. As soon as the left has an eyebrow, the right needs the big push.

The only exception is when the right column's content type makes alignment irrelevant or undesirable:

| Right column content | When to skip `lg:pt-*` |
|---|---|
| Image / card / icon-tile grid | When the visual block reads better against cell-top (visual decision per case) |

**Heuristic to apply blindly**: open the left column. If you see `<span className="label-eyebrow">` / `<span className="hero-eyebrow">` above the H2 — the right gets `lg:pt-14`. If you see `<h2>` directly as the first child — the right gets `lg:pt-3`. Don't think about what's on the right; the left tells you.

Also applies on tile lists (Check + label) — checkmarks adopt `text-text-dark`, not `text-primary` (the navy is reserved for emphasis surfaces, not for tick icons next to body text). On dark sections the tick uses `text-accent`.

### Check-mark text lists — locked anatomy

A **check-mark text list** is a vertical list where each row is a `<Check>` (or similar tick) followed by a short `body-sm` label (e.g. "Что изучается", "Наши принципы", the home "О хозяйстве" items). It has **one** locked shape across the whole site — home and inner pages alike:

```tsx
<ul className="flex flex-col gap-2.5">           {/* rows pressed tight: gap-2.5 (10px) */}
  {items.map((item) => (
    <li key={item} className="flex items-center gap-2.5">   {/* items-center, gap-2.5 */}
      <Check className="w-4 h-4 text-text-dark shrink-0" strokeWidth={2.5} />  {/* 16px, vrovne with text */}
      <span className="body-sm">{item}</span>
    </li>
  ))}
</ul>
```

Locked rules:
- **Icon size `w-4 h-4` (16 px)** — the tick sits *vrovne* (level) with the `body-sm` (16 px) text, not towering over it. `w-5 h-5` / `w-6 h-6` are **forbidden for ticks in text lists** (they belong to standalone/decorative icons only).
- **`items-center`** — vertical-center the tick against the text line. No `items-start`, no `mt-0.5` nudge.
- **Row spacing `gap-2.5`** on the `<ul>` and **`gap-2.5`** between tick and label. Rows read as one tight group, not as scattered cards. No `gap-4` / `gap-6`.
- **Tick color**: `text-text-dark` on light sections, `text-accent` on dark sections (`.section-accent` / `.section-cinematic`).
- **Label**: `.body-sm` (16 px). Don't hand-roll `text-base font-semibold leading-snug` — use the utility.

> This supersedes the old "icons in lists are always `w-6 h-6`" rule **for check-mark text lists**. The `w-6 h-6` size still applies to icon rows that pair an icon with a *heading-weight* label or a multi-line block (feature tiles), not to a tick + one-line `body-sm` label.

### Spacing rhythm
- Section vertical: `py-8 md:py-12` (built into `.section-*` classes) — 32 px mobile, 48 px desktop. Two adjacent sections separate by 64 / 96 px total. **Не использовать `py-12` / `py-16` / `py-24`** на секциях — это раздувает вертикальный ритм и страница «расползается».
- Container: `max-w-[1400px] mx-auto px-6` (built into `.section-inner`).
- Gap between elements inside a block: `gap-3` (tight), `gap-6` (default), `gap-10 lg:gap-20` (between grid columns).
- Card padding: `p-7 md:p-8` (built into card classes).

### Radii
- **Default**: `rounded-none` (square, strict). All cards, plates, sections, images.
- **Buttons / inputs / tags**: `rounded-[6px]` (built into `.btn-*`).
- **Rare accent**: `rounded-[24px]` — ONLY for home-page Directions cards via `.card-accent`. Never used on inner pages.

### Shadows — one shadow only
- **One shadow on the whole site**: `.shadow-soft`. At rest and on hover — the same.
- Hover-feedback is delivered through **motion** (`-translate-y-1`), never through shadow intensification.
- `.shadow-soft-lg` is now an alias of `.shadow-soft` (same definition) — kept for migration safety only. New code uses `.shadow-soft`.
- **NEVER** use `shadow-xs`, `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-2xl`, `shadow-xl`, `shadow-none`.

### Borders and divider lines — none. Period.
- **No borders on any surface element** — cards, plates, photo frames, info tiles.
  - On **light surfaces** (white section, milky containers) — definition via `.shadow-soft` only.
  - On **dark surfaces** (`.section-accent` navy, `.section-cinematic` near-black) — definition via a slightly darker bg-fill (e.g. `bg-secondary/40` on a navy section). Shadows don't read on dark; bg-contrast does.
- **No divider lines anywhere** — not between list items, not between sections, not under headings, not in footers, not in nav menus. The brand does not use lines as separators. Rhythm comes from **whitespace** (`gap-8`, `gap-10`, `gap-12`, `py-16`, `mt-8`, etc.) and from background-contrast between sections.
- `border-b border-border-light` between sibling list items is **forbidden**. Use `flex flex-col gap-10` (or `gap-12`) instead.
- `border-t border-border-dark` between sections is **forbidden**. Sections separate themselves by `py-*` rhythm and (when needed) a background-color change.
- Adding `border border-border-X` to a card/plate/tile is an anti-pattern — it reintroduces the "calculator/admin panel" feel. So is adding a thin line to "tidy" a list.
- The `border-border-light` / `border-border-dark` tokens still exist in CSS, but they have no current legitimate use. If you reach for them, you are almost certainly making a mistake.

### Interactive widget containers (menus, selectors)
When you have a *container that groups interactive controls* (sticky sub-tab menu, criteria selector, filter bar) and it lives on a `.section-calm` (white) background, that container must be distinguished without a border. Use **milky cream-white** for the surface, anchored by `.shadow-soft`:

```tsx
<div className="bg-bg-card shadow-soft rounded-[6px] p-2">…interactive buttons…</div>
```

Surface hierarchy inside such a container:
- **outer container surface**: `bg-bg-card` (#FAFAF8 milky cream) + `shadow-soft` — distinguished from the white section by warmth + drop shadow
- **inactive buttons inside**: `bg-transparent` — let the cream show through
- **active button**: `bg-primary` (100% navy) + `text-text-light` — strong contrast against milky
- **content-display panel inside** (e.g. selector preview): `bg-bg-light` (pure white) — pops as a "fresh page" surface against the milky outer

Why no navy tint here: navy is reserved for **emphasis** (active button, accent sections), not for ambient surface tinting. Container surfaces stay neutral (cream); brand color is earned by interactive state.

---

## 5. Page Skeleton (mandatory)

Every tab component must look like this:

```tsx
export default function TabX({ lang, onSwitchTab }: TabXProps) {
  const t = TRANSLATIONS[lang];
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Hero — inner pages use .hero-side-image (text left, photo right).
          See §8. Self-contained: own bg + nav clearance. */}
      <section className="hero-side-image">
        <div className="hero-side-image__grid">…</div>
      </section>

      {/* Content sections — predominantly white (.section-calm) to maintain elegant breathing room.
          Accent sections (.section-accent) are used rarely and strategically to color blocks by semantic meaning. */}
      <section className="section-calm">
        <div className="section-inner">…</div>
      </section>

      <section className="section-calm">
        <div className="section-inner">…</div>
      </section>

      <section className="section-accent">
        <div className="section-inner">…</div>
      </section>
    </motion.div>
  );
}
```

### Why this and not the current pattern

Current (broken) pattern in `TabGenetics/Antlers/Industry/Contacts`:
```tsx
<motion.div className="bg-bg-light pt-24 pb-20">
  <div className="max-w-[1400px] mx-auto px-6">
    <div className="mb-16">…</div>
    <div className="mb-16">…</div>
    <div className="mb-16">…</div>
```
This is **the "calculator" feel**: one flat background, blocks stacked with margins, no visual rhythm. Forbidden.

### Section background rotation rules

There are only **three** section backgrounds — named by mood, not by color:

| Class | Mood | Color | Use |
|---|---|---|---|
| `.section-calm` | spacious, readable | white (`bg-light`) | default for most content |
| `.section-accent` | expressive, brand-led | navy (`primary`) | emphasis, breaks the rhythm |
| `.section-cinematic` | dramatic, deep | almost-black (`secondary`) | rare, dramatic blocks |

Rules:
- White backgrounds (`.section-calm`) must dominate the page to provide clean, premium space. Consecutive calm sections are fully allowed.
- Green backgrounds (`.section-accent`) must be used **sparingly and strategically** based on the semantic weight of the block (e.g., highlights, conclusions, final call-to-actions), never as a forced mechanical alternation.
- `.section-cinematic` is rare — only for true full-bleed dramatic blocks.
- The inner-page hero is `.hero-side-image` (self-contained, white bg) — it doesn't need a `.section-*` wrapper.

### Footer adjacency rule — no "flag" stripes

The site footer is dark (almost-black, `bg-secondary`). The last section on every page must transition into the footer **without producing a three-band "flag" effect** (e.g. navy section → white band → dark footer reads as a tricolor stripe and is forbidden).

Concretely, the last section before the footer may be EITHER:
- **`.section-calm` (white)** — clean, intentional white-to-dark contrast. Use when the page exhales into the footer (quiet contact row, quote, wrap-up paragraph).
- **`.section-accent` (navy)** flush against the footer — smooth navy → dark gradient with no light gap between. Use when the page closes on a brand-led CTA / final emphasis (e.g. "Открытое хозяйство" with CTA buttons under the heading). This is the preferred pattern when the closing block is a true semantic CTA.

What is forbidden:
- Do **not** sandwich a `.section-calm` (white) between a `.section-accent` (navy) and the footer — that produces the navy → light sliver → dark tricolor "flag". If you want a navy close, the navy must be the LAST section, flush against the footer.
- Do **not** add `mt-*` / `mb-*` on the `<footer>` or on its preceding section. Any margin exposes the body background as a light strip — recreating the flag.
- `.section-cinematic` (almost-black) directly before the dark footer reads as one continuous dark mass — avoid unless the design genuinely calls for a long dark close.
- Sections own their own `py-8 md:py-12` rhythm — never patch the gap by adding margins or empty divs. Fix it at the section level by choosing the correct closing background.
- The `<footer>` itself must sit **flush** against the preceding section. No `mt-*` / `mb-*` on the `<footer>` element, no trailing margin on the last section. Any vertical margin on the footer (or its previous sibling) exposes the body / `<main>` background as a light stripe between the section and the footer — the exact "flag" effect this rule exists to prevent. Inner footer breathing room comes from its own `pt-*` (e.g. `pt-14 pb-10`), never from outer margins.

### CTA layout — buttons always under the text

In any section whose primary purpose is "text + call-to-action" (closing CTA, sign-up block, social subscription, in-flow handoff between tabs), the CTA buttons MUST live in a **single column below the heading + body**, not in a 2-col grid with the text on the left and buttons on the right.

The canonical CTA structure:

```tsx
<section className="section-accent">  {/* or .section-calm for non-closing CTAs */}
  <div className="section-inner flex flex-col gap-10">
    <div className="max-w-3xl section-header">
      <span className="label-eyebrow">…</span>
      <h2 className="h-section-light">…</h2>
      <p className="body-lead-light">…</p>
    </div>
    <div className="flex flex-col sm:flex-row flex-wrap gap-4">
      <button className="btn-primary">…</button>
      <button className="btn-outline-light">…</button>  {/* or btn-outline-dark on calm bg */}
    </div>
  </div>
</section>
```

Why: side-by-side `lg:col-span-X` placement makes buttons float at H2-level on desktop while body text takes the full width — they read as detached and arbitrary, and they collapse weirdly on mobile. A single-column flow (heading → body → CTA row) reads as a focused, intentional ask. The `gap-10` (40 px) between the section-header and the button row keeps the visual rhythm consistent with `.section-header`'s own `gap-6`.

Locked bans:
- **No `<div className="lg:col-span-5">` / `lg:col-span-4` wrapping CTA buttons** alongside a sibling text column. CTAs are not "right-rail content"; they are the section's conclusion.
- **No `lg:pt-14` / `lg:pt-3` on CTA columns** — CTAs don't participate in the x-height alignment rule because they don't sit beside the H2; they sit below it.
- The button row itself stacks `flex-col` on mobile and `sm:flex-row` on desktop — never put each button in its own row at sm+ (looks like a list, not a CTA).

---

## 6. Motion

**Three animations, total. Period.**

| Use | Spec | Where |
|---|---|---|
| Page enter | `opacity 0→1, y:15→0, duration 0.5s, easeOut` | `motion.div` wrapping the whole tab |
| Hover lift | `-translate-y-1, duration 300ms` | built into `.card-feature` |
| Sub-tab fade | `opacity 0→1, duration 0.15s` | only for in-page tab switches |

### Forbidden
- `layoutId` morphing between elements.
- Spring animations (`type: 'spring'`).
- Custom `@keyframes` for scroll-triggered reveals.
- Parallax.
- `whileInView` stagger sequences (use page-enter only).
- Any `transition: { duration: X }` where X isn't `0.15`, `0.3`, or `0.5`.

The marquee animation in `index.css` is exempt — it's a single decorative element.

---

## 7. Component Library

### Buttons (defined in `src/index.css`)
| Class | Use |
|---|---|
| `.btn-primary` | primary CTA, fills with primary, hovers to accent |
| `.btn-primary-sm` | smaller variant |
| `.btn-outline-light` | secondary CTA on dark sections |
| `.btn-outline-dark` | secondary CTA on light sections |
| `.btn-link` | inline gold hyperlink with arrow |

Never invent a new button class. Never style a button inline with `bg-X` / `text-X`.

**Buttons never carry icons or arrows.** `.btn-primary`, `.btn-primary-sm`, `.btn-outline-light`, `.btn-outline-dark` contain text only — no `<ArrowRight />`, no `<Send />`, no leading or trailing lucide icon, no chevron. The text is the affordance. Arrows belong **only** to link patterns: `.btn-link`, `.card-feature__cta`, and the small contact-tile "Open Map / Call Now" links — all of which are gold (`text-accent`) inline links, not buttons. If you're tempted to put an icon in a button to "make it clearer", the label is wrong — fix the label, not the button.

### Hyperlinks (universal rule)

**Every hyperlink is GOLD (`text-accent`) by default — on every background.** It is the signature brand link color.

- **No color change on hover.** Gold stays gold. Hover feedback comes from motion (`gap-2.5` arrow slide) or underline (`hover:underline` for plain inline links).
- Do **not** use `hover:text-primary` on links. Going gold→navy on hover was the legacy pattern — forbidden now.
- Two link patterns:
  - **CTA-style with arrow** — use `.card-feature__cta` (for cards) or `.btn-link` (standalone). Both gold, arrow slides on hover.
  - **Plain inline link** — `text-accent hover:underline font-semibold`. Used for footer links, social handles, in-text references.

### Cards
| Class | Use | Default radius |
|---|---|---|
| `.card-feature` | content card with image-on-top + title/desc/CTA. **The canonical card.** | `rounded-none` |
| `.card-flat` | small content card, no image. Media grids, news previews. | `rounded-none` |
| `.card-stat` | number-led stat block (use `.card-stat__value` + `.card-stat__label`) — **use sparingly, see below** | `rounded-none` |
| `.card-accent` | premium asymmetric, hero-promo cards | `rounded-[24px]` — **home page only** |

### Fewer plashki — naked numbers rule

A "plashka" is any card/tile wrapper that boxes content with background + shadow (`.card-flat`, `.card-stat`, custom `bg-bg-card shadow-soft`). **Plashki are not free decoration.** Each one adds visual weight; over-plating turns a page into a dashboard.

**A stat block (big number + small caption) does NOT get a plashka.** Numbers are typographic content — they earn the eye through size, gold color, and white space, not through a box.

Pattern — vertical stack of stats on a `.section-calm`:

```tsx
<div className="flex flex-col gap-6">
  {stats.map((s, i) => (
    <div key={i} className="flex flex-col gap-2">
      <span className="card-stat__value">{s.value}</span>
      <span className="label-meta">{s.label}</span>
    </div>
  ))}
</div>
```

Rhythm comes from **whitespace only** — outer `gap-6` (24 px) between stat groups, inner `gap-2` (8 px) between value and label. **Не использовать `gap-10` / `gap-12` между голыми числами** — это разрывает связь «число + подпись» с следующей группой, информация читается как набор разрозненных карточек. Группы должны прижиматься плотно: число → подпись → следующее число. Без divider-линий — см. §4 "Borders and divider lines — none."

**When a plashka IS justified** — `.card-feature` (full content card with image), interactive contact tiles (mailto/tel — the box is the hit-target), `.card-flat` for grouped flat content with no image and multiple text lines. **When it is NOT** — a single number + caption, a single icon + label, a one-line quote.

Anti-pattern (forbidden):
```tsx
<div className="card-flat flex flex-col gap-2 p-6">
  <span className="font-serif text-4xl text-accent">100%</span>
  <span className="text-xs">регенерация</span>
</div>
```

Card anatomy for `.card-feature` (use these BEM-style helpers).
Notes:
- Add `group` alongside `card-feature` so child hover effects work.
- Aspect ratio is per-instance — set it on the `__media` element (e.g. `aspect-[4/3]`, `aspect-[16/10]`).

```tsx
<div className="card-feature group">
  <div className="card-feature__media aspect-[4/3]">
    <img src="…" alt="…" />
  </div>
  <div className="card-feature__body">
    <span className="card-feature__eyebrow">Племенные линии</span>
    <h3 className="card-feature__title">Заголовок карточки</h3>
    <p className="card-feature__desc">Подзаголовок описание</p>
    <a className="card-feature__cta">Подробнее <ArrowRight className="w-4 h-4" /></a>
  </div>
</div>
```

### Image placeholders
| Class | Use |
|---|---|
| `.img-placeholder-dark` | dark hero placeholder |
| `.img-placeholder-light` | light section placeholder |

---

## 8. Hero Patterns (exactly two)

### A. Full-bleed (home only)
Used only in `TabMain`. 90vh, full background image on the right side, gradient feathering to dark via `.hero-gradient-overlay`. Do not replicate on inner pages.

### B. Side-image (every inner page)
The mandatory pattern for inner tabs. Defined as `.hero-side-image` — self-contained section (owns its background and the top padding that clears the fixed navbar). Layout: text on the **left** (col-span-7), photo on the **right** (col-span-5, aspect 4:3).

```tsx
<section className="hero-side-image">
  <div className="hero-side-image__grid">
    <div className="hero-side-image__text">
      <span className="hero-eyebrow">Племенные линии</span>
      <h1 className="hero-title">
        Генетика и племенная работа
      </h1>
      <p className="hero-desc">Подзаголовок из ТЗ слово в слово.</p>
      <div className="flex gap-4 flex-wrap mt-2">
        <a className="btn-primary">CTA</a>
        <a className="btn-outline-dark">Secondary</a>
      </div>
    </div>
    <div className="hero-side-image__media">
      <img src="/about-2.webp" alt="…" />
    </div>
  </div>
</section>
```

### Forbidden hero patterns (currently in code, must be removed during katok)
- Full-card hero with `rounded-br-[80px]` and background-image inside (TabGenetics) — **remove**.
- Text-only hero with no image (TabIndustry) — **add a side image**.
- Custom 12-col grid with `aspect-[4/3]` thumb (TabAntlers, TabContacts) — **replace with `.hero-side-image`**.

---

## 8.5. Pedigree tree (approved pattern — Genetics tab)

A **pedigree tree** is the one place on the site where **connector lines are allowed**. The lines here are not dividers "to tidy a list" — they are a **semantic diagram element** that encodes lineage between ancestors; without them the genealogy is unreadable. This is the single sanctioned exception to §4 "Borders and divider lines — none." Approved 2026-06-09.

Rules:
- **Vertical, nested layout only** (file-tree style — subject on top, each generation indented below). Never the horizontal left-to-right chart from the source scan: 8 great-grandparents in one row is unreadable on mobile. Vertical nesting collapses cleanly to a phone width.
- Connectors are **1px `border-light` (#DEDBD3)** lines only — the neutral divider shade, never gold, never navy, never thicker. They live on `.section-calm` (white).
- Each ancestor is a **`.pedigree-card`** — a horizontal mini-card (photo thumbnail + role eyebrow + serif name + meta lines), defined by `.shadow-soft` (no border on the card itself). The subject uses `.pedigree-card--root` (larger photo + name).
- Typography inside follows the law: role = `.pedigree-card__role` (gold 14px eyebrow), name = serif bold, meta = 14px. No 12px, no italic, no gold in the name.
- Markup is a recursive `<PedigreeBranch>` over a `PedigreeNode` tree. Utilities (`.pedigree`, `.pedigree-branch`, `.pedigree-children`, `.pedigree-card*`) live in `index.css`. Data model lives in the tab component.

### Horizontal "bracket" variant (`.pedigree-h-*`)

A second, dramatic presentation of the same pedigree: the classic Western left-to-right ancestor chart (subject box LEFT, generations fanning RIGHT, joined by bracket connectors), shown over a dark cinematic scene. It is the **transpose** of the vertical tree — same `PedigreeNode` model, same recursion, same pseudo-element connector technique. Approved 2026-06-10.

- **Lives ONLY on `.section-cinematic`** (almost-black). The chart renders horizontally at every width; on narrow screens it is **horizontally scrollable** (`overflow-x-auto`) with an **edge-fade scroll hint** — a gradient that fades to the section bg appears on whichever side still has hidden content (driven by a small scroll/ResizeObserver in `PedigreeChart.tsx`). Component: `src/components/PedigreeChart.tsx` (`variant="horizontal" tone="dark"`). The vertical nested tree (`variant="vertical"`) still exists for light sections and is unchanged.
- **Connectors are 1px accent gold** (`var(--color-accent)`) on dark — `border-light` is invisible on near-black and is reserved for the light vertical variant only. The dark vertical variant (`tone="dark"`) recolors its connectors to gold via `.pedigree--dark`.
- **Boxes** are `bg-secondary/40` fills (no border, no shadow) with light text — the standard dark-surface tile treatment (§4). Subject box larger (`--root`).
- Data lives in `src/data/pedigrees.ts` (one `PedigreeNode` export per chart). A new pedigree = a new data object + `<PedigreeChart data={…} />`. Utilities `.pedigree-h*` live in `index.css`.
- It may close the page directly above the footer: the footer is the same near-black (`bg-secondary`), so cinematic → footer reads as one continuous dark mass, not a flag (a flag needs a light sliver between two darks — that is what's forbidden). Never sandwich a `.section-calm` between this cinematic section and the footer.

Do **not** generalize this into "lines are OK now" or "gold lines everywhere." Lines remain forbidden everywhere except an actual lineage/relationship diagram. If you want a line for any other reason, the answer is still no — use whitespace.

---

## 9. Anti-patterns (do not write these — if you see them, remove)

| Anti-pattern | Why bad | Fix |
|---|---|---|
| `<motion.div className="bg-bg-light pt-24 pb-20"><div className="max-w-[1400px]...">` wrapping the whole tab | The "calculator" — single bg, no rhythm | Replace with `motion.div` (skeleton) + alternating `<section>`s |
| `mb-16` / `mb-20` between sibling blocks inside one bg | Visual separator without rhythm change | Make each block its own `<section className="section-*">` |
| `rounded-none rounded-br-[80px]` on inner-page elements | Decorative motif reserved for home Directions | `rounded-none`, full stop |
| Any shadow other than `.shadow-soft` — including `.shadow-soft-lg`, `shadow-xs`, `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-2xl`, `shadow-xl`, `shadow-none` | One shadow only. Hover-feedback comes from motion (`-translate-y-1`), not from shadow intensification | `.shadow-soft` (only). For existing `shadow-soft-lg` usages — collapse to `.shadow-soft`. |
| `initial={{ opacity: 0 }} animate={{ opacity: 1 }}` (no `y`) | Flat fade, doesn't match etalon | `initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}` |
| Custom hero — text + small thumb / text-only / asymmetric corner | Five different first impressions across pages | `.hero-side-image` |
| `text-text-dark/XX` (any opacity) for body copy on light bg | Reads washed-out on white, breaks the "weight as a heading" reading flow | Always solid `text-text-dark`. Opacity allowed only on light text over dark bg. |
| `border border-border-light` or `border border-border-dark` on cards / plates / tiles / photo frames | Adds the "calculator/admin panel" feel — surfaces should breathe via shadow (light bg) or bg-contrast (dark bg), not be boxed | Remove border entirely; rely on `.shadow-soft` (light bg) or a darker `bg-secondary/40` fill (dark bg) |
| `.card-flat` / `.card-stat` wrapping a single stat (big number + caption) | Plashka steals visual weight from the number — the number should be the figure, not the box | Naked number stack with `flex flex-col gap-10` whitespace rhythm — see §7 "Fewer plashki — naked numbers rule" |
| `border-b border-border-light` / `border-t border-border-X` as a divider between list items, sections, nav items, footer rows, or under headings | The brand does not use divider lines — they're the "form / dashboard" tell. Lines split content; the design separates by whitespace and background-contrast instead | Remove the border. Use `flex flex-col gap-10` (or `gap-12`) on the parent. For section-to-section separation, rely on `py-16 md:py-24` rhythm + (when needed) a background change. See §4 "Borders and divider lines — none." |
| Inline `text-gray-500` anywhere | Bypasses tokens, no contrast contract | Use brand tokens only |
| `<h2 className="h-section mt-4 mb-6">` + `<p mt-4>` between an eyebrow, H2, and lead paragraph(s) — or wrapping them in separate `<div>`s with `mb-10` between them, or any `flex flex-col gap-X` with X ≠ 6 | Every section ends up with a different vertical rhythm between heading and body — the page reads as six different layouts stitched together | Wrap the (eyebrow + H2 + lead) group in a single `.section-header` div (defined in `index.css` as `flex flex-col gap-6`). No `mt-*`/`mb-*` on children. See §4 "Section header block — locked vertical rhythm" |
| 2-col grid where the LEFT starts with `.section-header` (eyebrow + H2) and the RIGHT column uses `lg:pt-3` (or no pt at all) — the right content sits at cell-top, lined up with the LEFT'S EYEBROW, not with the H2's x-height. `lg:pt-3` is the value for the OTHER case (bare H2 on left, no eyebrow) and is too small once an eyebrow is present | The right column reads as one row higher than the heading — body / h-block / button all float at eyebrow-level instead of locking onto the H2's lowercase letters | Use `lg:pt-14` whenever the left has `.section-header` with an eyebrow above the H2, regardless of what the right contains (h-block, body, list, button — all get pt-14). Reserve `lg:pt-3` for the bare-H2-on-left case only. See §4 "Two-column blocks — x-height alignment" |
| CTA section laid out as 2-col `lg:grid-cols-12` with text on `lg:col-span-7` and the CTA button(s) on `lg:col-span-5` (or any side-by-side arrangement) — buttons float at H2 level on desktop while body text wraps around them, and the layout collapses awkwardly on mobile | Buttons read as detached right-rail content, not as the section's conclusion. CTAs are not a parallel piece of information; they are the closing ask | Stack vertically: `<section><div className="section-inner flex flex-col gap-10"><div className="max-w-3xl section-header">…</div><div className="flex flex-col sm:flex-row flex-wrap gap-4">…buttons…</div></div></section>`. See §5 "CTA layout — buttons always under the text" |
| `text-[10px]`, `text-[11px]`, `text-[13px]`, `text-xs` — anywhere | Below 14 px is forbidden everywhere, no exceptions (eyebrow is 14 px via `.label-eyebrow`) | `text-sm` (14 px) or one of `.body-lead` / `.body-sm` (16 px). Eyebrow → `.label-eyebrow` |
| Any positive letter-spacing: `tracking-wide`, `tracking-wider`, `tracking-widest` | No разрядка anywhere on the site. Eyebrows, meta-labels, footer columns, news meta — all without разрядка | Remove the class. Allowed only: `tracking-tight` (negative, sjatie) on `.hero-title` / `.h-section` |
| Tick (`<Check>`) in a check-mark text list sized `w-5 h-5` / `w-6 h-6`, or with `items-start` + `mt-0.5`, or row/gap spacing `gap-4`+ | Tick towers over the `body-sm` (16 px) label and the rows scatter — reads as cards, not one tight group | `w-4 h-4` (16 px), `items-center`, `gap-2.5` on both the `<ul>` and the row. See §4 "Check-mark text lists — locked anatomy" |
| Lucide icon paired with a heading-weight label or multi-line feature tile sized other than `w-6 h-6` (i.e. `w-5`, `w-7`, `w-8`) | Inconsistent icon stacks; only one icon size for non-tick list rows | `w-6 h-6` (24 px). Decorative single icons may be larger. Does NOT apply to check-mark text-list ticks — those are `w-4 h-4` (see row above) |
| Icon wrapped in a bordered/tinted plate (`<div className="w-9 h-9 bg-primary/5 border ...">`) | Two visual elements (icon + box) competing for attention | Use icon alone, `w-6 h-6`, `text-primary`, no wrapper |
| Pro/con cross icon in red (`text-red-*`, `#B43F3F`, any red) | Introduces a 5th color, breaks 4-color palette | Use `text-text-dark/50` (neutral muted dark) for the cross. Tick stays `text-primary` |
| Pill / chip variant other than `solid-gold` (`bg-accent text-secondary`) or `gold-tint` (`bg-accent/15 text-text-dark`) — e.g. `bg-accent/15 border`, `text-[10px] uppercase` mini-badges, `bg-bg-light` on white | Only two pill styles exist on light surfaces | `bg-accent text-secondary px-3 py-1.5 rounded-[6px]` (solid) OR `bg-accent/15 text-text-dark px-3 py-1.5 rounded-[6px]` (tint). On dark sections → inline tile `bg-secondary/40` |
| `uppercase` on buttons, section headings, eyebrows, footer column titles | Destroys elegance, doesn't match brand register | Natural case everywhere |
| Footer column titles styled `text-xs uppercase tracking-wider text-text-light/70` | Three violations in one (12 px, uppercase, tracking, opacity that reads as gray) | 14 px bold, natural case, no tracking, `text-text-light` (solid) |
| `<button className="btn-primary">…text… <ArrowRight /></button>` or any icon (`<Send />`, chevron, lucide glyph) inside a `.btn-*` class | Buttons are text-only affordances on this site. Arrows belong to link patterns (`.btn-link`, `.card-feature__cta`), not to filled or outlined buttons. The arrow on a button makes it read as a half-link / half-button hybrid | Remove the icon and the `flex items-center gap-2` wrapper class. Keep only the label. If the button needs more clarity, fix the **label**, not the chrome. See §7 "Buttons never carry icons or arrows" |
| Emojis as icons | Inconsistent with Lucide | Use `lucide-react` |
| New `@keyframes` for scroll reveal | Out of the motion budget | Page-enter only |
| Hard-coded color hex in JSX (`#0F2A47`, `#06111E`, `rgba(...)`) | Bypasses tokens | Use `bg-primary` / `text-secondary` / `text-text-dark` |
| Page ends on `.section-accent` (green) or `.section-cinematic` (dark) immediately before the dark footer, producing a green/light/dark "flag" stripe | Three-band tricolor at the bottom of the page reads as a flag — visually jarring, breaks the elegant exhale into the footer | Close every page with a `.section-calm` (white) section. If the content semantically wants to end on an accent, restructure: put the accent earlier and add a quiet white closing section (anchor row, quote, wrap-up). See §5 "Footer adjacency rule". |

---

## 10. Workflow — building or refactoring a page

When asked to build or fix a tab, follow this protocol:

1. **Read the spec**: open `docs/specs/Вкладка-N.md`. Internalize every heading, subheading, list, and client comment. This is the content brief, verbatim.
2. **Read the etalon**: open `src/components/TabMain.tsx`. Internalize the section flow, motion wrapper, typographic hierarchy.
3. **Plan the section flow**: write out the section order with chosen background classes. Confirm no two adjacent same-background sections.
4. **Map blocks → cards**: for each content block in the spec, pick the card class (`.card-feature` / `.card-flat` / `.card-stat`). If nothing fits, STOP and ask.
5. **Write the component**: starting from §5 skeleton, fill in sections one by one. Pull text from spec verbatim into `translations.ts`.
6. **Audit against §9**: scan for anti-patterns. If you find one, fix it before reporting done.
7. **Run `npm run build`** to verify no TS errors.
8. **Visual verification**: run `npm run dev`, walk through the page on desktop AND mobile widths in a browser. Tests don't catch visual drift.

### When katok-refactoring an existing tab

The same protocol, but step 5 becomes: keep the text content (RU/EN/CN strings), replace the wrapping markup with skeleton + section classes. Goal is the same final result, with no translation regressions.

---

## 11. Image Optimization

Any photo entering `public/` must be available as `.webp`. The optimizer:

```bash
npm run optimize-images           # scans public/, converts new .png/.jpg → .webp
npm run optimize-images -- --force  # re-convert even if .webp exists
npm run optimize-images public/path/to/specific.png  # specific file(s)
```

A Claude Code hook (see `.claude/settings.json`) runs this automatically when an image is written to `public/` via a tool call. If you copy an image into `public/` manually via Explorer / drag-drop, you must run `npm run optimize-images` yourself.

Source images (full-res originals, JPG/PNG) live in `assets-source/` and are not used by the build.

---

## 12. Skills

Project skills live in `.claude/skills/`:

| Skill | Triggers | Purpose |
|---|---|---|
| `verstka` | "свёрстай вкладку X", "сделай страницу", "приведи к эталону", "перенеси из ТЗ" | Build / katok-refactor a page following §10 |
| `design-audit` | "проверь вкладку X", "аудит дизайна", "сравни с эталоном" | Compare a tab against this file, list violations with file:line refs |

---

## 13. Folder layout

```
oooo_template/
├── CLAUDE.md                       ← THIS FILE (the law)
├── .claude/
│   ├── settings.json               ← hooks (image optimization)
│   └── skills/
│       ├── verstka/SKILL.md
│       └── design-audit/SKILL.md
├── src/
│   ├── App.tsx                     ← router, navbar, footer
│   ├── index.css                   ← tokens + utility classes (extend here, not inline)
│   ├── translations.ts             ← RU / EN / CN dictionaries
│   └── components/
│       ├── TabMain.tsx             ← ETALON
│       └── Tab*.tsx
├── public/                         ← built-in assets (webp images, json data)
├── docs/specs/                     ← content briefs (word-for-word source of truth)
├── assets-source/                  ← source images (jpg/png originals), not used in build
├── scripts/
│   ├── optimize-images.js          ← png/jpg → webp
│   └── fetch-vk-posts.js           ← VK news pipeline
└── package.json
```

---

## 14. When in doubt

1. Re-read this file.
2. Open `TabMain.tsx` and copy the exact pattern.
3. If neither answers the question — stop and ask the human. **Do not invent.** Inventing is what broke the inner pages in the first place.

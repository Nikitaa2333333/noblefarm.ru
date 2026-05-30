---
name: design-audit
description: Audit a Blagorodny Sever tab against the etalon TabMain.tsx and CLAUDE.md design law. Returns a list of violations with file:line references. Use when the user says "проверь вкладку X", "аудит дизайна X", "сравни X с эталоном", "что не так с X".
---

# design-audit — review a tab against the etalon

## When this triggers

The user wants to know whether a tab follows the design system, without (yet) refactoring it. Output is a punch-list of violations with concrete line references, not code changes.

If the user asks "проверь и исправь" — do the audit first, then invoke the `verstka` skill for the fix.

## Inputs

- The target file(s): a `src/components/Tab*.tsx` (or a list of them)
- The etalon: `src/components/TabMain.tsx`
- The law: `CLAUDE.md`
- The spec: `docs/specs/Вкладка-N.md` (for content audit only)

## What to check — the chеcklist

For each tab file, walk the checklist top to bottom and record every violation as `file.tsx:line — what's wrong — what it should be`.

### A. Motion wrapper
- [ ] Root is `<motion.div>` with **exactly**: `initial={{ opacity: 0, y: 15 }}`, `animate={{ opacity: 1, y: 0 }}`, `exit={{ opacity: 0, y: -15 }}`, `transition={{ duration: 0.5, ease: 'easeOut' }}`
- [ ] No additional `className` on the `motion.div` other than the layout-neutral default (no `bg-*`, no `pt-*`, no `pb-*`)

### B. Section flow
- [ ] Page content is composed of `<section>` elements (not one big `<div>` wrapper)
- [ ] Each section uses one of: `.section-calm`, `.section-accent`, `.section-cinematic`
- [ ] No two adjacent sections share the same background class
- [ ] Inside each section, content is wrapped in `<div className="section-inner">`
- [ ] No `mb-16` / `mb-20` between sibling blocks inside a single bg

### C. Hero
- [ ] Hero uses `.hero-side-image` (with its grid + text + media helpers) — unless this is `TabMain` which uses the full-bleed home pattern
- [ ] No `rounded-br-[80px]` on the hero
- [ ] Hero uses `.hero-side-image` (self-contained, owns its bg + nav clearance)
- [ ] Hero typography uses `.hero-title` (or `.hero-title-light`), `.hero-eyebrow`, `.hero-desc`

### D. Cards
- [ ] Every card is one of `.card-feature`, `.card-flat`, `.card-stat`, `.card-accent`
- [ ] `.card-accent` is used only in `TabMain`
- [ ] No `rounded-[24px]` outside `.card-accent`
- [ ] No inline card-like `<div className="rounded-none p-8 border border-border-light">` — these should use a card class

### E. Headings — strict scale
- [ ] All `<h2>` use `.h-section` or `.h-section-light`
- [ ] All in-section sub-headings (`<h3>`, `<h4>`) use `.h-block` / `.h-block-light` or `.card-feature__title`. **Never** inline `font-serif text-Xxl font-bold text-X`.
- [ ] Italic accents use `<span className="h-section__accent">`. **One per heading max.** No italic anywhere else.
- [ ] No `text-accent` (gold) as the color of an entire heading. Gold is only italic-accent-word, eyebrow, stat-value, links.
- [ ] No `text-primary` (green) as heading color on light bg. Headings on light → `text-text-dark`, on dark → `text-text-light`.
- [ ] No `font-sans` on any heading. Every heading is `font-serif`.
- [ ] No `uppercase` on headings, buttons, eyebrows, or footer column titles.
- [ ] No `text-text-dark/X` (any opacity) on light bg. Solid color always. Opacity only allowed on light text over dark bg.
- [ ] No raw `text-gray-*`.

### E2. Body & labels — locked scale
- [ ] Body paragraphs use `.body-lead` (18 px lead) or default `<p>` / `.body-sm` (16 px). **No `text-sm` or `text-xs` for body** — those are no longer valid as body sizes.
- [ ] Small labels (eyebrows, meta-captions): `.label-eyebrow` (14 px gold) or `.label-meta` (14 px dark). No `text-xs` (12 px) anywhere.
- [ ] Stat values use `.card-stat__value` (also for naked-number stacks). Caption under stat = `.label-meta` / `.card-stat__label`.
- [ ] No `text-[10px]`, `text-[11px]`, `text-[12px]`, `text-[13px]` — anywhere.

### E3. Letter-spacing & weight
- [ ] No positive tracking anywhere: `tracking-wide`, `tracking-wider`, `tracking-widest` — all forbidden (eyebrows, meta, badges, footer columns, news meta).
- [ ] Only `tracking-tight` (negative) on `.hero-title` / `.h-section` is allowed.
- [ ] No `font-semibold` (600) on headings — headings are `font-medium` (h1/h2) or `font-bold` (h3/h4).

### F. Buttons
- [ ] All buttons use `.btn-primary`, `.btn-primary-sm`, `.btn-outline-light`, `.btn-outline-dark`, or `.btn-link`
- [ ] No `<button className="px-X py-X bg-Y rounded-[Z]">` inline construction

### G. Shadows & radii
- [ ] **One shadow only**: `.shadow-soft`. No `.shadow-soft-lg` (deprecated alias), no `shadow-xs`, `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-2xl`, `shadow-xl`, `shadow-none`.
- [ ] Hover-feedback is `-translate-y-1`, not a stronger shadow.
- [ ] No custom `rounded-[Npx]` other than the documented `[6px]`, `[24px]` (latter only in `.card-accent`).

### H. Motion (extra)
- [ ] No `layoutId` morphs
- [ ] No `type: 'spring'` transitions
- [ ] No `whileInView` stagger sequences
- [ ] No custom `@keyframes` in the file (or imported from a new CSS file)

### I. Colors
- [ ] No raw hex (`#1B4344`, `rgba(7,23,23,0.4)`) in JSX — use Tailwind tokens
- [ ] Color choices respect light-bg vs dark-bg context (text-text-dark on light, text-text-light on dark)

### J. Content (lighter touch)
- [ ] Spot-check 2–3 headings against `docs/specs/Вкладка-N.md` — if a heading is paraphrased or invented, flag it
- [ ] All three language variants (RU/EN/CN) are present for any visible string

## How to read the file

Use `Read` on the target file. Don't rely on grep alone — visual structure matters. Open the etalon side-by-side mentally.

For long files, scan in this order:
1. Read lines 1–100 (imports, top of component, motion wrapper)
2. Search for `<section` and `<motion.div` to find structural boundaries
3. Read each section header (lines 200, 400, 600 — strategic samples)
4. Skim for the anti-pattern grep targets below

### Quick-grep helpers
Use `Grep` for these inside the target file(s). Each is a one-line check that catches a locked-rule violation:

| Pattern | What it catches |
|---|---|
| `text-\[(10\|11\|12\|13)px\]` | Forbidden tiny font sizes (rule: minimum 14 px) |
| `text-xs` | Forbidden 12 px size anywhere (rule: minimum 14 px) |
| `tracking-(wide\|wider\|widest)` | Forbidden positive letter-spacing (rule: no разрядка) |
| `shadow-(soft-lg\|xs\|sm\|md\|lg\|xl\|2xl)` | Forbidden shadows (rule: only `.shadow-soft`) |
| `uppercase` | Forbidden case (rule: natural case always) |
| `text-accent.*font-bold.*text-(xl\|2xl\|3xl)` | Likely a heading colored gold (forbidden) |
| `text-primary.*font-bold.*text-(lg\|xl\|2xl)` | Likely a heading colored green on light bg (forbidden) |
| `font-sans.*text-(lg\|xl).*font-bold` | Sans-serif heading (forbidden — headings are serif) |
| `italic` (outside `h-section__accent`) | Italic outside the one allowed pattern |
| `text-text-dark/\d` | Opacity on dark text over light bg (forbidden) |
| `text-gray-` | Forbidden gray |
| `#[0-9a-fA-F]{3,6}` | Hex literal in JSX |
| `bg-bg-light pt-` | Calculator-wrapper anti-pattern |
| `mb-16\|mb-20` | Spacing-as-rhythm anti-pattern |
| `rounded-br-\[` | Asymmetric corner usage |
| `initial=\{\{ opacity: 0 \}\}` | Flat fade (missing y) |
| `w-(5\|7\|8) h-(5\|7\|8).*lucide\|<(Check\|X\|ArrowRight)` | Lucide icon in non-standard size (should be `w-6 h-6` in lists) |
| `text-red-\|#B43F3F` | Red color (forbidden — palette is 4 colors) |

## Output format

Return one section per audited file:

```
### TabGenetics.tsx — N violations

1. **TabGenetics.tsx:130–134** — Motion wrapper missing `y` axis
   Current: `initial={{ opacity: 0 }} animate={{ opacity: 1 }}`
   Fix: copy etalon wrapper from `TabMain.tsx:94–99`

2. **TabGenetics.tsx:134** — Calculator wrapper anti-pattern
   Current: `className="bg-bg-light pt-24 pb-20 text-text-dark"`
   Fix: remove all classes from the `motion.div`; replace child `<div className="max-w-[1400px]...">` with sequence of `<section className="section-*">` blocks

3. **TabGenetics.tsx:139** — Asymmetric corner used on inner page hero
   Current: `rounded-none rounded-br-[80px]`
   Fix: replace the entire hero block with `.hero-side-image` pattern (CLAUDE.md §8)

... etc
```

End with a summary:
- Total violation count
- Severity breakdown (structural / cosmetic)
- Whether the file is reasonable to katok-refactor (Yes/No)
- Estimated effort: small (< 20 changes) / medium (20–50) / large (> 50)

## What NOT to do

- Don't fix anything — this skill only reports.
- Don't comment on content quality unless it diverges from `docs/specs/`.
- Don't add new rules to the law during the audit — if you spot an undefined pattern, list it as "unclear pattern, propose to human" and move on.

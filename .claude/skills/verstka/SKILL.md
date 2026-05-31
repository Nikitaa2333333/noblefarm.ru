---
name: verstka
description: Build or katok-refactor a tab page (Blagorodny Sever) following the etalon TabMain.tsx and CLAUDE.md design law. Use when the user says "свёрстай вкладку X", "сделай страницу X", "приведи X к эталону", "перенеси ТЗ X в код".
---

# verstka — page-build protocol

## When this triggers

The user wants to either:
- Build a fresh tab from `docs/specs/Вкладка-N.md`, or
- Refactor an existing `Tab*.tsx` to match the etalon ("katok mode")

If the user is asking about content only (translations, copy edits) — this skill is not needed; just edit `src/translations.ts`.

## Hard rules — do not negotiate

1. **The etalon is `src/components/TabMain.tsx`.** Open it before writing anything. Copy its motion wrapper, section flow, and typography pitch. If you can't justify a pattern by pointing to TabMain — you're inventing, which is forbidden.

2. **Content is verbatim from `docs/specs/Вкладка-N.md`.** Every heading, subheading, list item must come from the spec MD. RU / EN / CN must all be filled in `src/translations.ts`. Do not paraphrase or shorten.

3. **Markup uses only utility classes defined in `src/index.css`.** Specifically:
   - Wrappers: `motion.div` skeleton (see CLAUDE.md §5)
   - Sections: `.section-calm` (white), `.section-accent` (green), `.section-cinematic` (almost-black) + `.section-inner`. Named by mood, not color.
   - Hero: `.hero-side-image` (inner pages) — the side-image pattern only
   - Cards: `.card-feature`, `.card-flat`, `.card-stat`, `.card-accent` (home only)
   - Buttons: `.btn-primary`, `.btn-primary-sm`, `.btn-outline-light`, `.btn-outline-dark`, `.btn-link`
   - Headings: `.h-section`, `.h-section-light`, `.h-section__accent`
   - Shadows: `.shadow-soft`, `.shadow-soft-lg` — never `shadow-xs/sm/md/lg/2xl`
   - Radii: `rounded-none` everywhere except buttons (`rounded-[6px]`). `rounded-[24px]` only inside `.card-accent` on the home page.

4. **Adjacent sections must use different backgrounds.** No two `.section-calm` (or any same class) in a row. The "calculator" feel comes from one flat background — never repeat.

5. **Motion budget: three animations total.** Page enter (`opacity + y:15→0, 0.5s, easeOut`), hover lift (built into cards), sub-tab fade (`0.15s opacity`). Nothing else.

## Protocol

Follow these steps in order. Don't skip.

### 0. Confirm scope
Identify which tab. If building a new tab, confirm with the user which spec MD to use. If refactoring, confirm whether content changes are in scope (default: NO — preserve all existing translations).

### 1. Read sources
- `CLAUDE.md` (the law)
- `src/components/TabMain.tsx` (the etalon)
- `docs/specs/Вкладка-N.md` (the content brief)
- The current `src/components/Tab<Name>.tsx` if refactoring
- `src/index.css` to refresh memory on available utilities

### 2. Plan the section flow
Write out (in your response) the section order with chosen background classes. Verify:
- First section is the hero (use `.hero-side-image` — it's self-contained, no `.section-*` wrapper needed)
- No two adjacent sections share the same background
- Total sections roughly match the spec MD's block count

### 3. Map content blocks → cards
For each spec block, pick exactly one card class:
- Image + title + desc + CTA → `.card-feature`
- Compact content, no image → `.card-flat`
- Number + label → `.card-stat`
- Asymmetric accent card → `.card-accent` (home only)

If a spec block doesn't fit any class, STOP and ask the user. Do not invent.

### 4. Translations
If building fresh: add new keys to `src/translations.ts` under a tab-specific namespace, filling RU + EN + CN from the spec MD verbatim.
If refactoring: keep existing translation keys, do not delete or rename them.

### 5. Write/refactor the component
Start from the §5 skeleton in `CLAUDE.md`. Fill in sections one by one. The wrapper must be exactly:

```tsx
<motion.div
  initial={{ opacity: 0, y: 15 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -15 }}
  transition={{ duration: 0.5, ease: 'easeOut' }}
>
```

### 6. Self-audit against anti-patterns
Before reporting done, grep your work for these and fix any you find:
- `bg-bg-light pt-` on the root `motion.div` (calculator anti-pattern)
- `mb-16` / `mb-20` between sibling blocks inside one bg
- `rounded-br-[80px]` (asymmetric corner outside home)
- `shadow-xs`, `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-2xl`
- `initial={{ opacity: 0 }}` without `y:` (flat fade)
- Hex colors in JSX (`#0F2A47`, etc.)
- `text-gray-*` or low-contrast `text-text-dark/60` for body copy
- `uppercase` on buttons or h2/h3

### 7. Verify
- Run `npm run build` — must pass with zero TS errors
- Run `npm run dev` and visit the tab on desktop (1400px) AND mobile (375px) widths
- Confirm: hero looks right, sections alternate, cards are uniform, motion is calm

### 8. Report
List in your final message:
- Which sections you created (with background class)
- Which card class you used for each content block
- Anything you couldn't map to existing classes (with proposal for human review)

## Output format

When working on this task, walk through the protocol steps briefly so the user can see your planning. Don't over-narrate — one short sentence per step is enough. Focus your output on the actual code changes.

---
description: Build or katok-refactor a tab page (Blagorodny Sever) following the etalon TabMain.tsx and CLAUDE.md design law.
---

# verstka — page-build protocol

Follow these steps in order to build or refactor a tab page:

## 1. Plan Section Flow & Alternate Backgrounds
- Check how many sections the target page has.
- Plan alternating section backgrounds: `.section-calm` (white) ↔ `.section-accent` (green). No two adjacent sections should share the same background.
- Set the first section (hero) to `.hero-side-image` (text left, photo right 4:3) with no `.section-*` wrapper.

## 2. Map Content to Standard Cards
- Image + Title + Desc + CTA -> `.card-feature`
- Compact content grid, no image -> `.card-flat`
- Numbers/stats -> `.card-stat`

## 3. Verify Translations
- Keep existing translations keys intact in `src/translations.ts` or add new keys for new specs.
- Ensure RU, EN, and CN values are all populated verbatim.

## 4. Implement Component Skeleton
- Wrap the page in the standard entrance animation:
```tsx
<motion.div
  initial={{ opacity: 0, y: 15 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -15 }}
  transition={{ duration: 0.5, ease: 'easeOut' }}
>
```
- Ensure all sections use `section-inner` for their content boundaries.

## 5. Audit Against Anti-Patterns
- Double check for inline hex colors, custom shadows, custom border wrappers, uppercase headings, or transparent text on light backgrounds.
- Run `npm run build` to make sure type-checks pass.

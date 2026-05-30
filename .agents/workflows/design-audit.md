---
description: Audit a Blagorodny Sever tab against the etalon TabMain.tsx and CLAUDE.md design law. Returns a list of violations with file:line references.
---

# design-audit — review a tab against the etalon

Follow these instructions to audit a tab file:

## 1. Inputs
- Target file: `src/components/Tab*.tsx`
- Etalon: `src/components/TabMain.tsx`
- Spec: `docs/specs/Вкладка-N.md`

## 2. Checklist to verify
- **A. Motion wrapper**: Root is `<motion.div>` with `initial={{ opacity: 0, y: 15 }}`, `animate={{ opacity: 1, y: 0 }}`, `exit={{ opacity: 0, y: -15 }}`, `transition={{ duration: 0.5, ease: 'easeOut' }}`. No pt/pb classes on root.
- **B. Section flow**: Sections use `.section-calm`, `.section-accent`, `.section-cinematic` + `.section-inner`. Backgrounds alternate. No spacing-as-rhythm anti-patterns like `mb-16` on siblings under same background.
- **C. Hero**: Inner page hero uses `.hero-side-image` (text left, photo right 4:3).
- **D. Cards**: Cards must be `.card-feature`, `.card-flat`, `.card-stat`.
- **E. Headings**: All `<h2>` use `.h-section` or `.h-section-light`. Accent word wrapped in `<span className="h-section__accent">`. No uppercase. No faded gray text (`text-text-dark/50`) on light bg.
- **F. Buttons**: Buttons use `.btn-primary`, `.btn-primary-sm`, `.btn-outline-light`, `.btn-outline-dark`, `.btn-link`. No inline custom button overrides.
- **G. Shadows & radii**: No `shadow-xs/sm/md/lg`. Use `.shadow-soft` or `.shadow-soft-lg`. No custom radii; default `rounded-none`, buttons `rounded-[6px]`.
- **H. Colors**: No raw hex codes in JSX. Solid text colors on light bg.

## 3. Output Format
Present findings with file name, line numbers, description of violation, and recommended fix.

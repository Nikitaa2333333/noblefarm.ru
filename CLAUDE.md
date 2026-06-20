# CLAUDE.md — Blagorodny Sever Design Law

Single source of truth for how this site is built. If the codebase contradicts this file, fix the codebase — don't invent a new rule. If a genuinely new pattern is needed: stop, propose to the human, get approval, add it to `src/index.css` **and** this file, then use it.

---

## 1. Project & architecture

**What**: marketing site for «Благородный Север» — premium farmed deer, velvet antlers (panty), eco-tourism. **Stack**: React 19 + Vite 6 + Tailwind v4 + Motion (Framer). TS, RU/EN/CN.

**How it renders (READ THIS — it's not obvious):**
- `src/main.tsx` → `<App/>`. **`src/App.tsx` is the whole app**: navbar, footer, hash-router (`activeTab` state), and the **home page inline** (functions `Hero`, `About`, `Directions`, `WhyImportant`, `News`, `Media` — App.tsx ~310–860).
- The **home page lives in `App.tsx`**, NOT in a `Tab*` component. To edit the home (hero photos, «Создаём культуру» block, direction cards, map, news) → edit `App.tsx`.
- Inner pages ARE separate components, imported and rendered by `App.tsx` on `activeTab`:

| Tab (`activeTab`) | Component |
|---|---|
| Главная (`main`) | **inline in `App.tsx`** |
| Философия (`philosophy`) | `TabPhilosophy.tsx` |
| Генетика (`genetics`) | `TabGenetics.tsx` (+ `PedigreeChart.tsx`, `data/pedigrees.ts`) |
| Панты (`antlers`) | `TabAntlers.tsx` |
| Отрасль (`importance`) | `TabIndustry.tsx` |
| Познакомиться (`reindeer-intro`) | `TabPopularization.tsx` |
| В СМИ (`media`) | `TabMedia.tsx` |
| Новости (`news`) | `TabNews.tsx` |
| Контакты (`contacts`) | `TabContacts.tsx` |

Shared: `HeroSlideshow.tsx`, `ImageCarousel.tsx`, `translations.ts`. **`TabMain.tsx` was deleted — it was dead code (never imported); the home it described was a never-finished refactor target.** The home page in `App.tsx` is the etalon for layout/rhythm/typography.

**Verify before claiming "done": `npm run build` then grep the built bundle** (`grep -c "<marker>" dist/assets/index-*.js`) and check the live render — editing a file proves nothing if it's the wrong file.

Content briefs (word-for-word, RU+EN+CN, never paraphrase): `docs/specs/Вкладка-N.md`. They govern **text**; this file governs **look**.

---

## 2. Design tokens (in `src/index.css @theme`)

**Four brand colors only.** Everything else is one of these reused in another context.

| Role | Hex | Token | Use |
|---|---|---|---|
| WHITE | `#FFFFFF` | `bg-bg-light`, `bg-bg-card`, `text-text-light` | every light surface, cards, text on dark |
| NAVY | `#0F2A47` | `bg-primary`, `text-primary` | brand: accent sections, primary buttons, active/hover |
| DARK | `#06111E` | `bg-secondary`, `text-secondary`; body text ≈ `text-text-dark` `#1A2333` | body text, cinematic sections |
| GOLD | `#D0B18A` | `bg-accent`, `text-accent` | accent ONLY: eyebrows, gold pills, links/hover, stat values. **Never inside a heading.** |

Dividers (utility, not brand): `border-border-light` `#DEDBD3`, `border-border-dark` `#1E3F5E` — but see §3 "no borders": they have no current legitimate use.

Never hard-code hex in JSX/CSS values — use tokens.

### Color usage
- **White surface**: text/headings solid `text-text-dark` (no opacity). Primary button = NAVY fill→hover GOLD fill. Eyebrow = GOLD. Pills = `bg-accent text-secondary px-3 py-1.5 rounded-[6px]` (or tint `bg-accent/15 text-text-dark`). Cards = same white, separated by `.shadow-soft` only.
- **Navy surface (`.section-accent`)**: text/headings solid `text-text-light`. Inline info tiles = `bg-secondary/40` (no border). Buttons = `btn-outline-light`.
- **Dark surface (`.section-cinematic`, rare)**: text WHITE, ticks `text-accent`.
- **Page dominance**: home = gold + dark (brand statement, gold may dominate). Inner pages = white (`.section-calm`) + navy, gold only as small accents. Color sections by **semantic meaning**, not mechanical alternation; consecutive white sections are fine; navy is rare/strategic; cinematic is rarest.

### Forbidden
A 5th color; two light tones; gold as a large surface; opacity on dark text over light bg; `text-gray-*`.

---

## 3. Typography — locked scale

Every text element uses ONE utility below. Inline `font-serif text-Xxl font-bold` combos are forbidden. Visual ref: `docs/typography.html`.

**Headings (serif always):**
- `.hero-title` / `-light` — 40→80px, H1 in `.hero-side-image`.
- `.h-section` / `-light` — 30→46px, H2 on inner pages.
- `.h-section-xl` / `-light` — 30→64px, H2 on the **home (App.tsx) only**.
- `.h-block` / `-light` — 20→24px bold, H3 subsection title. Always serif+dark.
- `.card-feature__title` — card title (= `.h-block` weight).
- `.card-stat__value` — 30→48px, gold big number / naked-number stacks.

**Body (2 sizes):** `.body-lead` (16→18px, lead) · `.body-sm` (16px, compact) · default `<p>` 16px. **Nothing below 14px as body exists.**

**Labels (2):** `.label-eyebrow` (aliases `.hero-eyebrow`, `.card-feature__eyebrow`) — 14px bold gold, no tracking. `.label-meta` (alias `.card-stat__label`) — 14px bold dark.

**Inline accent:** only `<strong>`/`font-bold` lead-in (same size/color). The two-tone heading is **retired** — `.h-section__accent` is a no-op; headings are one solid color, one font, no italic, no gold word.

**Locked bans:** italic anywhere · gold in any heading · `text-primary` heading on white · `font-sans` heading · any `text-[Npx]<14` / `text-xs` · positive tracking (`tracking-wide/wider/widest`) anywhere (only negative `tracking-tight` on big serif allowed) · arbitrary hero sizes (`lg:text-7xl`) · opacity on dark text over light bg · `uppercase` on headings/buttons/eyebrows/footer titles.

---

## 4. Layout rules

**Section header** — every (eyebrow + H2 + lead paragraphs) group wraps in `.section-header` (`flex flex-col gap-6`). No `mt-*`/`mb-*` on its children; no other gap value. Outer margin on the wrapper is OK to separate it from a following grid.

**Two-column blocks (universal, inner pages):** text LEFT, decoration RIGHT. Locked grid `lg:grid-cols-12` with `lg:col-span-7` (text) + `lg:col-span-5` (decoration: bullets/numbers/image/stats). No other ratio. Text-only sections still use 7/5 (right = air). Flipped (text right) is forbidden. *(Exception: Industry regional subsections alternate L/R per §10 override.)*

**X-height alignment** — in a 7/5 grid with `items-start`: if the LEFT column starts with `.section-header` (eyebrow above H2) → right column gets `lg:pt-14`. If LEFT starts with a bare H2 (no eyebrow) → right gets `lg:pt-3`. Decided by the LEFT, regardless of right content. **Exception — galleries/photos flush-align to the eyebrow:** a right column whose content is a photo or `ImageCarousel`/gallery gets NO top padding (no `lg:pt-14`/`lg:pt-3`) — its top edge sits on one horizontal line with the eyebrow (бирка), not the H2 x-height. This applies only to image/gallery columns; text plates, link tiles, bullet/stat lists still follow the x-height rule above. (Human-approved 2026-06-21.)

**Check-mark text lists** — `<ul className="flex flex-col gap-2.5">`, rows `flex items-center gap-2.5`, tick `<Check className="w-4 h-4 ... shrink-0" strokeWidth={2.5}>` (16px, level with text), label `.body-sm`. Tick color `text-text-dark` (light bg) / `text-accent` (dark bg). No `w-5/w-6` ticks, no `items-start`, no `gap-4+`. (`w-6 h-6` icons are only for icon+heading feature tiles.)

**Spacing:** sections `py-8 md:py-12` (built into `.section-*`) — never `py-12/16/24` on a section. Container `.section-inner` = `max-w-[1400px] mx-auto px-6`. Gaps: `gap-3` tight / `gap-6` default / `gap-10 lg:gap-20` between grid cols. Card padding `p-7 md:p-8`. Naked-number stacks: outer `gap-6`, inner `gap-2` — never `gap-10+` between number+label.

**Radii:** default `rounded-none`. Buttons/inputs/tags `rounded-[6px]`. Rare `rounded-[24px]` only for home `.card-accent`.

**Shadow:** exactly one — `.shadow-soft` (same at rest and hover; `.shadow-soft-lg` is an alias). Hover feedback = motion (`-translate-y-1`), never shadow. Never `shadow-xs/sm/md/lg/xl/2xl/none`.

**Borders & divider lines — none.** No borders on cards/plates/photo frames/tiles. Light surfaces define via `.shadow-soft`; dark surfaces via a darker fill (`bg-secondary/40`). No divider lines between list items / sections / under headings / in footers / nav — separate by whitespace and background-contrast. `border-border-*` tokens exist but have no legitimate use. *(Exceptions: pedigree connectors §9; navy photo frame §10 override.)*

**Interactive widget containers** (sticky sub-menu, selector) on white bg: surface `bg-bg-card` + `.shadow-soft`; inactive buttons `bg-transparent`; active `bg-primary text-text-light`; inner content panel `bg-bg-light`.

---

## 5. Page flow

**Inner tab skeleton:**
```tsx
export default function TabX({ lang, onSwitchTab }: TabXProps) {
  const t = TRANSLATIONS[lang];
  return (
    <motion.div initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-15}} transition={{duration:0.5,ease:'easeOut'}}>
      <section className="hero-side-image"><div className="hero-side-image__grid">…</div></section>
      <section className="section-calm"><div className="section-inner">…</div></section>
      …
    </motion.div>
  );
}
```
(The home in `App.tsx` predates this and uses its own inline section functions — match its rhythm, not its structure.)

**Section backgrounds (3):** `.section-calm` (white, default, may repeat) · `.section-accent` (navy, rare/strategic emphasis) · `.section-cinematic` (near-black, rarest). The inner hero is `.hero-side-image` (self-contained, no `.section-*` wrapper).

**Footer adjacency** — footer is near-black; never produce a navy→white→dark "flag". Last section before footer is EITHER `.section-calm` (white, clean exhale) OR `.section-accent` (navy, flush against footer for a brand CTA close). Never sandwich white between navy and footer. No `mt-*`/`mb-*` on `<footer>` or its previous sibling (exposes a light strip). Footer breathing = its own `pt-*`.

**CTA layout** — "text + CTA" sections stack vertically: `<div className="section-inner flex flex-col gap-10"><div className="section-header">…</div><div className="flex flex-col sm:flex-row flex-wrap gap-4">…buttons…</div></div>`. Never put buttons in a side `lg:col-span-*` beside the text; no `lg:pt-*` on CTA columns.

**The "calculator" anti-pattern (forbidden):** `<motion.div className="bg-bg-light pt-24 pb-20"><div className="max-w-[1400px]"><div className="mb-16">…` — one flat bg with margin-stacked blocks. Replace with skeleton + `<section className="section-*">` per block.

---

## 6. Motion — three animations total

| Use | Spec |
|---|---|
| Page enter | `opacity 0→1, y:15→0, 0.5s easeOut` (motion.div wrapping the tab) |
| Hover lift | `-translate-y-1, 300ms` (in `.card-feature`) |
| Sub-tab fade | `opacity 0→1, 0.15s` |

Forbidden: `layoutId` morph, spring, custom scroll-reveal `@keyframes`, parallax, `whileInView` stagger, any duration ≠ 0.15/0.3/0.5. (The `marquee` keyframe + the auto-rotate slideshow fade `1.5s` are sanctioned exceptions.)

---

## 7. Components

**Buttons** (`src/index.css`): `.btn-primary`, `.btn-primary-sm`, `.btn-outline-light` (dark bg), `.btn-outline-dark` (light bg), `.btn-link` (gold inline link w/ arrow). Never invent or inline-style a button. **Buttons are text-only — no icons/arrows** (arrows belong only to link patterns: `.btn-link`, `.card-feature__cta`, contact-tile links). If a button feels unclear, fix the label.

**Hyperlinks** — every link is GOLD (`text-accent`) on every bg. No color change on hover (feedback = arrow slide `gap-2.5` or `hover:underline`). Never `hover:text-primary`. Patterns: `.card-feature__cta` / `.btn-link` (arrow), or plain `text-accent hover:underline font-semibold`.

**Cards:** `.card-feature` (canonical: image-top + title/desc/CTA; add `group`; aspect on `__media`) · `.card-flat` (small, no image) · `.card-stat` (number-led, use sparingly) · `.card-accent` (`rounded-[24px]`, home only).
```tsx
<div className="card-feature group">
  <div className="card-feature__media aspect-[4/3]"><img src="…" alt="…" /></div>
  <div className="card-feature__body">
    <span className="card-feature__eyebrow">…</span>
    <h3 className="card-feature__title">…</h3>
    <p className="card-feature__desc">…</p>
    <a className="card-feature__cta">Подробнее <ArrowRight className="w-4 h-4" /></a>
  </div>
</div>
```

**Fewer plashki — naked numbers.** A stat (big number + caption) gets NO card wrapper: `<div className="flex flex-col gap-2"><span className="card-stat__value">…</span><span className="label-meta">…</span></div>`, groups separated by outer `gap-6`. Plashki justified only for: `.card-feature` (image card), interactive contact tiles (mailto/tel), `.card-flat` for multi-line grouped content. NOT for a lone number/icon/quote.

**Icons:** lucide-react only (no emoji). Feature-tile icon = `w-6 h-6 text-primary`, no wrapper plate. Pro/con cross = `text-text-dark/50` (never red — no 5th color). Placeholders: `.img-placeholder-dark` / `-light`.

---

## 8. Hero patterns (two)

- **Full-bleed** — home only (`App.tsx` `Hero`, ~310–431): 90vh, bg image right, gradient to dark. Don't replicate on inner pages.
- **Side-image** — every inner page: `.hero-side-image` (self-contained, owns bg + navbar clearance). Text left (col-7), photo right (col-5, aspect 4:3).
```tsx
<section className="hero-side-image"><div className="hero-side-image__grid">
  <div className="hero-side-image__text">
    <span className="hero-eyebrow">…</span><h1 className="hero-title">…</h1><p className="hero-desc">…</p>
    <div className="flex gap-4 flex-wrap mt-2"><a className="btn-primary">…</a><a className="btn-outline-dark">…</a></div>
  </div>
  <div className="hero-side-image__media"><img src="…" alt="…" /></div>
</div></section>
```
Forbidden inner heroes: full-card with `rounded-br-[80px]`; text-only (add a side image); custom 12-col thumb grid.

---

## 9. Pedigree tree (approved line exception — Genetics)

The ONLY place connector lines are allowed (semantic lineage diagram, not dividers). Component `PedigreeChart.tsx`, data `data/pedigrees.ts`.
- **Vertical nested** (`variant="vertical"`, light sections): 1px `border-light` connectors, `.pedigree-card`s by `.shadow-soft`.
- **Horizontal bracket** (`variant="horizontal" tone="dark"`, `.section-cinematic` only): 1px gold connectors, boxes `bg-secondary/40` light text, horizontally scrollable with edge-fade hint. May close the page flush above the footer (dark→dark, not a flag).

Don't generalize — lines stay forbidden everywhere else.

---

## 10. Client brief 17.06.2026 — approved overrides (human-approved 2026-06-20)

Client chose literal brief over the design law for these, ONLY in the listed places — `design-audit` must NOT flag them:
- **Gold hero bg** (`.hero-side-image--gold`) — Philosophy & Popularization heroes.
- **Gold heading** (`h-section text-accent`) — Industry «…не модель одного дохода» only.
- **Navy photo frame** (`.photo-frame-navy`) — Philosophy «Семейный проект» photo only.
- **Blue cooperation card** (`.card-cooperation` + `.card-cooperation__title` @ 20px, no growth) — Contacts «Открыты к сотрудничеству» only. Title is locked at 20px (not `.h-block`'s 24px) so long RU words fit the 5-up card; desc = `.body-sm-light`.
- **Image-behind-text + overlay** (`.principles-bg*`) — Philosophy «Наши принципы» only.
- **Interactive carousel** (`ImageCarousel`) — Industry regions, Popularization mission.
- **Auto-rotating slideshow** (`HeroSlideshow`) — Philosophy & Popularization heroes; home hero.
- **L/R alternation** — Industry regional subsections only.
- **No shadow on photo** — Industry «Почему Россия…» `russia_player` photo only (transparent silhouette on navy; `.shadow-soft` removed, human-approved 2026-06-21). Everywhere else light-surface photos keep `.shadow-soft`.

Everywhere else §2–§8 still apply. Pending: hero photo `1.4` (P2) not delivered by client.

---

## 11. Workflow

Build/refactor a tab: (1) read `docs/specs/Вкладка-N.md`; (2) read the etalon (`App.tsx` home / a clean inner tab); (3) plan section flow + backgrounds; (4) map blocks → card classes (stop & ask if none fit); (5) write from §5 skeleton, text verbatim into translations; (6) audit against this file; (7) `npm run build`; (8) **verify the built bundle + live render** (tests don't catch visual drift). Home edits go in `App.tsx`.

**Image optimization:** any photo in `public/` must exist as `.webp`. `npm run optimize-images` (scans; `-- --force` re-converts; pass a path for specific files). A hook auto-runs it on tool-written images; manual copies need a manual run. Full-res originals live in `assets-source/` (not built).

**Skills** (`.claude/skills/`): `verstka` (build/katok-refactor a page) · `design-audit` (compare a tab to this file, list violations).

---

## 12. Folder layout

```
oooo_template/
├── CLAUDE.md                 ← this file (the law)
├── .claude/{settings.json, skills/{verstka,design-audit}}
├── src/
│   ├── main.tsx              ← entry → <App/>
│   ├── App.tsx               ← whole app + HOME inline (etalon for home)
│   ├── index.css             ← tokens + utilities (extend here, not inline)
│   ├── translations.ts       ← RU/EN/CN
│   ├── data/pedigrees.ts
│   └── components/           ← Tab{Philosophy,Genetics,Antlers,Industry,Popularization,Media,News,Contacts}, PedigreeChart, HeroSlideshow, ImageCarousel
├── public/                   ← built webp/json assets
├── docs/specs/               ← content briefs (word-for-word)
├── assets-source/            ← source originals (jpg/png), not built
├── scripts/{optimize-images.js, fetch-vk-posts.js}
└── package.json
```

**Deploy:** push to `main` → GitHub Actions (`.github/workflows/deploy.yml`) → `npm run build` → SCP `dist/*` to reg.ru → **noblefarm.ru**. Changes are invisible on the live site until merged to `main` and pushed; then bust browser cache (incognito) to verify.

---

## When in doubt
Re-read this file → copy the exact pattern from `App.tsx` (home) or a clean inner tab → if neither answers, stop and ask. Don't invent.

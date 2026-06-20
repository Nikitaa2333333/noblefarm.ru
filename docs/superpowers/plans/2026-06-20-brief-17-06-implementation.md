# Brief 17.06.2026 — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wire all photos requested in the client brief (docx `Комментарии 17.06 часть 2`) into the site AND implement every design/text/structure change from that brief, exactly as the client wrote it.

**Architecture:** Two new reusable React components — `HeroSlideshow` (auto-rotating fade, mirrors TabMain's inline hero logic) and `ImageCarousel` (interactive prev/next gallery with optional per-slide captions) — plus targeted edits to six tab components and `App.tsx`. New visual utilities (gold hero background, navy photo frame, blue card, principles background-image) are added to `index.css`.

**Tech Stack:** React 19, Vite 6, Tailwind v4, Motion (`motion/react`), lucide-react, TypeScript.

## Global Constraints

- **Design-law override (explicit human approval, 2026-06-20):** the client chose "делать буквально как в брифе". The following brief items intentionally violate `CLAUDE.md` and are approved anyway: gold section backgrounds (P10, P43), gold heading (P35), navy photo frame (P11), blue card fill (P39), image-behind-text + overlay (P12), shop-style interactive carousels (P33, P59), and left/right alternation (P34). Implement them as written. Task 9 documents these as new sanctioned patterns so the codebase stays self-consistent.
- **No hard-coded hex in JSX/CSS values** — always use existing tokens (`bg-accent`, `bg-primary`, `border-primary`, `text-secondary`, `text-text-dark`, `text-text-light`). (CLAUDE.md §4 — still in force.)
- **Texts are word-for-word from the brief.** Carousel captions and the «РФ» address use the exact strings quoted in each task. Never paraphrase.
- **Verification gate:** this project has no component unit tests. Each task's gate is `npm run build` (must pass with zero TS errors) followed by a visual check in `npm run dev`. This replaces the TDD red/green cycle, per CLAUDE.md §10 step 7–8.
- **Image filename → brief-number map** (already optimized into `public/` by a prior agent):
  - `philosophy_1/2/3.webp` = 3.1/3.2/3.3 · `family_project.webp` = 3.4 · `principles_bg.webp` = 3.5 · `russia_future.webp` = 3.8
  - `industry_nz_1..5.webp` = 4.1..4.5 · `industry_eu_1..4.webp` = 5.1..5.4 · `industry_asia_1..2.webp` = 6.1..6.2 · `industry_na_1..4.webp` = 7.1..7.4 · `russia_player.webp` = 8
  - `pop_hero_1/2/3.webp` = 11.1/11.2/11.3 · `pop_excursions.webp` = 12 · `pop_carousel_1..5.webp` = 13.1..13.5 · `under_hero.webp` = 2.png
- **BLOCKED — not in this plan:** P2 (Main hero photos 1.2/1.3/1.4) — source file `1.4` does not exist in `17.06.2026/`. Tracked separately as a client question; do not touch TabMain's `HERO_BACKGROUNDS`.

---

## File Structure

| File | Responsibility | Action |
|---|---|---|
| `src/components/HeroSlideshow.tsx` | Auto-rotating fade slideshow for `.hero-side-image__media` slots | **Create** |
| `src/components/ImageCarousel.tsx` | Interactive prev/next image gallery, optional captions | **Create** |
| `src/index.css` | New utilities: `.hero-side-image--gold`, `.photo-frame-navy`, `.card-cooperation`, `.principles-bg*` | **Modify** |
| `src/translations.ts` | «РФ» prefix on Main address strings (RU/EN/CN) | **Modify** |
| `src/components/TabMain.tsx` | P3 under-hero media block | **Modify** |
| `src/App.tsx` | P1 «РФ» footer address | **Modify** |
| `src/components/TabContacts.tsx` | P1 «РФ» address, P39 blue cards | **Modify** |
| `src/components/TabPhilosophy.tsx` | P10 gold hero+slideshow, P11 navy frame, P12 principles bg, P29 russia_future, P28 collateral fix | **Modify** |
| `src/components/TabIndustry.tsx` | P33 region carousels, P34 alternation, P35 gold heading, P36 russia_player | **Modify** |
| `src/components/TabPopularization.tsx` | P43 gold hero+slideshow, P52/P59 captioned carousel, P68 pop_excursions | **Modify** |
| `public/enhanced_deer_1.webp` | Restore original (P28 collateral) | **Restore from git** |
| `public/european_deer.webp` | Dedicated home for photo 3.7 | **Create via optimizer** |
| `CLAUDE.md` | Document the override-approved new patterns | **Modify** |

---

## Task 1: Create `HeroSlideshow` reusable component

Auto-rotating fade slideshow that drops into any `.hero-side-image__media` slot. Mirrors TabMain's inline mechanism (`TabMain.tsx:28-43,101-118`) but reusable and prop-driven.

**Files:**
- Create: `src/components/HeroSlideshow.tsx`

**Interfaces:**
- Produces: `export default function HeroSlideshow(props: { images: string[]; alt: string; intervalMs?: number })` — renders an `<img>` that cross-fades between `images` every `intervalMs` (default 6000). Caller wraps it in the `.hero-side-image__media` div.

- [ ] **Step 1: Write the component**

```tsx
// src/components/HeroSlideshow.tsx
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface HeroSlideshowProps {
  images: string[];
  alt: string;
  intervalMs?: number;
}

export default function HeroSlideshow({ images, alt, intervalMs = 6000 }: HeroSlideshowProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [images, intervalMs]);

  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="popLayout">
        <motion.img
          key={index}
          src={images[index]}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          loading="eager"
        />
      </AnimatePresence>
    </div>
  );
}
```

- [ ] **Step 2: Verify it builds**

Run: `npm run build`
Expected: PASS, no TS errors. (Component is unused so far — this only proves it compiles.)

- [ ] **Step 3: Commit**

```bash
git add src/components/HeroSlideshow.tsx
git commit -m "feat: add reusable HeroSlideshow auto-rotate component"
```

---

## Task 2: Create `ImageCarousel` reusable component

Interactive gallery (prismic "вариант 5" style): one large image, prev/next arrows, dot indicators, and an optional caption line under the image. Used for Industry region galleries (no caption) and Popularization mission carousel (with captions).

**Files:**
- Create: `src/components/ImageCarousel.tsx`

**Interfaces:**
- Produces: `export default function ImageCarousel(props: { slides: { image: string; caption?: string }[]; alt: string; aspect?: string })`. `aspect` is a Tailwind aspect class (default `"aspect-[4/3]"`). Renders the active slide's image and, if present, its caption as a `.body-sm` line below; arrows step the index with wraparound; dots show position.

- [ ] **Step 1: Write the component**

```tsx
// src/components/ImageCarousel.tsx
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  image: string;
  caption?: string;
}

interface ImageCarouselProps {
  slides: Slide[];
  alt: string;
  aspect?: string;
}

export default function ImageCarousel({ slides, alt, aspect = 'aspect-[4/3]' }: ImageCarouselProps) {
  const [index, setIndex] = useState(0);
  const count = slides.length;
  const go = (dir: number) => setIndex((prev) => (prev + dir + count) % count);
  const active = slides[index];

  return (
    <div className="flex flex-col gap-4">
      <div className={`relative ${aspect} overflow-hidden shadow-soft`}>
        <img
          src={active.image}
          alt={`${alt} ${index + 1}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {count > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous"
              onClick={() => go(-1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-secondary/60 text-text-light hover:bg-secondary/80 transition-colors duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => go(1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-secondary/60 text-text-light hover:bg-secondary/80 transition-colors duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {active.caption && (
        <p className="body-sm text-center min-h-[3rem]">{active.caption}</p>
      )}

      {count > 1 && (
        <div className="flex justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? 'w-6 bg-accent' : 'w-2 bg-text-dark/30'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify it builds**

Run: `npm run build`
Expected: PASS, no TS errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/ImageCarousel.tsx
git commit -m "feat: add reusable ImageCarousel (prev/next + captions)"
```

---

## Task 3: Add new CSS utilities to `index.css`

All override-approved visual primitives in one place so JSX stays token-based.

**Files:**
- Modify: `src/index.css` (append to the utilities region, after the `.hero-side-image*` block at line 274)

**Interfaces:**
- Produces CSS classes: `.hero-side-image--gold`, `.photo-frame-navy`, `.card-cooperation`, `.principles-bg`, `.principles-bg__overlay`, `.principles-bg__content`.

- [ ] **Step 1: Append the utilities**

```css
/* ── Brief 17.06 override-approved patterns (human-approved 2026-06-20) ── */

/* Gold hero background (P10 Philosophy, P43 Popularization).
   Eyebrow is normally gold → recolor to dark so it reads on gold. */
.hero-side-image--gold {
  @apply bg-accent;
}
.hero-side-image--gold .hero-eyebrow {
  color: var(--color-secondary);
}

/* Navy frame around a photo (P11 Семейный проект). */
.photo-frame-navy {
  @apply border-[6px] border-primary overflow-hidden shadow-soft;
}

/* Blue cooperation card (P39 Контакты «Открыты к сотрудничеству»). */
.card-cooperation {
  @apply bg-primary text-text-light p-7 md:p-8 flex flex-col justify-between min-h-[180px] shadow-soft;
}

/* Full-width principles block over a background image (P12 «Наши принципы»). */
.principles-bg {
  @apply relative overflow-hidden px-6 py-12 md:py-20;
}
.principles-bg__overlay {
  @apply absolute inset-0 bg-secondary/70;
}
.principles-bg__content {
  @apply relative z-10 max-w-[1400px] mx-auto;
}
```

- [ ] **Step 2: Verify it builds**

Run: `npm run build`
Expected: PASS. (Unused classes are fine — Tailwind v4 `@apply` resolves them.)

- [ ] **Step 3: Commit**

```bash
git add src/index.css
git commit -m "feat: add override-approved utilities (gold hero, navy frame, blue card, principles bg)"
```

---

## Task 4: P1 «РФ» address + P3 under-hero media (TabMain + translations + App)

**P1:** before «Московская область», add «РФ» on the address displays. **P3:** under the hero brand text, add a media block showing `under_hero.webp`.

**Files:**
- Modify: `src/translations.ts:24` (hero.subtitle), `:30`, `:33` (desc strings stay — they are prose, not the address label; leave them)
- Modify: `src/components/TabMain.tsx:310-312` (map caption) and insert under hero at `:145`
- Modify: `src/App.tsx:642`

- [ ] **Step 1: «РФ» in the Main hero eyebrow (translations.ts:24)**

Change the RU `hero.subtitle`. Open `src/translations.ts` line 24:

```ts
      subtitle: 'Московская область',
```

to:

```ts
      subtitle: 'РФ, Московская область',
```

(EN/CN `hero` blocks: locate the matching `subtitle:` in the EN and CN trees and apply the same prefix — `'Russia, Moscow Region'` for EN, `'俄罗斯，莫斯科州'` for CN. Grep `subtitle: 'Moscow Region'` and `subtitle: '莫斯科州'` to find them.)

- [ ] **Step 2: «РФ» on the Main map caption (TabMain.tsx:310-312)**

```tsx
              <span className="block mt-4 text-sm font-bold text-accent">
                {lang === 'RU' ? 'РФ, Московская область' : lang === 'CN' ? '俄罗斯，莫斯科州' : 'Russia, Moscow Region'}
              </span>
```

- [ ] **Step 3: «РФ» in the footer (App.tsx:640-645)**

```tsx
              <span className="text-lg md:text-xl font-bold text-text-dark">
                {lang === 'RU'
                  ? 'РФ, Московская область, Дмитровский район'
                  : lang === 'CN'
                  ? '俄罗斯，莫斯科州，德米特罗夫区'
                  : 'Russia, Moscow Region, Dmitrov District'}
```

- [ ] **Step 4: P3 — insert under-hero media block (TabMain.tsx, after the hero `<p>` at line 145)**

After the closing of the hero description block (immediately after line 145's `</p>` and before the CTA buttons), insert a constrained media block. Insert this JSX right after line 145:

```tsx
            <div className="mt-6 aspect-[16/9] max-w-2xl overflow-hidden shadow-soft">
              <img
                src="/under_hero.webp"
                alt={t.hero.brandName}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
```

(If the hero text is inside a fixed-width column that would crop this oddly, keep `max-w-2xl` — it matches the hero text column width. Verify visually in Step 6.)

- [ ] **Step 5: Build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 6: Visual check**

Run: `npm run dev`, open Main. Confirm: eyebrow reads «РФ, Московская область»; map caption and footer show «РФ, …»; the `under_hero` image appears under the brand text without overlapping the rotating hero photo. Check mobile width.

- [ ] **Step 7: Commit**

```bash
git add src/translations.ts src/components/TabMain.tsx src/App.tsx
git commit -m "feat(main): add РФ to address labels (P1) + under-hero media block (P3)"
```

---

## Task 5: P39 blue cooperation cards (TabContacts)

**Files:**
- Modify: `src/components/TabContacts.tsx:195-197`

- [ ] **Step 1: Swap the card surface to blue**

Replace the card markup at lines 195-197:

```tsx
              <div key={i} className="card-flat flex flex-col justify-between min-h-[180px] bg-bg-card">
                <h4 className="font-serif text-base font-bold text-text-dark leading-tight">{card.title}</h4>
                <p className="body-sm mt-3">{card.desc}</p>
              </div>
```

with the blue `.card-cooperation` (from Task 3) and light text:

```tsx
              <div key={i} className="card-cooperation">
                <h4 className="font-serif text-base font-bold text-text-light leading-tight">{card.title}</h4>
                <p className="body-sm mt-3 text-text-light">{card.desc}</p>
              </div>
```

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 3: Visual check**

`npm run dev` → Contacts → «Открыты к сотрудничеству»: all five cards are navy with white text, readable.

- [ ] **Step 4: Commit**

```bash
git add src/components/TabContacts.tsx
git commit -m "feat(contacts): blue cooperation cards (P39)"
```

---

## Task 6: TabPhilosophy — gold hero+slideshow (P10), navy frame (P11), principles bg (P12), russia_future (P29), collateral fix (P28)

**Files:**
- Modify: `src/components/TabPhilosophy.tsx` (imports, hero 147-171, family/principles 173-208, russia 307-322, species card 79)
- Restore: `public/enhanced_deer_1.webp`
- Create: `public/european_deer.webp` (via optimizer)

- [ ] **Step 1: P28 collateral — restore shared image, give 3.7 its own file**

The prior agent overwrote the shared `public/enhanced_deer_1.webp` (used by TabMain hero, TabGenetics, and TabPopularization excursions) with photo 3.7. Restore the original and place 3.7 under a dedicated name.

```bash
# Restore the shared image to its committed state
git checkout HEAD -- public/enhanced_deer_1.webp public/Maral.webp
# (Maral.webp/jpg = 3.6 is correct and intended; if git restore reverts it, re-confirm 3.6 is wired — see note)
```

Then copy the 3.7 source into a dedicated file and optimize:

```bash
cp "17.06.2026/3.7 Европейский.jpg" "public/european_deer.jpg"
npm run optimize-images public/european_deer.jpg
```

NOTE: `Maral.jpg/.webp` (3.6, P27) and `enhanced_deer_1.webp` are separate binaries; only `enhanced_deer_1.webp` was collaterally overwritten. Do not revert the Maral swap — verify after restore that `public/Maral.webp` still corresponds to 3.6. If `git checkout HEAD` reverted Maral, re-run `cp "17.06.2026/3.6 Марал.jpg" public/Maral.jpg && npm run optimize-images -- --force public/Maral.jpg`.

- [ ] **Step 2: Point the European-deer species card at the new file (TabPhilosophy.tsx:79)**

```tsx
          image: '/european_deer.webp',
```

- [ ] **Step 3: Import HeroSlideshow (TabPhilosophy.tsx:1-4)**

Add the import after line 4:

```tsx
import HeroSlideshow from './HeroSlideshow';
```

- [ ] **Step 4: P10 — gold hero + 3-photo slideshow (TabPhilosophy.tsx:148-169)**

Change the hero `<section>` opening (line 148) to the gold variant, and replace the static `<img>` (line 168) with the slideshow.

Line 148:
```tsx
      <section className="hero-side-image hero-side-image--gold">
```

Lines 167-169:
```tsx
          <div className="hero-side-image__media">
            <HeroSlideshow
              images={['/philosophy_1.webp', '/philosophy_2.webp', '/philosophy_3.webp']}
              alt="Философия проекта"
            />
          </div>
```

- [ ] **Step 5: P11 — navy frame on the family photo (TabPhilosophy.tsx:198-205)**

Replace the family photo wrapper:

```tsx
          <div className="lg:col-span-5 lg:pt-14">
            <div className="aspect-[16/10] overflow-hidden shadow-soft">
              <img
                src="/family_project.webp"
                alt="Семья — основатели проекта"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
```

with the navy frame from Task 3:

```tsx
          <div className="lg:col-span-5 lg:pt-14">
            <div className="aspect-[16/10] photo-frame-navy">
              <img
                src="/family_project.webp"
                alt="Семья — основатели проекта"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
```

- [ ] **Step 6: P12 — extract «Наши принципы» into a full-width bg-image section (right-aligned content)**

Currently the principles check-list is nested inside the family section (TabPhilosophy.tsx:186-196). Remove it from there and add a new full-width section after the family `</section>` (after line 207).

6a. Delete lines 186-196 (the `<div className="flex flex-col gap-6">…principles…</div>` block) from inside the family column. The family left column (line 176) then contains only the `section-header` div.

6b. Insert this new section immediately after the family `</section>` (after current line 207):

```tsx
      {/* ─── Наши принципы (full-width bg image, content right) ──────────── */}
      <section
        className="principles-bg"
        style={{ backgroundImage: 'url(/principles_bg.webp)', backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="principles-bg__overlay" />
        <div className="principles-bg__content grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="hidden lg:block lg:col-span-6" />
          <div className="lg:col-span-6 flex flex-col gap-6">
            <h2 className="h-section-light">{t.family.principlesTitle}</h2>
            <ul className="flex flex-col gap-2.5">
              {t.family.principles.map((principle) => (
                <li key={principle} className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-accent shrink-0" strokeWidth={2.5} />
                  <span className="body-sm text-text-light">{principle}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
```

(`Check` is already imported at line 2. Tick color is `text-accent` and labels `text-text-light` per CLAUDE.md dark-surface rule. Content sits in the right 6 columns per the brief "разместить справа".)

- [ ] **Step 7: P29 — russia_future image in the empty right column (TabPhilosophy.tsx:320)**

Replace the empty right column `<div className="lg:col-span-5" />` at line 320:

```tsx
          <div className="lg:col-span-5 lg:pt-14">
            <div className="aspect-[4/3] overflow-hidden shadow-soft">
              <img
                src="/russia_future.webp"
                alt="Будущее оленеводства в России"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
```

- [ ] **Step 8: Build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 9: Visual check**

`npm run dev` → Philosophy. Confirm: hero background is gold with dark eyebrow + rotating 3 photos; family photo has a navy border; «Наши принципы» is a full-width section with the bg photo darkened, list on the right in light text; the «Почему верим…» section shows `russia_future` on the right; the European-deer card shows photo 3.7; Главная hero and Genetics no longer show 3.7 by accident.

- [ ] **Step 10: Commit**

```bash
git add src/components/TabPhilosophy.tsx public/enhanced_deer_1.webp public/european_deer.webp public/european_deer.jpg
git commit -m "feat(philosophy): gold hero slideshow (P10), navy frame (P11), principles bg (P12), russia_future (P29), fix enhanced_deer_1 collateral (P28)"
```

---

## Task 7: TabIndustry — region carousels (P33), alternation (P34), gold heading (P35), russia_player (P36)

**Files:**
- Modify: `src/components/TabIndustry.tsx` (imports 1-4; regions NZ 386-427 / EU 429-459 / Asia 461-497 / NA 499-529; heading 536-538; russia section 558-588)

Region → images:
- NZ: `industry_nz_1..4.webp` (use 1–4; `nz_5` is an extra, include it as a 5th slide — brief said "несколько фото", 4.5 exists)
- EU: `industry_eu_1..4.webp`
- Asia: `industry_asia_1..2.webp`
- NA: `industry_na_1..4.webp`

Alternation target (P34): NZ text-left, EU text-right, Asia text-left, NA text-right. NZ keeps its stats panel; the carousel goes opposite the text in each region.

- [ ] **Step 1: Import ImageCarousel (TabIndustry.tsx:1-4)**

Add after line 4:

```tsx
import ImageCarousel from './ImageCarousel';
```

- [ ] **Step 2: NZ — add a carousel under the stats (keep text left). Replace the right column (lines 414-424) so it holds stats AND a carousel**

The NZ right column currently holds only stats. Append the carousel below the stats inside the same `lg:col-span-5` div. Replace lines 414-424 closing so the column becomes:

```tsx
            <div className="lg:col-span-5 flex flex-col gap-8 lg:pl-10">
              <div className="flex flex-col gap-6">
                <h3 className="h-block">{isRU ? 'Статистические показатели' : isCN ? '核心产业统计数据' : 'Key Statistics'}</h3>
                <div className="flex flex-col gap-6">
                  {nzStats.map((s, idx) => (
                    <div key={idx} className="flex gap-5 items-baseline">
                      <span className="card-stat__value shrink-0">{s.stat}</span>
                      <span className="text-sm font-medium text-text-dark leading-snug">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <ImageCarousel
                slides={[
                  { image: '/industry_nz_1.webp' },
                  { image: '/industry_nz_2.webp' },
                  { image: '/industry_nz_3.webp' },
                  { image: '/industry_nz_4.webp' },
                  { image: '/industry_nz_5.webp' },
                ]}
                alt="Новая Зеландия"
              />
            </div>
```

- [ ] **Step 3: EU — text RIGHT, carousel LEFT (P34 alternation). Rewrite the grid children at lines 432-456**

Put the carousel as the first grid child (left) and move the text `section-header` to the second child (right). Keep `lg:col-span-7` on text, `lg:col-span-5` on the carousel:

```tsx
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start">
            <div className="lg:col-span-5 lg:pt-14 order-last lg:order-first">
              <ImageCarousel
                slides={[
                  { image: '/industry_eu_1.webp' },
                  { image: '/industry_eu_2.webp' },
                  { image: '/industry_eu_3.webp' },
                  { image: '/industry_eu_4.webp' },
                ]}
                alt="Европа"
              />
            </div>
            <div className="lg:col-span-7 section-header">
              {/* …existing EU eyebrow + h2 + two body-lead paragraphs, unchanged (lines 434-454)… */}
            </div>
          </div>
```

(Keep the EU eyebrow/H2/paragraph content from lines 434-454 verbatim inside the second div. `order-last lg:order-first` keeps the image below the text on mobile, left of it on desktop.)

- [ ] **Step 4: Asia — text LEFT, carousel RIGHT. Replace the empty right column (line 494)**

```tsx
            <div className="lg:col-span-5 lg:pt-14">
              <ImageCarousel
                slides={[
                  { image: '/industry_asia_1.webp' },
                  { image: '/industry_asia_2.webp' },
                ]}
                alt="Азия"
              />
            </div>
```

- [ ] **Step 5: NA — text RIGHT, carousel LEFT (alternation). Rewrite grid children at lines 502-526** (same pattern as Step 3)

```tsx
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start">
            <div className="lg:col-span-5 lg:pt-14 order-last lg:order-first">
              <ImageCarousel
                slides={[
                  { image: '/industry_na_1.webp' },
                  { image: '/industry_na_2.webp' },
                  { image: '/industry_na_3.webp' },
                  { image: '/industry_na_4.webp' },
                ]}
                alt="США и Канада"
              />
            </div>
            <div className="lg:col-span-7 section-header">
              {/* …existing NA eyebrow + h2 + two body-lead paragraphs, unchanged (lines 504-524)… */}
            </div>
          </div>
```

- [ ] **Step 6: P35 — make the income-model heading gold (TabIndustry.tsx:536-538)**

The client explicitly wants this heading gold (override). Wrap the whole heading in `text-accent`:

```tsx
              <h2 className="h-section text-accent">
                {isRU ? 'Современное оленеводство — это не ' : isCN ? '现代养鹿业：' : 'Modern Deer Farming: '}
                {isRU ? 'модель одного дохода' : isCN ? '多元化创收模型' : 'Multiple Income Streams'}
              </h2>
```

(The `<span className="h-section__accent">` is a no-op; collapse it into the heading text. The whole `h2` now carries `text-accent`.)

NOTE on wording: the raw brief reads «не модель **дохода**»; current copy reads «не модель **одного** дохода». Keep the existing «одного дохода» wording unless the client confirms otherwise — flagged in the audit, not changed here.

- [ ] **Step 7: P36 — russia_player image in the «Почему Россия…» section (TabIndustry.tsx:558-588)**

This section is a full-width `max-w-3xl section-header` CTA on `.section-accent`. Add the image while keeping it a navy section. Restructure lines 560-578 into a 12-col grid: text left (col-7), image right (col-5).

Replace line 560 `<div className="section-inner flex flex-col gap-10">` opening and the inner content so the header+image sit in a grid, with the CTA button row below:

```tsx
        <div className="section-inner flex flex-col gap-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start">
            <div className="lg:col-span-7 section-header">
              {/* …existing h2 (h-section-light) + two body-lead-light paragraphs, lines 562-577 unchanged… */}
            </div>
            <div className="lg:col-span-5 lg:pt-14">
              <div className="aspect-[4/3] overflow-hidden shadow-soft">
                <img
                  src="/russia_player.webp"
                  alt="Россия — крупный игрок"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            <button onClick={() => onSwitchTab('contacts')} className="btn-outline-light">
              {isRU ? 'Связаться с нами' : isCN ? '联系我们' : 'Contact Us'}
            </button>
          </div>
        </div>
```

- [ ] **Step 8: Build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 9: Visual check**

`npm run dev` → Industry. Confirm: each region has a working carousel (arrows + dots step through photos); NZ/Asia have text left + image right, EU/NA have image left + text right on desktop and stack image-below-text on mobile; the income heading is gold; the «Почему Россия» navy section shows `russia_player` on the right and the CTA button below.

- [ ] **Step 10: Commit**

```bash
git add src/components/TabIndustry.tsx
git commit -m "feat(industry): region carousels (P33), L/R alternation (P34), gold heading (P35), russia_player (P36)"
```

---

## Task 8: TabPopularization — gold hero+slideshow (P43), captioned carousel (P52/P59), pop_excursions (P68)

**Files:**
- Modify: `src/components/TabPopularization.tsx` (imports 1-3; hero 119-143; mission 145-169; excursions 171-185)

- [ ] **Step 1: Import the two components (TabPopularization.tsx:1-3)**

Add after line 3:

```tsx
import HeroSlideshow from './HeroSlideshow';
import ImageCarousel from './ImageCarousel';
```

- [ ] **Step 2: P43 — gold hero + slideshow (TabPopularization.tsx:120, 139-141)**

Line 120:
```tsx
      <section className="hero-side-image hero-side-image--gold">
```

Lines 139-141:
```tsx
          <div className="hero-side-image__media">
            <HeroSlideshow
              images={['/pop_hero_1.webp', '/pop_hero_2.webp', '/pop_hero_3.webp']}
              alt="Познакомиться с оленеводством"
            />
          </div>
```

- [ ] **Step 3: P52/P59 — remove the bullet `<ul>`, add a captioned carousel on the right (TabPopularization.tsx:158-167)**

Delete the `<ul>` block (lines 158-165) from the left mission column. Then replace the empty right column (line 167) with the captioned carousel. The mission text (`section-header`, lines 149-157) stays in the left column.

Replace lines 158-167:

```tsx
          </div>
          <div className="lg:col-span-5 lg:pt-14">
            <ImageCarousel
              slides={[
                { image: '/pop_carousel_1.webp', caption: 'Чем благородный европейский олень отличается от других видов' },
                { image: '/pop_carousel_2.webp', caption: 'Как формируется стадо' },
                { image: '/pop_carousel_3.webp', caption: 'Зачем нужна генетика и ветеринарное сопровождение' },
                { image: '/pop_carousel_4.webp', caption: 'Что такое панты' },
                { image: '/pop_carousel_5.webp', caption: 'Почему оленеводство — перспективная отрасль для России' },
              ]}
              alt="Популяризация оленеводства"
            />
          </div>
        </div>
      </section>
```

(The left column wrapper `lg:col-span-7 flex flex-col gap-8` from line 148 now contains only the `section-header`. The `t.mission.items` data array at lines 27-33 can stay in `CONTENT` — it's now unused but harmless; optionally delete it for cleanliness.)

- [ ] **Step 4: P68 — pop_excursions image in the empty right column (TabPopularization.tsx:184)**

Replace the empty right column `<div className="lg:col-span-5" />` at line 184:

```tsx
            <div className="lg:col-span-5 lg:pt-14">
              <div className="aspect-[4/3] overflow-hidden shadow-soft">
                <img
                  src="/pop_excursions.webp"
                  alt="В перспективе — знакомство с хозяйством"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
```

- [ ] **Step 5: Build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 6: Visual check**

`npm run dev` → Познакомиться. Confirm: gold hero with rotating 3 photos; mission text on the left, a captioned carousel on the right where each slide shows the right caption from the removed list; the old bullet list is gone; «В перспективе…» section shows `pop_excursions` on the right.

- [ ] **Step 7: Commit**

```bash
git add src/components/TabPopularization.tsx
git commit -m "feat(popularization): gold hero slideshow (P43), captioned carousel from removed list (P52/P59), pop_excursions (P68)"
```

---

## Task 9: Document the override-approved patterns in CLAUDE.md

Per CLAUDE.md §3, any new pattern must be added to the law. These were human-approved on 2026-06-20. Keep the codebase honest so a future audit doesn't "fix" them back.

**Files:**
- Modify: `CLAUDE.md` (add a subsection at the end of §8.5 or a new §8.6)

- [ ] **Step 1: Append a documented-exceptions block**

Add to `CLAUDE.md`:

```markdown
## 8.6. Client brief 17.06.2026 — approved exceptions

The client reviewed the design law and explicitly chose literal implementation of these brief items (approved 2026-06-20). They are sanctioned ONLY in the listed locations and must not be generalized elsewhere:

- **Gold hero background** (`.hero-side-image--gold`) — Philosophy hero, Popularization hero only.
- **Gold heading** — Industry «…не модель одного дохода» heading only (`h-section text-accent`).
- **Navy photo frame** (`.photo-frame-navy`) — Philosophy «Семейный проект» photo only.
- **Blue cooperation card** (`.card-cooperation`) — Contacts «Открыты к сотрудничеству» grid only.
- **Image-behind-text + overlay** (`.principles-bg*`) — Philosophy «Наши принципы» only.
- **Interactive image carousel** (`ImageCarousel`) — Industry region galleries, Popularization mission carousel.
- **Left/right alternation** — Industry regional subsections only.

Everywhere else the original §4–§9 rules still apply (gold never in headings, no borders on photos, navy not used as card fill, text-LEFT/decoration-RIGHT, etc.).
```

- [ ] **Step 2: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: record client-approved 17.06 brief exceptions to the design law"
```

---

## Task 10: Final verification pass

- [ ] **Step 1: Full build**

Run: `npm run build`
Expected: PASS, zero TS errors.

- [ ] **Step 2: Walk every touched tab on desktop AND mobile widths**

`npm run dev`. Check Main, Philosophy, Industry, Contacts, Popularization. For each, confirm the brief items from the audit table are present and nothing regressed (especially the `enhanced_deer_1` fix — Main hero rotation and Genetics should show their original photos, not 3.7).

- [ ] **Step 3: Confirm no dangling images remain**

Grep `src/` for each new webp basename and confirm each is referenced exactly where intended: `under_hero`, `philosophy_2/3`, `principles_bg`, `russia_future`, `russia_player`, `industry_*`, `pop_hero_2/3`, `pop_carousel_*`, `pop_excursions`, `european_deer`.

- [ ] **Step 4: Hand the P2 / 1.4 blocker back to the client**

Record (in the project tracker or a reply to the client): "Main hero (P2) asks for photos 1.2 + 1.3 + 1.4, but source file `1.4` was not delivered in `17.06.2026/`. Currently the hero rotates the available 1.1/1.2/1.3. Please send `1.4` to complete P2."

---

## Self-Review

**Spec coverage** — every brief paragraph mapped to a task:
- P1 → Task 4 · P3 → Task 4 · P2 → BLOCKED (documented, Task 10 Step 4)
- P4–P7, P27, P38, P41, P70 → already done (audit-confirmed; no task needed)
- P10 → Task 6 · P11 → Task 6 · P12/P25 → Task 6 · P28 collateral → Task 6 · P29 → Task 6
- P33 → Task 7 · P34 → Task 7 · P35 → Task 7 · P36 → Task 7
- P39 → Task 5
- P43 → Task 8 · P52/P59 → Task 8 · P68 → Task 8 · P45–P50 → already correct (mission text stays left)
- New patterns documented → Task 9 · Final verify → Task 10

**Placeholder scan** — region Steps 3/5/7 say "existing content unchanged" rather than repeating ~20 lines of trilingual copy verbatim; this is deliberate (the content is not edited, only repositioned) and the exact line ranges are given. All new code blocks are complete.

**Type consistency** — `HeroSlideshow({ images, alt, intervalMs? })` and `ImageCarousel({ slides: {image, caption?}[], alt, aspect? })` signatures match every call site in Tasks 6–8. CSS class names (`.hero-side-image--gold`, `.photo-frame-navy`, `.card-cooperation`, `.principles-bg*`) defined in Task 3 match their uses in Tasks 5–6.

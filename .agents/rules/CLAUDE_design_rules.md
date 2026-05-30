# Blagorodny Sever Design Rules

This document is the persistent guideline for building and styling any page in this project.

## 1. Brand Palette & Color Dominic
- **White (bg-light / bg-card / text-text-light)**: `#FFFFFF`. Differentiates cards via `.shadow-soft` only, not background color.
- **Green (primary)**: `#1B4344`. Main brand color. Used for emphasis sections, active states, and hover targets.
- **Dark (secondary / text-text-dark)**: `#071717` (cinematic bg) and `#1A2828` (body text on light bg).
- **Gold (accent)**: `#D0B18A`. Gold is strictly for **small accents** (italic words in headings, eyebrows, gold pills, hover hints, hyperlinks). Never use it as a large background.

## 2. Strict Design Rules
- **Dark Text on Light Background**: Always solid `text-text-dark`. **Never** use transparency (`text-text-dark/80`, `/70`, etc.).
- **Borders & Outlines**: Do not wrap cards, plates, photo frames, or info tiles in borders (no `border-border-light` or `border-border-dark` wrappers). Use `.shadow-soft` on light backgrounds or solid contrasting dark fills (e.g. `bg-secondary/40`) on dark backgrounds. Borders are only allowed as sibling dividers.
- **Radii**: `rounded-none` by default for cards, sections, images, and plates. Buttons/tags use `rounded-[6px]`. Asymmetric curved borders (`rounded-br-[80px]` or `rounded-[24px]`) are **forbidden** on inner pages.

## 3. Page Skeleton & Rhythm
- Every page is a list of `<section>` elements.
- The hero is `.hero-side-image` (text on left, 4:3 photo on right) which owns its background and navbar clearance padding.
- **Predominance of White backgrounds (`.section-calm`)**: The main background of inner pages is white (`.section-calm`) to maintain spacious and premium "breathing room". Consecutive white sections are fully allowed and recommended.
- **Selective Green backgrounds (`.section-accent`)**: Green (`.section-accent`) must be used **sparingly and strategically** based on the semantic meaning of the block (e.g. key summaries, final call-to-actions, high-impact highlights), never as a forced mechanical alternation.

## 4. Components & Buttons
- Use predefined classes: `.btn-primary`, `.btn-primary-sm`, `.btn-outline-light`, `.btn-outline-dark`, `.btn-link`. Do not override padding/leading or design custom button styles inline.
- Every hyperlink is Gold (`text-accent`) on every background. Underline on hover.
- Cards: `.card-feature` (canonical, image on top), `.card-flat` (small content/news), `.card-stat` (number-led stats).

## 5. Motion Budget
- **Page Enter**: `opacity: 0 -> 1`, `y: 15 -> 0`, duration `0.5s`, ease `easeOut`.
- **Hover Lift**: `-translate-y-1` on `.card-feature`. (Do not apply hover-lift on `.card-flat` or other static cards).
- **Sub-tab Fade**: `opacity: 0 -> 1` in `0.15s` for local selectors.

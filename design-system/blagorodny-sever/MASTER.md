# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Blagorodny Sever
**Generated:** 2026-05-21 19:37:00
**Category:** Agriculture / Eco-Tourism / Wellness Premium

---

## Global Rules

### Color Palette

| Role | Hex | Tailwind Theme Variable | CSS Variable |
|------|-----|-------------------------|--------------|
| Primary | `#1B4344` | `bg-primary`, `text-primary` | `--color-primary` |
| Secondary | `#071717` | `bg-secondary`, `text-secondary` | `--color-secondary` |
| Accent / CTA | `#D0B18A` | `bg-accent`, `text-accent` | `--color-accent` |
| Background Light | `#F2EEE6` | `bg-bg-light`, `text-text-light` | `--color-bg-light` |
| Card Background | `#FAFAF8` | `bg-bg-card` | `--color-bg-card` |
| Text Dark | `#1A2828` | `text-text-dark` | `--color-text-dark` |
| Text Light | `#F2EEE6` | `text-text-light` | `--color-text-light` |
| Border Light | `#DEDBD3` | `border-border-light` | `--color-border-light` |
| Border Dark | `#255556` | `border-border-dark` | `--color-border-dark` |

**Color Notes:** Deep aquamarine / forest teal as primary, charcoal for readable typography, soft warm milk/sand as base backgrounds, and matte harvest gold for premium accents.

### Typography

- **Heading Font:** Playfair Display (Serif)
- **Body Font:** Manrope (Sans-serif)
- **Mood:** calm, wellness, premium, ecological, natural, organic

**CSS Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap');
```

---

## Component Specs

### Buttons

```css
/* Primary Button (CTA) */
.btn-primary {
  background: var(--color-accent);
  color: var(--color-secondary);
  padding: 14px 32px;
  border-radius: 9999px;
  font-weight: 600;
  transition: all 300ms ease;
  cursor: pointer;
}

.btn-primary:hover {
  background: var(--color-primary);
  color: var(--color-text-light);
  transform: translateY(-1px);
}

/* Secondary Button (Outline) */
.btn-secondary {
  background: transparent;
  color: var(--color-text-light);
  border: 1px solid var(--color-text-light);
  padding: 14px 32px;
  border-radius: 9999px;
  font-weight: 600;
  transition: all 300ms ease;
  cursor: pointer;
}

.btn-secondary:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}
```

### Cards

```css
/* Interactive Card (Directions block) */
.card-interactive {
  background: var(--color-bg-card);
  color: var(--color-text-dark);
  border: 1px solid var(--color-border-light);
  border-radius: 24px;
  padding: 32px;
  transition: all 500ms cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.card-interactive:hover {
  background: var(--color-primary);
  color: var(--color-text-light);
  border-color: var(--color-primary);
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}
```

---

## Style Guidelines

**Style:** Organic Biophilic / Premium Eco-Tourism

**Keywords:** Nature, organic shapes, green, sustainable, rounded, flowing, wellness, earthy, natural textures

**Key Effects:** Soft rounded corners (16-24px), smooth CSS transitions (300-500ms), high text contrast (min 4.5:1), responsive layout flow.

---

## Anti-Patterns (Do NOT Use)

- ❌ **Hard pure blacks (`#000000`)** — Use dark forest/charcoal (`#071717` or `#1A2828`).
- ❌ **Low contrast text** — Make sure text remains highly legible.
- ❌ **Hard shadows** — Use soft, diffuse shadows with low opacity.
- ❌ **Emojis as icons** — Use Lucide SVG icons.
- ❌ **Instant hover state jumps** — Always use `transition-all duration-300` or `duration-500`.

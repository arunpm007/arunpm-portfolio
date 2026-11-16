# Design standard — "Industrial signal"

Every page and component follows these rules. If something doesn't fit them,
change the thing, not the rule. Tokens live in `app/globals.css`.

## 1. Content: fewer, heavier statements

- **One claim per block, with its proof.** A section earns its place by making
  one point a hiring manager remembers ("One sign-in across four products"),
  backed by evidence (a number, a demo, a case study). No filler labels, no
  tag clouds, no "10 small facts" lists.
- **Lead with ownership and outcome**, then the method. Tools are named only
  when they explain a decision.
- **No team-size numbers, no product names** from employers. Describe the
  domain instead ("a 3D trading-card marketplace").
- **Never invent impact.** Every number on the site is one Arun has confirmed.
- **Senior framing: scope over metrics.** The home page shows what is owned
  (products, surfaces, systems, ownership depth), not task-level metrics like
  "−35% crashes" or "−72% assets". Those belong inside a case study as
  supporting proof of a decision, never as a headline.
- **Breadth with depth.** Cover every area owned (platform, identity, commerce,
  3D, design systems, mobile); each claim names what was architected or built.
- Depth lives in the case studies and `/lab`; the home page stays scannable in
  about 60 seconds.

## 2. Colour — five tokens, one accent

| Token | Value | Use |
|---|---|---|
| `bg` | `#0B0B0C` carbon | page background |
| `surface` | `#141416` | raised panels, cards |
| `line` | `#26262A` | hairlines, borders |
| `fg` | `#ECE8DF` bone | primary text |
| `muted` | `#9C978C` | secondary text (≥ 4.5:1 on bg) |
| `signal` | `#FF5A1F` safety orange | **the only accent** |

The signal colour is a scarce resource. It may appear only on:
primary CTAs, the single most important number in a block, active/progress
states, and the hero card's edge light. Never on body text, never as a
gradient, never more than ~5% of a screen. No rainbow, no holo gradients.

## 3. Type

| Role | Font | Style |
|---|---|---|
| Display | **Big Shoulders** (variable, condensed) | UPPERCASE, 700–900, tight leading (0.85–0.95), tracking −0.01em |
| Body | **Inter Tight** | 400–600, 1.6 line-height, 65–75ch lines |
| Labels / data | **JetBrains Mono** | UPPERCASE, 0.7–0.75rem, tracking 0.12em |

Scale: display `clamp(3.5rem, 11vw, 11rem)` → section `clamp(2.6rem, 6vw, 5.5rem)`
→ card title `1.5–2rem` → body `1.05–1.2rem` → label `0.72rem`.

## 4. Shape & surface

- Sharp corners (radius 0–6px). Industrial, not bubbly. Pills only for tiny status chips.
- 1px `line` borders; panels are flat `surface`, no glassmorphism, no glows
  except the signal edge light.
- Grid: 12 columns, max width 1280px, 24px gutters (16px on phones).
- A visible structure: section index + mono label top-left of every section
  (`01 — SELECTED WORK`).

## 5. Motion (GSAP + ScrollTrigger, Lenis smooth scroll)

Motion explains hierarchy; it never delays content.

| Pattern | Where | Rule |
|---|---|---|
| **Line reveal** (masked, y 100% → 0) | display headings | 0.9s, `expo.out`, 0.06s stagger |
| **Scrub highlight** (dim → bone, word by word) | the statement | tied to scroll, no autoplay |
| **Pinned horizontal** | case studies | pin while panels slide; one panel per viewport |
| **Count up** | impact numbers | once, on enter |
| **Parallax** | images inside frames | ≤ 12% travel |
| **Curtain** | route changes | 0.6s signal-orange wipe |

- Durations: micro 150–250ms, reveals 0.8–1s. Easing `expo.out` / `power3.inOut`.
- Animate only `transform` and `opacity`.
- `prefers-reduced-motion`: no pinning, no scrub, no curtain — content renders
  in place. Content must be readable with JavaScript off.

## 6. Accessibility & performance floor

- Contrast ≥ 4.5:1 for text, visible focus ring (signal outline), 44px touch targets.
- WebGL only on capable GPUs (see `useDeviceTier`); HTML fallback otherwise.
- No layout shift from animations; images sized; fonts via `next/font`.

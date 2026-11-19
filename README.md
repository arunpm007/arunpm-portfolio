# Arun P M — Portfolio

The personal site of Arun P M, frontend architect and senior frontend engineer. Built with **Next.js 16**, **React Three Fiber**, a **custom GLSL shader** and **GSAP scroll choreography**, and designed to stay fast on everything from flagship laptops to low-end phones.

## Highlights

- **Holographic ID card hero.** A WebGL card with a custom brushed-titanium shader, drawn at runtime from canvas textures. It tilts with the pointer and flips on click.
- **GPU-aware device tiering.** `useDeviceTier` reads the GPU and picks a quality tier. Software renderers, reduced motion and devices without WebGL get a matching HTML/CSS card.
- **Guided horizontal case studies.** A pinned stage driven by ScrollTrigger and Lenis, with focus and blur on the active panel, numbered markers, arrows, snapping and sideways trackpad swipes.
- **Six case studies** in a hiring-friendly structure: Problem, Context, My role, Decisions, Tradeoffs, Quality, Outcome, Next.
- **Live demos, not screenshots.** Runtime theming, holographic cards and a swipeable phone UI run in the page.
- **Accessible by default.** Visible focus states, 44px touch targets, `prefers-reduced-motion` respected, and content readable without JavaScript.
- **Data-driven content.** Copy lives in [`lib/site.ts`](lib/site.ts) and [`lib/case-studies.ts`](lib/case-studies.ts).

## Design

The visual rules ("Industrial signal": carbon, bone and one safety-orange accent; Big Shoulders, Inter Tight and JetBrains Mono; motion vocabulary) are written down in [`DESIGN.md`](DESIGN.md).

## Tech stack

| Area | Tools |
|---|---|
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| 3D | Three.js, React Three Fiber, GLSL |
| Motion | GSAP (ScrollTrigger, SplitText), Lenis |
| Styling | Tailwind CSS v4 (CSS-first `@theme`) |

## Getting started

```bash
npm install
npm run dev      # http://localhost:3050
```

```bash
npm run build    # production build
npm run start    # serve the production build
npm run lint
```

## Project structure

```
app/
  page.tsx              # home: hero → statement → case studies → capabilities → proof → experience → projects → contact
  work/[slug]/          # case-study pages
  resume/               # in-browser résumé viewer
  opengraph-image.tsx   # link-preview image
  sitemap.ts robots.ts
components/
  home/                 # home sections
  hero/                 # WebGL card, shader, canvas-drawn faces, HTML fallback
  case/                 # case-study diagrams and section index
  demos/                # live demos (theming, cards, phone)
  motion/               # GSAP helpers, line reveal, scrub text, page curtain
  three/useDeviceTier.ts
lib/
  site.ts               # profile, capabilities, experience, projects
  case-studies.ts       # case-study content
```

## Deploy

Deploys to any Next.js host (Vercel, Netlify). Set one environment variable so link previews and the sitemap use the real address:

```
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

---

Built by Arun P M.

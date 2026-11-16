# Arun P M — Portfolio

A cinematic, high-performance developer portfolio built with **Next.js**, **React Three Fiber** and a **custom GLSL shader** hero. Designed to be fast on everything from flagship laptops to low-end phones via device tiering.

> Source: [github.com/arunpm007/arunpm-portfolio](https://github.com/arunpm007/arunpm-portfolio)

## Highlights

- **Custom GLSL fresnel shader** on a displaced icosahedron — a dark glass orb with a green rim, plus a particle field and cursor parallax.
- **Device-tiered 3D** — `useDeviceTier` scales geometry/particle detail and DPR, and falls back to a static poster on low-end / reduced-motion devices.
- **Smooth scroll** (Lenis) + **scroll-reveal** animations, respecting `prefers-reduced-motion`.
- **Data-driven content** — all copy lives in [`lib/site.ts`](lib/site.ts); components never need editing to update text.
- **Responsive** and theme-consistent, with an accessible dark palette.

## Tech stack

| Area | Tools |
|------|-------|
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| 3D | Three.js, React Three Fiber, drei, GLSL |
| Animation | GSAP, Lenis |
| Styling | Tailwind CSS v4 (CSS-first `@theme`) |

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3050](http://localhost:3050).

```bash
npm run build   # production build
npm run start   # serve the production build
```

## Project structure

```
app/
  layout.tsx        # fonts, metadata, smooth-scroll + navbar
  page.tsx          # section composition
  globals.css       # theme tokens + effects (Tailwind v4)
components/
  Hero.tsx          # hero section + text overlay
  HeroCanvas.tsx    # tiering + <Canvas> + poster fallback
  three/
    HeroScene.tsx   # GLSL shader blob + particles + parallax
    useDeviceTier.ts
  Work.tsx  Projects.tsx  Skills.tsx  About.tsx  Contact.tsx
lib/
  site.ts           # single source of truth for all content
```

## Customizing

- **Content** — edit [`lib/site.ts`](lib/site.ts) (profile, experience, projects, skills).
- **Theme** — edit the `@theme` block in [`app/globals.css`](app/globals.css).
- **Résumé** — place your PDF at `public/arunpm_resume.pdf`.

## Deploy

Deploys cleanly to [Vercel](https://vercel.com): import the GitHub repo, keep defaults, deploy.

---

Built by Arun P M.

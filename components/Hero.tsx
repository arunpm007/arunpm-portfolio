import HeroCanvas from "./HeroCanvas";
import { profile } from "@/lib/site";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Ambient layers */}
      <div className="pointer-events-none absolute inset-0 hero-glow" />
      <div className="pointer-events-none absolute inset-0 bg-grid" />

      {/* 3D layer */}
      <div className="absolute inset-0">
        <HeroCanvas />
      </div>

      {/* bottom fade into next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />

      {/* Text overlay (pointer-events off so parallax still tracks the cursor) */}
      <div className="pointer-events-none relative z-10 mx-auto max-w-4xl px-6 text-center">
        <span className="pointer-events-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs text-muted backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          Open to senior frontend roles
        </span>

        <h1 className="font-heading text-6xl font-extrabold leading-[0.95] tracking-tight sm:text-7xl md:text-8xl">
          <span className="text-gradient">{profile.name}</span>
        </h1>

        <p className="mt-5 font-heading text-xl font-semibold sm:text-2xl">
          <span className="text-gradient-accent">{profile.role}</span>
        </p>
        <p className="mt-2 text-sm uppercase tracking-[0.25em] text-faint">
          {profile.tagline}
        </p>

        <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-muted">
          {profile.intro}
        </p>

        <div className="pointer-events-auto mt-9 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#work"
            className="cursor-pointer rounded-full bg-accent px-6 py-3 text-sm font-semibold text-bg transition-colors duration-200 hover:bg-accent-soft"
          >
            View my work
          </a>
          <a
            href="#contact"
            className="cursor-pointer rounded-full border border-border bg-surface/40 px-6 py-3 text-sm font-medium text-fg backdrop-blur-md transition-colors duration-200 hover:border-accent/50"
          >
            Get in touch
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-faint">
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="h-9 w-[1px] bg-gradient-to-b from-faint to-transparent" />
      </div>
    </section>
  );
}

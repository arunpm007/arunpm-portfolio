import CaricatureBold from "../hero/CaricatureBold";
import { heroFacts, heroScope, profile } from "@/lib/site";

/**
 * Bold hero — a reacting Luffy mascot, torn-strip display type and collage
 * stickers (see DESIGN.md's "industrial signal" palette, pushed loud).
 */
export default function Hero() {
  const rots = ["-2deg", "1.5deg", "-1deg"];
  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden pt-24">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0" />

      <div className="relative mx-auto grid w-full max-w-[1280px] flex-1 items-center gap-10 px-4 pb-10 sm:px-6 lg:grid-cols-[1.25fr_0.75fr]">
        {/* Left — bold type + collage */}
        <div className="relative">
          <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="sticker wob label inline-block px-3 py-1.5">● Open to work</span>
            <span className="label text-muted">
              {profile.name} — {profile.location}
            </span>
          </div>

          <h1 className="sr-only">
            {profile.name} — {profile.headline}, {profile.role}
          </h1>

          <p className="display text-[clamp(4rem,12vw,11.5rem)] leading-[0.82]">FRONTEND</p>
          <div className="relative inline-block">
            <span aria-hidden="true" className="torn absolute inset-x-[-0.75rem] top-[34%] bottom-[30%] z-0" />
            <p className="display relative z-10 text-[clamp(4rem,12vw,11.5rem)] leading-[0.82] text-fg">
              ARCHITECT<span className="text-signal">.</span>
            </p>
          </div>

          <p className="scrawl mt-6 text-3xl text-fg">I build the fun stuff — fast, real, shipped.</p>

          <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted">{profile.intro}</p>

          <ul className="mt-7 flex flex-wrap gap-3">
            {heroScope.map((s, i) => (
              <li
                key={s}
                className="sticker label inline-block px-3 py-1.5"
                style={{ transform: `rotate(${rots[i % rots.length]})` }}
              >
                {s}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a href="#work" className="btn btn-signal" style={{ boxShadow: "4px 4px 0 rgba(0,0,0,.6)" }}>
              See the work <span aria-hidden="true">↓</span>
            </a>
            <a href={profile.resumeUrl} className="sticker label inline-flex items-center px-4 py-3">
              Résumé
            </a>
          </div>
        </div>

        {/* Right — the mascot */}
        <div className="relative">
          <div
            aria-hidden="true"
            className="halftone absolute left-1/2 top-1/2 -z-0 h-[22rem] w-[22rem] max-w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40"
            style={{
              maskImage: "radial-gradient(circle, #000 55%, transparent 72%)",
              WebkitMaskImage: "radial-gradient(circle, #000 55%, transparent 72%)",
            }}
          />
          <div className="bubble wob absolute left-0 top-2 z-20 hidden px-4 py-2 sm:block">
            <span className="display text-2xl">SHISHISHI!</span>
          </div>
          <div className="relative z-10">
            <CaricatureBold />
          </div>
          <div className="absolute -bottom-2 right-2 z-20 hidden text-right lg:block">
            <span className="scrawl text-2xl text-signal">yep, that&apos;s me</span>
            <svg
              viewBox="0 0 80 40"
              className="ml-auto mt-1 h-8 w-20"
              fill="none"
              stroke="#FF5A1F"
              strokeWidth={2.5}
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M78 6 C50 2 20 10 6 30" />
              <path d="M6 30 L16 24 M6 30 L14 34" />
            </svg>
          </div>
        </div>
      </div>

      {/* The 10-second read */}
      <dl className="relative border-t hairline">
        <div className="mx-auto grid max-w-[1280px] sm:grid-cols-3">
          {heroFacts.map((f, i) => (
            <div key={f.label} className={`px-4 py-5 sm:px-6 ${i > 0 ? "border-t hairline sm:border-l sm:border-t-0" : ""}`}>
              <dt className="label">{f.label}</dt>
              <dd className="mt-1.5 font-medium">{f.value}</dd>
            </div>
          ))}
        </div>
      </dl>
    </section>
  );
}

import HoloCard from "../hero/HoloCard";
import { LineReveal } from "../motion/Motion";
import { heroFacts, profile } from "@/lib/site";

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden pt-24">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0" />

      <div className="relative mx-auto grid w-full max-w-[1280px] flex-1 items-center gap-12 px-4 pb-10 sm:px-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div>
          <p className="label flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping bg-signal opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 bg-signal" />
            </span>
            {profile.name} — {profile.location}
          </p>

          <h1 className="sr-only">
            {profile.name} — {profile.headline}, {profile.role}
          </h1>
          <LineReveal as="p" immediate className="display mt-6 text-[clamp(4rem,12vw,11.5rem)]" >
            Frontend
            <br />
            architect<span className="text-signal">.</span>
          </LineReveal>

          <p className="mt-8 max-w-xl text-xl leading-relaxed text-muted sm:text-2xl sm:leading-snug">
            {profile.intro}
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#work" className="btn btn-signal">
              See the work <span aria-hidden="true">↓</span>
            </a>
            <a href="/resume" className="btn">
              Résumé
            </a>
          </div>
        </div>

        <HoloCard />
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

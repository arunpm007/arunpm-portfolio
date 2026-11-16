import HoloCard from "./hero/HoloCard";
import { Magnetic } from "./ui";
import { profile, ticker } from "@/lib/site";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 sm:pt-32">
      <div aria-hidden="true" className="hero-aura pointer-events-none absolute inset-0" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-6 pb-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:pb-28">
        <div>
          <p className="label flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-holo-1 opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-holo-1" />
            </span>
            <span>{profile.name}</span>
            <span aria-hidden="true">/</span>
            <span>{profile.location}</span>
          </p>

          <h1 className="mt-7 text-[clamp(2.6rem,6vw,5.2rem)] font-semibold leading-[0.98] tracking-[-0.035em]">
            I lead frontend teams and build interfaces that{" "}
            <span className="font-display italic font-normal tracking-[-0.01em] text-holo">feel</span>{" "}
            effortless.
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
            {profile.intro}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Magnetic
              href="#case-studies"
              className="btn-primary min-h-12 items-center rounded-full px-7 text-sm font-semibold"
            >
              <span className="relative z-10">Read the case studies</span>
            </Magnetic>
            <Magnetic
              href="/resume"
              className="min-h-12 items-center rounded-full border hairline px-7 text-sm font-medium transition-colors hover:border-fg/40"
            >
              Résumé
            </Magnetic>
            <div className="ml-1 flex items-center gap-1">
              <IconLink href={profile.github} label="GitHub">
                <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49v-1.7c-2.78.62-3.37-1.22-3.37-1.22-.46-1.18-1.11-1.5-1.11-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.36-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05a9.36 9.36 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9v2.82c0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
              </IconLink>
              <IconLink href={profile.linkedin} label="LinkedIn">
                <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.64h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85V21h-4V9Z" />
              </IconLink>
            </div>
          </div>
        </div>

        <HoloCard />
      </div>

      {/* Ticker of headline numbers */}
      <div className="relative border-y hairline py-4">
        <div className="flex w-max animate-marquee gap-12 whitespace-nowrap pr-12" aria-hidden="true">
          {[...ticker, ...ticker].map((item, i) => (
            <span key={i} className="label flex items-center gap-12 !text-muted">
              {item}
              <span className="h-1 w-1 rounded-full [background:var(--holo)]" />
            </span>
          ))}
        </div>
        <ul className="sr-only">
          {ticker.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function IconLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-full text-muted transition-colors hover:text-fg"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
        {children}
      </svg>
    </a>
  );
}

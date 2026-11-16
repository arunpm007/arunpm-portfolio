import Reveal from "./Reveal";
import { CopyEmail, Magnetic } from "./ui";
import { profile } from "@/lib/site";

const links = [
  { label: "GitHub", href: profile.github },
  { label: "LinkedIn", href: profile.linkedin },
  { label: "Résumé", href: "/resume" },
].filter((l) => l.href);

export default function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden pt-24">
      <div aria-hidden="true" className="hero-aura pointer-events-none absolute inset-0 opacity-70" />
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal className="border-t hairline pt-8">
          <p className="label">(06) Contact</p>
          <h2 className="mt-10 text-[clamp(3rem,9vw,8rem)] font-semibold leading-[0.92] tracking-[-0.045em]">
            Have something
            <br />
            worth <span className="font-display font-normal italic tracking-[-0.02em] text-holo">building?</span>
          </h2>
          <p className="mt-8 max-w-md text-lg text-muted">
            I&apos;m open to senior frontend and lead roles, and to interesting collaborations. Email is the fastest way to reach me.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Magnetic
              href={`mailto:${profile.email}`}
              className="btn-primary min-h-12 items-center rounded-full px-7 text-sm font-semibold"
            >
              <span className="relative z-10">{profile.email}</span>
            </Magnetic>
            <CopyEmail email={profile.email} />
          </div>
        </Reveal>

        <footer className="mt-28 flex flex-col gap-6 border-t hairline py-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="label transition-colors hover:text-fg"
              >
                {l.label}
                {l.href.startsWith("http") ? " ↗" : ""}
              </a>
            ))}
          </div>
          <p className="label">
            © {new Date().getFullYear()} {profile.name} · {profile.location}
          </p>
        </footer>
      </div>
    </section>
  );
}

import { LineReveal } from "../motion/Motion";
import { CopyEmail } from "../ui";
import { lookingFor, profile } from "@/lib/site";

const links = [
  { label: "GitHub", href: profile.github },
  { label: "LinkedIn", href: profile.linkedin },
  { label: "Résumé", href: "/resume" },
];

export default function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-16 overflow-hidden border-t hairline">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-[1280px] px-4 pt-24 sm:px-6 sm:pt-32">
        <div className="flex items-center gap-4">
          <span className="label !text-fg">06</span>
          <span className="h-px w-8 bg-signal" />
          <span className="label">Contact</span>
        </div>

        <LineReveal as="h2" className="display mt-10 text-[clamp(4.5rem,15vw,14rem)]">
          Let&apos;s
          <br />
          build<span className="text-signal">.</span>
        </LineReveal>

        <div className="mt-16 grid gap-14 lg:grid-cols-2">
          <div>
            <p className="max-w-md text-2xl leading-snug">
              Open to senior frontend, frontend architect and lead roles. Email is the fastest way to reach me.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={`mailto:${profile.email}`} className="btn btn-signal">
                {profile.email}
              </a>
              <CopyEmail email={profile.email} />
            </div>
          </div>
          <div>
            <p className="label">Currently looking for</p>
            <ul className="mt-4 border-t hairline">
              {lookingFor.map((item) => (
                <li key={item} className="flex gap-4 border-b hairline py-4 text-lg">
                  <span aria-hidden="true" className="mt-[0.65em] h-1.5 w-1.5 shrink-0 bg-signal" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <footer className="mt-28 flex flex-col gap-6 border-t hairline py-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-x-8 gap-y-2">
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

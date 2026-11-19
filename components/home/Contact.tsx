import BoldSectionLabel from "./BoldSectionLabel";
import CaricatureBold from "../hero/CaricatureBold";
import { CopyEmail } from "../ui";
import { lookingFor, profile } from "@/lib/site";

const links = [
  { label: "GitHub", href: profile.github },
  { label: "LinkedIn", href: profile.linkedin },
  { label: "Résumé", href: "/resume" },
];

/** Bold outro — the mascot bookends the page and the contact paths sit up front. */
export default function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-16 overflow-hidden border-t hairline">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0" />
      <span
        className="tape hidden h-7 w-28 lg:block"
        style={{ top: "3rem", right: "8rem", transform: "rotate(-14deg)" }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-[1280px] px-4 pt-20 sm:px-6 sm:pt-28">
        <BoldSectionLabel index="05" label="Let's build" rot="-2deg" />

        <div className="grid items-center gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <p className="display text-[clamp(2.8rem,8vw,6.5rem)] leading-[0.9]">
              Let&apos;s build
              <br />
              something that <span className="text-signal">ships.</span>
            </p>
            <p className="scrawl mt-5 text-3xl text-fg">open to senior &amp; lead roles — ping me ↓</p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a href={`mailto:${profile.email}`} className="btn btn-signal" style={{ boxShadow: "4px 4px 0 rgba(0,0,0,.6)" }}>
                Email me
              </a>
              <CopyEmail email={profile.email} />
              <a href={profile.resumeUrl} className="sticker label inline-flex items-center px-4 py-3">
                Résumé
              </a>
            </div>

            <div className="mt-10">
              <p className="label mb-4">Currently looking for</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {lookingFor.map((item, i) => (
                  <div
                    key={item}
                    className="group flex items-start gap-4 border-2 border-fg/12 bg-surface/40 p-5 transition-colors hover:border-signal"
                  >
                    <span className="display text-3xl leading-none text-signal">0{i + 1}</span>
                    <p className="text-base leading-snug">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[300px]">
            <div className="bubble wob absolute -top-2 left-0 z-20 px-3 py-1.5">
              <span className="display text-xl">LET&apos;S GO!</span>
            </div>
            <CaricatureBold />
          </div>
        </div>

        <footer className="mt-20 flex flex-col gap-6 border-t hairline py-8 sm:flex-row sm:items-center sm:justify-between">
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

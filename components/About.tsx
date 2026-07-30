import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { about } from "@/lib/site";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading index="04" title="About" />

      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <Reveal className="space-y-5 text-lg leading-relaxed text-muted">
          {about.paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </Reveal>

        <Reveal delay={120} className="grid grid-cols-2 gap-4">
          {about.stats.map((stat) => (
            <div
              key={stat.label}
              className="card rounded-2xl p-5"
            >
              <div className="font-heading text-2xl font-extrabold text-gradient-accent">
                {stat.value}
              </div>
              <div className="mt-1 text-xs leading-snug text-faint">
                {stat.label}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

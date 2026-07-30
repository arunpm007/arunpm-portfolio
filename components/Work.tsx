import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { experience } from "@/lib/site";

export default function Work() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading
        index="01"
        title="Experience"
        subtitle="Where I've shipped — creative frontend today, enterprise mobile before that."
      />

      <div className="space-y-6">
        {experience.map((job, i) => (
          <Reveal key={job.company} delay={i * 80}>
            <article className="card rounded-2xl p-6 sm:p-8">
              <div className="flex flex-col gap-1 border-b border-border pb-5 sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <h3 className="font-heading text-xl font-bold">
                    {job.company}
                  </h3>
                  <p className="text-accent">{job.role}</p>
                </div>
                <span className="text-sm text-faint">{job.period}</span>
              </div>

              <p className="mt-5 text-muted">{job.summary}</p>

              <ul className="mt-5 space-y-2.5">
                {job.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-sm leading-relaxed text-muted">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-2">
                {job.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border bg-surface-2/50 px-3 py-1 text-xs text-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

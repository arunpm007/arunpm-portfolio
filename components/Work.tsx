import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { experience } from "@/lib/site";

/** Splits "Lead-in: rest" so the lead-in can be set in the foreground colour. */
function splitLead(text: string): [string | null, string] {
  const i = text.indexOf(": ");
  return i > 0 && i < 40 ? [text.slice(0, i), text.slice(i + 2)] : [null, text];
}

export default function Work() {
  return (
    <section id="work" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <SectionHeading
        index="01"
        title="Where I've shipped"
        emphasis="shipped"
        subtitle="Leading frontend today, enterprise mobile before that."
      />

      <div className="space-y-20">
        {experience.map((job) => (
          <Reveal key={job.company} className="grid gap-8 md:grid-cols-[180px_1fr]">
            <div className="md:sticky md:top-28 md:self-start">
              <p className="label">{job.period}</p>
            </div>
            <article>
              <h3 className="font-display text-4xl italic leading-tight sm:text-5xl">{job.company}</h3>
              <p className="mt-2 text-muted">{job.role}</p>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed">{job.summary}</p>

              <ul className="mt-8 divide-y divide-border border-y hairline">
                {job.highlights.map((h) => {
                  const [lead, rest] = splitLead(h);
                  return (
                    <li key={h} className="grid gap-1 py-4 text-[0.95rem] leading-relaxed sm:grid-cols-[170px_1fr] sm:gap-6">
                      {lead ? (
                        <>
                          <span className="font-medium text-fg">{lead.charAt(0).toUpperCase() + lead.slice(1)}</span>
                          <span className="text-muted">{rest.charAt(0).toUpperCase() + rest.slice(1)}</span>
                        </>
                      ) : (
                        <span className="text-muted sm:col-span-2">{rest}</span>
                      )}
                    </li>
                  );
                })}
              </ul>

              <p className="label mt-6 leading-6">{job.stack.join("  ·  ")}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

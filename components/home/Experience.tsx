import BoldSectionLabel from "./BoldSectionLabel";
import Reveal from "../Reveal";
import { experience } from "@/lib/site";

/** Compact experience — company, period, a readable one-line brief and the
 *  stack. Powerful at a glance; no need to dig into case studies. */
export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-[1280px] scroll-mt-16 px-4 py-16 sm:px-6 sm:py-24">
      <BoldSectionLabel index="04" label="Experience" scrawl="where I've shipped" rot="2deg" />

      <div>
        {experience.map((job, i) => (
          <Reveal
            key={job.company}
            className={`grid gap-5 py-10 lg:grid-cols-[220px_1fr] lg:gap-10 ${i > 0 ? "border-t hairline" : ""}`}
          >
            <p className="label pt-2">{job.period}</p>
            <div>
              <h3 className="display text-[clamp(2.4rem,5vw,4.2rem)]">{job.company}</h3>
              <p className="mt-2 text-muted">{job.role}</p>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed">{job.brief}</p>
              <p className="label mt-5 leading-6">{job.stack}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

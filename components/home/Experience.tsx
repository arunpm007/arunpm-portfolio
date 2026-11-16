import SectionHeader from "./SectionHeader";
import Link from "next/link";
import Reveal from "../Reveal";
import { experience } from "@/lib/site";

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-[1280px] scroll-mt-16 px-4 py-28 sm:px-6 sm:py-36">
      <SectionHeader
        index="04"
        label="Experience"
        title={
          <>
            Where I&apos;ve shipped<span className="text-signal">.</span>
          </>
        }
        aside={
          <>
            Three lines per role — the full detail is in the{" "}
            <a href="/resume" className="text-fg underline decoration-signal decoration-2 underline-offset-4">résumé</a>.
          </>
        }
      />

      <div className="border-b hairline">
        {experience.map((job) => (
          <Reveal key={job.company} className="grid gap-6 border-t hairline py-12 lg:grid-cols-[220px_1fr_1.2fr] lg:gap-10">
            <p className="label pt-2">{job.period}</p>
            <div>
              <h3 className="display text-[clamp(2.6rem,5vw,4.6rem)]">{job.company}</h3>
              <p className="mt-3 text-muted">{job.role}</p>
            </div>
            <div>
              <ul className="space-y-4">
                {job.lines.map((l) => (
                  <li key={l} className="flex gap-4 text-lg leading-relaxed">
                    <span aria-hidden="true" className="mt-[0.7em] h-1.5 w-1.5 shrink-0 bg-signal" />
                    {l}
                  </li>
                ))}
              </ul>
              <p className="label mt-6 leading-6">{job.stack}</p>
              {job.links && (
                <div className="mt-6 flex flex-wrap items-center gap-2">
                  <span className="label mr-1">Deep dives</span>
                  {job.links.map((l) => (
                    <Link key={l.href} href={l.href} className="btn !min-h-9 !px-3 !text-[0.68rem] hover:!border-signal hover:text-signal">
                      {l.label} →
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

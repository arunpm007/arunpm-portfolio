import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { about } from "@/lib/site";

export default function About() {
  const [lead, ...rest] = about.paragraphs;
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <SectionHeading index="05" title="About me" emphasis="me" />

      <div className="grid gap-6 md:grid-cols-[180px_1fr]">
        <div />
        <div>
          <Reveal>
            <p className="font-display text-[clamp(1.8rem,3.4vw,2.8rem)] leading-[1.15]">{lead}</p>
          </Reveal>
          <Reveal delay={100} className="mt-8 grid max-w-3xl gap-5 text-lg leading-relaxed text-muted md:grid-cols-2">
            {rest.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </Reveal>

          <Reveal delay={150} className="mt-14 grid grid-cols-2 border-t hairline md:grid-cols-4">
            {about.stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`border-b hairline py-6 pr-4 md:border-b-0 ${i % 2 === 1 ? "pl-4 md:pl-0" : ""} ${i > 0 ? "md:border-l md:pl-6" : ""}`}
              >
                <p className="font-display text-[clamp(2rem,3.6vw,3rem)] leading-none">{stat.value}</p>
                <p className="label mt-3 leading-5">{stat.label}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { caseStudies } from "@/lib/case-studies";

function Title({ title, emphasis }: { title: string; emphasis: string }) {
  const [a, b] = title.split(emphasis);
  return (
    <>
      {a}
      <span className="whitespace-nowrap font-display italic font-normal">{emphasis}</span>
      {b}
    </>
  );
}

export default function CaseStudies() {
  return (
    <section id="case-studies" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <SectionHeading
        index="03"
        title="How I think, in two stories"
        emphasis="two stories"
        subtitle="The problem, the constraints, what I built and what I'd tell the next person."
      />

      <div className="border-b hairline">
        {caseStudies.map((cs) => (
          <Reveal key={cs.slug}>
            <Link
              href={`/work/${cs.slug}`}
              className="group grid gap-6 border-t hairline py-10 transition-colors md:grid-cols-[180px_1fr_auto] md:items-center"
            >
              <span className="label">Case study {cs.index}</span>
              <div>
                <h3 className="text-balance text-[clamp(1.8rem,3.4vw,2.8rem)] font-semibold leading-[1.05] tracking-[-0.025em] transition-colors group-hover:text-holo">
                  <Title title={cs.title} emphasis={cs.emphasis} />
                </h3>
                <p className="mt-3 max-w-2xl text-muted">{cs.summary}</p>
                <div className="mt-5 flex flex-wrap gap-x-8 gap-y-2">
                  {cs.results.map((r) => (
                    <p key={r.label} className="label">
                      <span className="font-display text-xl normal-case tracking-normal text-fg">{r.value}</span>{" "}
                      {r.label}
                    </p>
                  ))}
                </div>
              </div>
              <span
                aria-hidden="true"
                className="flex h-14 w-14 items-center justify-center rounded-full border hairline text-xl transition-all duration-300 group-hover:rotate-[-45deg] group-hover:border-fg/40 group-hover:bg-fg group-hover:text-bg"
              >
                →
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

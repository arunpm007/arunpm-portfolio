import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Reveal from "@/components/Reveal";
import CaseFigure from "@/components/case/Figures";
import CaseToc from "@/components/case/CaseToc";
import { LineReveal, CountUp, RefreshOnLoad } from "@/components/motion/Motion";
import { ScrollProgress } from "@/components/ui";
import { caseStudies, getCaseStudy, SECTIONS, type CaseStudy, type Section } from "@/lib/case-studies";
import { profile } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const cs = getCaseStudy((await params).slug);
  if (!cs) return {};
  return { title: cs.title, description: cs.summary, openGraph: { title: cs.title, description: cs.summary, type: "article" } };
}

const WIDE = new Set(["sso-flow", "sign-out-flow"]);

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-4">
      {items.map((t) => (
        <li key={t} className="flex gap-4 text-lg leading-relaxed text-muted">
          <span aria-hidden="true" className="mt-[0.7em] h-1.5 w-1.5 shrink-0 bg-signal" />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

function SectionBody({ cs, id }: { cs: CaseStudy; id: Section }) {
  switch (id) {
    case "problem":
      return (
        <div className="space-y-6">
          {cs.problem.map((p, i) => (
            <p key={p} className={i === 0 ? "text-2xl leading-snug" : "text-lg leading-relaxed text-muted"}>
              {p}
            </p>
          ))}
        </div>
      );
    case "context":
      return <Bullets items={cs.context} />;
    case "role":
      return <Bullets items={cs.role} />;
    case "decisions":
      return (
        <ol className="border-t hairline">
          {cs.decisions.map((d, i) => (
            <li key={d.title} className="grid gap-2 border-b hairline py-6 sm:grid-cols-[64px_1fr]">
              <span className="display text-3xl text-signal">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="text-xl font-semibold">{d.title}</h3>
                <p className="mt-2 text-lg leading-relaxed text-muted">{d.text}</p>
              </div>
            </li>
          ))}
        </ol>
      );
    case "tradeoffs":
      return (
        <div className="border-t hairline">
          {cs.tradeoffs.map((t) => (
            <div key={t.chose} className="grid gap-4 border-b hairline py-6 md:grid-cols-[1fr_1fr_1.4fr]">
              <div>
                <p className="label !text-signal">Chose</p>
                <p className="mt-2 font-semibold">{t.chose}</p>
              </div>
              <div>
                <p className="label">Over</p>
                <p className="mt-2 text-muted line-through decoration-fg/30">{t.over}</p>
              </div>
              <div>
                <p className="label">Why</p>
                <p className="mt-2 leading-relaxed text-muted">{t.why}</p>
              </div>
            </div>
          ))}
        </div>
      );
    case "quality":
      return <Bullets items={cs.quality} />;
    case "outcome":
      return <Bullets items={cs.outcome} />;
    case "next":
      return <Bullets items={cs.next} />;
  }
}

export default async function CaseStudyPage({ params }: Params) {
  const cs = getCaseStudy((await params).slug);
  if (!cs) notFound();

  const [a, b] = cs.title.split(cs.emphasis);
  const next = caseStudies[(caseStudies.indexOf(cs) + 1) % caseStudies.length];

  return (
    <>
      <ScrollProgress />
      <RefreshOnLoad />
      <Navbar home={false} />
      <main>
        {/* Header */}
        <header className="relative overflow-hidden border-b hairline">
          <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0" />
          <div className="relative mx-auto max-w-[1280px] px-4 pb-16 pt-32 sm:px-6 sm:pt-40">
            <Link href="/#work" className="label inline-flex items-center gap-2 transition-colors hover:text-fg">
              ← All case studies
            </Link>
            <div className="mt-10 flex items-center gap-4">
              <span className="label !text-fg">Case study {cs.index}</span>
              <span className="h-px w-8 bg-signal" />
            </div>
            <LineReveal as="h1" immediate className="display mt-6 max-w-6xl text-[clamp(3.2rem,9vw,8.5rem)]">
              {a}
              <span className="text-signal">{cs.emphasis}</span>
              {b}
            </LineReveal>
            <p className="mt-8 max-w-3xl text-xl leading-relaxed text-muted sm:text-2xl sm:leading-snug">{cs.summary}</p>

            <dl className="mt-14 grid gap-6 border-t hairline pt-6 sm:grid-cols-2 lg:grid-cols-4">
              {cs.meta.map((m) => (
                <div key={m.label}>
                  <dt className="label">{m.label}</dt>
                  <dd className="mt-2">{m.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </header>

        {/* Results */}
        <section aria-label="Results" className="border-b hairline">
          <dl className="mx-auto grid max-w-[1280px] sm:grid-cols-3">
            {cs.results.map((r, i) => (
              <div key={r.label} className={`flex flex-col-reverse px-4 py-10 sm:px-6 ${i > 0 ? "border-t hairline sm:border-l sm:border-t-0" : ""}`}>
                <dt className="label mt-3">{r.label}</dt>
                <dd className={`display text-[clamp(3.5rem,7vw,6rem)] ${i === 0 ? "text-signal" : ""}`}>
                  <CountUp value={r.value} />
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Body with sticky section index */}
        <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[200px_1fr] lg:gap-16">
          <CaseToc />
          <div className="max-w-3xl">
            {SECTIONS.map((s, i) => (
              <div key={s.id}>
                <section id={s.id} data-case-section className="scroll-mt-24 border-t hairline pt-6 pb-16">
                  <div className="mb-8 flex items-baseline gap-4">
                    <span className="label !text-signal">{String(i + 1).padStart(2, "0")}</span>
                    <h2 className="display text-[clamp(2.2rem,4.4vw,3.6rem)]">{s.label}</h2>
                  </div>
                  <SectionBody cs={cs} id={s.id} />
                </section>
                {cs.figures
                  .filter((f) => f.after === s.id)
                  .map((f) => (
                    <Reveal key={f.figure} className="-mt-4 mb-16">
                      <figure>
                        <div className="-mx-4 overflow-x-auto border-y hairline bg-surface px-4 py-8 sm:mx-0 sm:border sm:p-10">
                          <div className={WIDE.has(f.figure) ? "min-w-[620px]" : ""}>
                            <CaseFigure figure={f.figure} />
                          </div>
                        </div>
                        <figcaption className="label mt-4 leading-5">{f.caption}</figcaption>
                      </figure>
                    </Reveal>
                  ))}
              </div>
            ))}

            <Reveal>
              <blockquote className="display border-l-4 border-signal pl-6 text-[clamp(2rem,4vw,3.4rem)]">
                {cs.lesson}
              </blockquote>
            </Reveal>
          </div>
        </div>

        {/* Next */}
        <footer className="border-t hairline">
          <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6">
            <p className="label">Next case study</p>
            <Link href={`/work/${next.slug}`} className="group mt-4 flex items-end justify-between gap-6">
              <span className="display text-[clamp(2.6rem,7vw,6rem)] transition-colors group-hover:text-signal">{next.title}</span>
              <span aria-hidden="true" className="display text-[clamp(2.6rem,7vw,6rem)] transition-transform duration-300 group-hover:translate-x-3">
                →
              </span>
            </Link>
            <p className="mt-14 text-muted">
              Want the longer version?{" "}
              <a href={`mailto:${profile.email}`} className="text-fg underline decoration-signal decoration-2 underline-offset-4">
                Email me
              </a>{" "}
              — happy to walk through any of it.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Reveal from "@/components/Reveal";
import CaseFigure from "@/components/case/Figures";
import { ScrollProgress } from "@/components/ui";
import { caseStudies, getCaseStudy, type Block } from "@/lib/case-studies";
import { profile } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const cs = getCaseStudy((await params).slug);
  if (!cs) return {};
  return {
    title: cs.title,
    description: cs.summary,
    openGraph: { title: cs.title, description: cs.summary, type: "article" },
  };
}

const WIDE_FIGURES = new Set(["sso-flow", "sign-out-flow"]);

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="mt-20 border-t hairline pt-8 text-3xl font-semibold tracking-[-0.025em] sm:text-4xl">
          {block.text}
        </h2>
      );
    case "p":
      return <p className="mt-6 text-lg leading-[1.75] text-muted">{block.text}</p>;
    case "quote":
      return (
        <blockquote className="my-14 font-display text-[clamp(1.8rem,3.6vw,2.8rem)] italic leading-[1.15]">
          <span className="text-holo">“</span>
          {block.text}
          <span className="text-holo">”</span>
        </blockquote>
      );
    case "steps":
      return (
        <ol className="mt-10 space-y-8">
          {block.items.map((s, i) => (
            <li key={s.title} className="grid gap-2 sm:grid-cols-[56px_1fr]">
              <span className="font-display text-3xl italic text-faint">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="text-xl font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-lg leading-[1.7] text-muted">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      );
    case "lessons":
      return (
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {block.items.map((l) => (
            <div key={l.title} className="rounded-2xl border hairline bg-surface p-6">
              <h3 className="font-display text-2xl italic leading-tight">{l.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{l.text}</p>
            </div>
          ))}
        </div>
      );
    case "figure":
      return (
        <figure className="my-14 -mx-6 sm:mx-0">
          <div className="overflow-x-auto border-y hairline bg-surface px-6 py-8 sm:rounded-3xl sm:border sm:p-10">
            <div className={WIDE_FIGURES.has(block.figure) ? "min-w-[620px]" : ""}>
              <CaseFigure figure={block.figure} />
            </div>
          </div>
          <figcaption className="label mt-4 px-6 leading-5 sm:px-0">{block.caption}</figcaption>
        </figure>
      );
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
      <Navbar home={false} />
      <main className="relative overflow-hidden">
        <div aria-hidden="true" className="hero-aura pointer-events-none absolute inset-x-0 top-0 h-[80vh]" />

        <article className="relative mx-auto max-w-6xl px-6 pb-24 pt-36">
          <Link href="/#case-studies" className="label inline-flex items-center gap-2 transition-colors hover:text-fg">
            ← All case studies
          </Link>

          <header className="mt-10">
            <p className="label">Case study {cs.index}</p>
            <h1 className="mt-5 max-w-5xl text-balance text-[clamp(2.6rem,6.4vw,5.6rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
              {a}
              <span className="whitespace-nowrap font-display font-normal italic tracking-[-0.01em] text-holo">{cs.emphasis}</span>
              {b}
            </h1>
            <p className="mt-8 max-w-2xl text-xl leading-relaxed text-muted">{cs.summary}</p>

            <dl className="mt-12 grid gap-6 border-y hairline py-6 sm:grid-cols-2 lg:grid-cols-4">
              {cs.meta.map((m) => (
                <div key={m.label}>
                  <dt className="label">{m.label}</dt>
                  <dd className="mt-2">{m.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-12 grid gap-8 sm:grid-cols-3">
              {cs.results.map((r) => (
                <Reveal key={r.label}>
                  <p className="font-display text-[clamp(3rem,6vw,4.8rem)] leading-none">{r.value}</p>
                  <p className="label mt-3">{r.label}</p>
                </Reveal>
              ))}
            </div>
          </header>

          <div className="mx-auto mt-8 max-w-3xl">
            {cs.blocks.map((block, i) => (
              <BlockView key={i} block={block} />
            ))}
          </div>

          <footer className="mx-auto mt-24 max-w-3xl border-t hairline pt-10">
            <p className="label">Next case study</p>
            <Link
              href={`/work/${next.slug}`}
              className="group mt-4 flex items-center justify-between gap-6"
            >
              <span className="text-3xl font-semibold tracking-[-0.025em] transition-colors group-hover:text-holo sm:text-4xl">
                {next.title}
              </span>
              <span aria-hidden="true" className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border hairline text-xl transition-all group-hover:bg-fg group-hover:text-bg">
                →
              </span>
            </Link>
            <p className="mt-16 text-muted">
              Want the longer version?{" "}
              <a href={`mailto:${profile.email}`} className="text-fg underline decoration-fg/30 underline-offset-4 hover:decoration-fg">
                Email me
              </a>{" "}
              — I&apos;m happy to walk through any of it.
            </p>
          </footer>
        </article>
      </main>
    </>
  );
}

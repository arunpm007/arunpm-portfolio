import Link from "next/link";
import SectionHeader from "./SectionHeader";
import Reveal from "../Reveal";
import { capabilities } from "@/lib/site";

export default function Capabilities() {
  return (
    <section id="capabilities" className="mx-auto max-w-[1280px] scroll-mt-16 px-4 py-28 sm:px-6 sm:py-36">
      <SectionHeader
        index="02"
        label="Capabilities"
        title={
          <>
            What I own<span className="text-signal">.</span>
          </>
        }
        aside="Frontend first — and the full-stack depth to own it end to end. Each area proven in more than one place."
      />

      <div className="grid border-l border-t hairline md:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((c, i) => (
          <Reveal key={c.id} delay={(i % 3) * 80} className="h-full">
            <article className="group flex h-full flex-col border-b border-r hairline p-7 transition-colors hover:bg-surface sm:p-8">
              <div className="flex items-baseline justify-between">
                <span className="label !text-signal">0{i + 1}</span>
                {c.link && (
                  <Link href={c.link.href} className="label transition-colors hover:text-fg">
                    {c.link.label} →
                  </Link>
                )}
              </div>
              <h3 className="display mt-6 text-[clamp(2rem,3vw,2.6rem)]">{c.title}</h3>
              <p className="mt-4 text-lg leading-snug">{c.claim}</p>
              <ul className="mt-6 flex-1 space-y-3 border-t hairline pt-5">
                {c.built.map((b) => (
                  <li key={b} className="flex gap-3 leading-relaxed text-muted">
                    <span aria-hidden="true" className="mt-[0.65em] h-1 w-1 shrink-0 bg-signal" />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-1.5">
                {c.evidence.map((e) => (
                  <span key={e} className="border hairline px-2 py-1 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-fg">
                    {e}
                  </span>
                ))}
              </div>
              <p className="label mt-3 leading-5">{c.stack}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

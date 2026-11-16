import { ScrubText } from "../motion/Motion";
import { statement, strengths } from "@/lib/site";

/** The one paragraph that matters, lit word by word as you scroll, then proof. */
export default function Statement() {
  return (
    <section aria-label="Statement" className="mx-auto max-w-[1280px] px-4 py-28 sm:px-6 sm:py-40">
      <ScrubText
        text={statement}
        className="display max-w-6xl text-[clamp(2.4rem,6vw,5.6rem)] !leading-[0.98]"
      />

      <p className="label mt-24">What I bring</p>
      <dl className="mt-4 grid border-t hairline sm:grid-cols-2 lg:grid-cols-4">
        {strengths.map((m, i) => (
          <div
            key={m.word}
            className={`border-b hairline py-8 pr-5 sm:[&:nth-child(even)]:border-l sm:[&:nth-child(even)]:pl-5 lg:border-b-0 lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:pl-5`}
          >
            <dt className={`display text-[clamp(2.4rem,3.6vw,3.6rem)] ${i === 0 ? "text-signal" : ""}`}>{m.word}</dt>
            <dd className="mt-3 max-w-[18rem] leading-relaxed text-muted">{m.line}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

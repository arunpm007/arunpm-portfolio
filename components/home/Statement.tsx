import { CountUp, ScrubText } from "../motion/Motion";
import { scope, statement } from "@/lib/site";

/** The one paragraph that matters, lit word by word as you scroll, then proof. */
export default function Statement() {
  return (
    <section aria-label="Statement" className="mx-auto max-w-[1280px] px-4 py-28 sm:px-6 sm:py-40">
      <ScrubText
        text={statement}
        className="display max-w-6xl text-[clamp(2.4rem,6vw,5.6rem)] !leading-[0.98]"
      />

      <p className="label mt-24">Scope I own</p>
      <dl className="mt-4 grid grid-cols-2 border-t hairline lg:grid-cols-4">
        {scope.map((m, i) => (
          <div
            key={m.label}
            className={`flex flex-col-reverse py-8 pr-4 ${i % 2 === 1 ? "border-l hairline pl-5" : ""} ${i === 2 ? "hairline lg:border-l lg:pl-5" : ""} ${i < 2 ? "border-b hairline lg:border-b-0" : ""}`}
          >
            <dt className="mt-3 max-w-[16rem] leading-snug text-muted">{m.label}</dt>
            <dd className={`display whitespace-nowrap text-[clamp(2.8rem,5.4vw,5.4rem)] ${i === 0 ? "text-signal" : ""}`}>
              <CountUp value={m.value} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

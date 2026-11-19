import BoldSectionLabel from "./BoldSectionLabel";
import Reveal from "../Reveal";
import { capabilities } from "@/lib/site";

/** "What I own" as a bold editorial list — index, a big title that slides on
 *  hover, and the stack. Scope over prose; depth lives in the work. */
export default function Capabilities() {
  return (
    <section id="capabilities" className="mx-auto max-w-[1280px] scroll-mt-16 px-4 py-16 sm:px-6 sm:py-24">
      <BoldSectionLabel index="02" label="What I own" scrawl="end to end" rot="1.5deg" />

      <div>
        {capabilities.map((c, i) => (
          <Reveal key={c.id}>
            <div className={`group grid items-center gap-x-6 gap-y-1 py-6 transition-colors hover:bg-surface/50 sm:grid-cols-[2.5rem_1fr_auto] sm:py-7 ${i > 0 ? "border-t hairline" : ""}`}>
              <span className="label !text-signal">0{i + 1}</span>
              <h3 className="display text-[clamp(1.9rem,4vw,3.1rem)] transition-transform duration-300 group-hover:translate-x-2">
                {c.title}
              </h3>
              <p className="label leading-5 text-muted sm:text-right">{c.stack}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

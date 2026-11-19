import { ScrubText } from "../motion/Motion";
import { statement, strengths } from "@/lib/site";

/** The one paragraph that matters, lit word by word as you scroll. Strengths
 *  collapse to keyword chips — the detail lives in the work, not in prose. */
export default function Statement() {
  const rots = ["-2deg", "1.5deg", "-1deg", "2deg"];
  return (
    <section aria-label="Statement" className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 sm:py-28">
      <ScrubText
        text={statement}
        className="display max-w-6xl text-[clamp(2.4rem,6vw,5.6rem)] !leading-[0.98]"
      />

      <p className="scrawl mt-14 text-3xl text-muted">what I bring —</p>
      <ul className="mt-5 flex flex-wrap gap-3">
        {strengths.map((m, i) => (
          <li
            key={m.word}
            className="sticker display inline-block px-4 py-2 text-2xl sm:text-3xl"
            style={{ transform: `rotate(${rots[i % rots.length]})` }}
          >
            {m.word}
          </li>
        ))}
      </ul>
    </section>
  );
}

"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import Link from "next/link";
import SectionHeader from "./SectionHeader";
import { getGsap, reducedMotion } from "../motion/gsap";
import { caseStudies, type CaseStudy } from "@/lib/case-studies";

/**
 * Case studies as a pinned horizontal sequence on large screens: the section
 * pins and the panels slide sideways as you scroll. Stacks vertically on
 * small screens and with reduced motion.
 */
// Pin only on large screens with motion allowed; otherwise panels stack.
const PIN_QUERY = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(PIN_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const getPinned = () => window.matchMedia(PIN_QUERY).matches;

export default function SelectedWork() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const pinned = useSyncExternalStore(subscribe, getPinned, () => false);

  useEffect(() => {
    const el = section.current;
    const tr = track.current;
    if (!pinned || !el || !tr || reducedMotion()) return;
    const gsap = getGsap();
    const ctx = gsap.context(() => {
      const distance = () => tr.scrollWidth - window.innerWidth;
      gsap.to(tr, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
      // Progress bar
      gsap.fromTo(
        el.querySelector("[data-progress]"),
        { scaleX: 0 },
        { scaleX: 1, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: () => `+=${distance()}`, scrub: true } }
      );
    }, el);
    return () => ctx.revert();
  }, [pinned]);

  return (
    <section id="work" ref={section} className={`relative scroll-mt-0 overflow-hidden ${pinned ? "h-[100svh]" : ""}`}>
      <div className="flex h-full flex-col">
        <div className="mx-auto w-full max-w-[1280px] px-4 pt-24 sm:px-6 lg:pt-20">
          <SectionHeader
            index="01"
            label="Selected work"
            title={
              <>
                Case studies<span className="text-signal">.</span>
              </>
            }
            aside="Four systems I own end to end — the problem, the decisions and tradeoffs, and what I'd do next."
          />
        </div>

        <div
          ref={track}
          className={
            pinned
              ? "mt-[-2.5rem] flex w-max flex-1 flex-row items-stretch gap-8 pb-14 pl-[max(1.5rem,calc((100vw-1280px)/2+1.5rem))] pr-[10vw]"
              : "mx-auto flex w-full max-w-[1280px] flex-col gap-6 px-4 pb-20 sm:px-6"
          }
        >
          {caseStudies.map((cs) => (
            <Panel key={cs.slug} cs={cs} />
          ))}
        </div>

        <div className={`absolute inset-x-0 bottom-0 h-[3px] bg-line ${pinned ? "" : "hidden"}`}>
          <div data-progress className="h-full origin-left bg-signal" />
        </div>
      </div>
    </section>
  );
}

function Panel({ cs }: { cs: CaseStudy }) {
  const [a, b] = cs.title.split(cs.emphasis);
  return (
    <Link
      href={`/work/${cs.slug}`}
      className="group relative grid w-full shrink-0 overflow-hidden border hairline bg-surface transition-colors hover:border-fg/40 lg:grid-cols-[1.1fr_0.9fr] [.w-max_&]:w-[min(1080px,78vw)]"
    >
      <div className="flex flex-col p-6 sm:p-10">
        <p className="label">Case study {cs.index}</p>
        <h3 className="display mt-5 text-[clamp(2.4rem,4.6vw,4.4rem)]">
          {a}
          <span className="text-signal">{cs.emphasis}</span>
          {b}
        </h3>
        <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted">{cs.summary}</p>
        <dl className="mt-auto grid grid-cols-3 gap-4 border-t hairline pt-6">
          {cs.results.map((r) => (
            <div key={r.label} className="flex flex-col-reverse">
              <dt className="label mt-2 leading-5 !text-[0.65rem]">{r.label}</dt>
              <dd className="display text-[clamp(2rem,3.4vw,3.2rem)]">{r.value}</dd>
            </div>
          ))}
        </dl>
        <span className="label mt-8 inline-flex items-center gap-3 !text-fg">
          Read the case study
          <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-2">→</span>
        </span>
      </div>
      <div className="relative hidden min-h-[320px] border-l hairline bg-bg/40 lg:block">
        <PanelArt slug={cs.slug} />
      </div>
    </Link>
  );
}

/** A bold, simple diagram per case study — readable at a glance. */
export function PanelArt({ slug }: { slug: string }) {
  const stroke = "var(--color-line)";
  const fg = "var(--color-fg)";
  const signal = "var(--color-signal)";
  if (slug === "identity") {
    const products = [
      [70, 70],
      [330, 70],
      [70, 330],
      [330, 330],
    ];
    return (
      <svg viewBox="0 0 400 400" className="absolute inset-0 m-auto h-[80%] w-[80%]" aria-hidden="true">
        {products.map(([x, y], i) => (
          <g key={i}>
            <line x1={x} y1={y} x2={200} y2={200} stroke={signal} strokeWidth="1.5" strokeDasharray="4 6" />
            <rect x={x - 34} y={y - 34} width="68" height="68" fill="var(--color-surface)" stroke={stroke} strokeWidth="1.5" />
            <text x={x} y={y + 5} textAnchor="middle" fill={fg} fontSize="14" style={{ fontFamily: "var(--font-mono)" }}>
              P{i + 1}
            </text>
          </g>
        ))}
        <rect x="150" y="150" width="100" height="100" fill={signal} />
        <text x="200" y="207" textAnchor="middle" fill="#0b0b0c" fontSize="15" fontWeight="700" style={{ fontFamily: "var(--font-mono)" }}>
          ONE ID
        </text>
      </svg>
    );
  }
  if (slug === "platform-shell") {
    return (
      <div className="absolute inset-0 flex items-center justify-center p-10">
        <div className="w-full max-w-[340px] border border-signal p-4">
          <div className="flex justify-between font-mono text-[0.6rem] uppercase tracking-[0.12em] text-muted">
            <span className="text-signal">Shell</span>
            <span>nav · cart · money</span>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {["ID", "Game", "Vault"].map((c) => (
              <div key={c} className="flex aspect-[3/4] items-end border hairline bg-bg/60 p-2">
                <span className="display text-lg">{c}</span>
              </div>
            ))}
          </div>
          <div className="mt-2 bg-signal px-3 py-2 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-bg">Payment · platform</div>
        </div>
      </div>
    );
  }
  if (slug === "realtime-3d") {
    return (
      <div className="absolute inset-0 flex flex-col justify-center gap-4 px-12">
        {[
          ["High", "full detail · DPR 2", 100],
          ["Mid", "capped DPR", 66],
          ["Low", "static fallback", 33],
        ].map(([name, note, w], i) => (
          <div key={name as string}>
            <div className="flex items-baseline justify-between">
              <span className={`display text-3xl ${i === 0 ? "text-signal" : ""}`}>{name}</span>
              <span className="label">{note}</span>
            </div>
            <div className="mt-2 h-3 bg-line">
              <div className={`h-full ${i === 0 ? "bg-signal" : "bg-fg/30"}`} style={{ width: `${w}%` }} />
            </div>
          </div>
        ))}
        <p className="display mt-4 text-5xl">
          28→61 <span className="label align-middle">FPS on low-end GPUs</span>
        </p>
      </div>
    );
  }
  // design-architecture: the layer stack
  return (
    <div className="absolute inset-0 flex flex-col justify-center gap-2 px-10">
      {["Screens", "Primitives", "Materials", "Tokens", "Skin"].map((l, i) => (
        <div
          key={l}
          className={`border px-4 py-3 ${i === 4 ? "border-signal bg-signal text-bg" : "hairline bg-bg/50"}`}
          style={{ marginInline: `${i * 4}%` }}
        >
          <span className="display text-2xl">{l}</span>
        </div>
      ))}
    </div>
  );
}

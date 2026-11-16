"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import SectionHeader from "./SectionHeader";
import { getGsap, reducedMotion, scrollToY, ScrollTrigger } from "../motion/gsap";
import { featuredCaseStudies as caseStudies, type CaseStudy } from "@/lib/case-studies";

/**
 * Case studies as a pinned "stage" on large screens. Vertical scroll (or a
 * sideways trackpad swipe) moves the panels horizontally; the panel in front
 * is sharp, its neighbours dim and blur. Numbered markers, arrows and a hint
 * make the sideways movement obvious. Stacks vertically on small screens and
 * with reduced motion.
 */
const PIN_QUERY = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(PIN_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const getPinned = () => window.matchMedia(PIN_QUERY).matches;

const N = caseStudies.length;

export default function SelectedWork() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  const pinned = useSyncExternalStore(subscribe, getPinned, () => false);
  const [active, setActive] = useState(0);
  const [moved, setMoved] = useState(false);

  useEffect(() => {
    const el = section.current;
    const tr = track.current;
    if (!pinned || !el || !tr || reducedMotion()) return;
    const gsap = getGsap();
    const panels = Array.from(tr.querySelectorAll<HTMLElement>("[data-panel]"));
    const bar = el.querySelector<HTMLElement>("[data-progress]");

    // Depth of focus: the panel nearest the centre is sharp, others recede.
    const paint = (progress: number) => {
      const pos = progress * (N - 1);
      panels.forEach((p, i) => {
        const d = Math.min(Math.abs(i - pos), 1);
        gsap.set(p, { opacity: 1 - d * 0.6, scale: 1 - d * 0.07, filter: `blur(${(d * 3).toFixed(2)}px)` });
      });
      if (bar) gsap.set(bar, { scaleX: progress });
      const idx = Math.round(pos);
      setActive((a) => (a === idx ? a : idx));
      if (progress > 0.02) setMoved(true);
    };

    const ctx = gsap.context(() => {
      const distance = () => tr.scrollWidth - window.innerWidth;
      const tween = gsap.to(tr, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          // A little extra scroll per panel so each one gets a beat on screen.
          end: () => `+=${distance() * 1.25}`,
          pin: true,
          scrub: 0.7,
          invalidateOnRefresh: true,
          onUpdate: (self) => paint(self.progress),
          onRefresh: (self) => paint(self.progress),
        },
      });
      trigger.current = tween.scrollTrigger ?? null;
      paint(0);
    }, el);

    // When scrolling stops inside the stage, settle on the nearest panel
    // (through Lenis — GSAP's own snap fights the smooth scroller).
    const inside = (st: ScrollTrigger) => window.scrollY > st.start + 2 && window.scrollY < st.end - 2;
    const onScrollEnd = () => {
      const st = trigger.current;
      if (!st || !inside(st)) return;
      const nearest = Math.round(st.progress * (N - 1));
      const y = st.start + (st.end - st.start) * (nearest / (N - 1));
      if (Math.abs(window.scrollY - y) > 4) scrollToY(y);
    };
    ScrollTrigger.addEventListener("scrollEnd", onScrollEnd);

    // A sideways trackpad swipe moves the stage too.
    const onWheel = (e: WheelEvent) => {
      const st = trigger.current;
      if (!st || window.scrollY < st.start - 2 || window.scrollY > st.end + 2) return;
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      scrollToY(window.scrollY + e.deltaX * 1.6, true);
    };
    el.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      el.removeEventListener("wheel", onWheel);
      ScrollTrigger.removeEventListener("scrollEnd", onScrollEnd);
      trigger.current = null;
      ctx.revert();
    };
  }, [pinned]);

  /** Jump to panel i (markers, arrows, keyboard). */
  const go = useCallback((i: number) => {
    const st = trigger.current;
    const target = Math.max(0, Math.min(N - 1, i));
    if (!st) return;
    scrollToY(st.start + (st.end - st.start) * (target / (N - 1)));
  }, []);

  return (
    <section
      id="work"
      ref={section}
      aria-roledescription={pinned ? "carousel" : undefined}
      aria-label="Selected work"
      className={`relative scroll-mt-0 overflow-hidden ${pinned ? "h-[100svh]" : ""}`}
      onKeyDown={(e) => {
        if (!pinned) return;
        if (e.key === "ArrowRight") { e.preventDefault(); go(active + 1); }
        if (e.key === "ArrowLeft") { e.preventDefault(); go(active - 1); }
      }}
    >
      <div className="flex h-full flex-col">
        <div className={`mx-auto w-full max-w-[1280px] px-4 sm:px-6 ${pinned ? "pt-20" : "pt-24"}`}>
          <SectionHeader
            index="01"
            label="Selected work"
            compact={pinned}
            title={
              <>
                Case studies<span className="text-signal">.</span>
              </>
            }
            aside="Four problems from across my work — the decisions, the tradeoffs, and what I'd do next."
          />
        </div>

        {/* The stage */}
        <div className={pinned ? "relative min-h-0 flex-1" : ""}>
          <div
            ref={track}
            className={
              pinned
                ? "flex h-full w-max flex-row items-stretch gap-10 px-[calc((100vw-min(1080px,76vw))/2)] py-4"
                : "mx-auto flex w-full max-w-[1280px] flex-col gap-6 px-4 pb-20 sm:px-6"
            }
          >
            {caseStudies.map((cs, i) => (
              <Panel key={cs.slug} cs={cs} pinned={pinned} label={`${i + 1} of ${N}`} />
            ))}
          </div>

          {pinned && (
            <>
              {/* Soft edges: the stage reads as a window you look through */}
              <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-[12vw] bg-gradient-to-r from-bg to-transparent" />
              <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-[12vw] bg-gradient-to-l from-bg to-transparent" />
              <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-bg to-transparent backdrop-blur-[2px] [mask-image:linear-gradient(to_bottom,#000,transparent)]" />
              <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-bg to-transparent backdrop-blur-[2px] [mask-image:linear-gradient(to_top,#000,transparent)]" />
            </>
          )}
        </div>

        {/* Controls: markers · hint · arrows */}
        {pinned && (
          <div className="relative z-10 mx-auto flex w-full max-w-[1280px] items-center justify-between gap-6 px-6 pb-6 pt-3">
            <ol className="flex items-center gap-2" aria-label="Case studies">
              {caseStudies.map((cs, i) => (
                <li key={cs.slug}>
                  <button
                    type="button"
                    onClick={() => go(i)}
                    aria-label={`Go to case study ${i + 1}: ${cs.title}`}
                    aria-current={active === i ? "step" : undefined}
                    className={`group flex h-11 cursor-pointer items-center gap-2 border px-3 font-mono text-[0.72rem] tracking-[0.1em] transition-colors ${
                      active === i ? "border-signal bg-signal text-bg" : "hairline text-muted hover:border-fg/40 hover:text-fg"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                    <span className={`overflow-hidden whitespace-nowrap uppercase transition-all duration-300 ${active === i ? "max-w-[14rem]" : "max-w-0"}`}>
                      {cs.where}
                    </span>
                  </button>
                </li>
              ))}
            </ol>

            <p className={`label hidden items-center gap-3 transition-opacity duration-500 xl:flex ${moved ? "opacity-50" : "opacity-100"}`} aria-hidden="true">
              <span className="inline-flex h-7 w-4 items-start justify-center rounded-full border border-fg/40 pt-1">
                <span className="h-1.5 w-0.5 animate-bounce bg-signal motion-reduce:animate-none" />
              </span>
              Scroll ↓ or swipe ← → to move through
            </p>

            <div className="flex items-center gap-3">
              <span className="label tabular-nums !text-fg" aria-live="polite">
                {String(active + 1).padStart(2, "0")} <span className="text-muted">/ {String(N).padStart(2, "0")}</span>
              </span>
              <button type="button" onClick={() => go(active - 1)} disabled={active === 0} aria-label="Previous case study" className="flex h-11 w-11 cursor-pointer items-center justify-center border hairline transition-colors hover:border-fg disabled:cursor-default disabled:opacity-30">
                ←
              </button>
              <button type="button" onClick={() => go(active + 1)} disabled={active === N - 1} aria-label="Next case study" className="flex h-11 w-11 cursor-pointer items-center justify-center border hairline transition-colors hover:border-fg disabled:cursor-default disabled:opacity-30">
                →
              </button>
            </div>
          </div>
        )}

        <div className={`absolute inset-x-0 bottom-0 h-[3px] bg-line ${pinned ? "" : "hidden"}`}>
          <div data-progress className="h-full origin-left scale-x-0 bg-signal" />
        </div>
      </div>
    </section>
  );
}

function Panel({ cs, pinned, label }: { cs: CaseStudy; pinned: boolean; label: string }) {
  const [a, b] = cs.title.split(cs.emphasis);
  return (
    <Link
      data-panel
      href={`/work/${cs.slug}`}
      aria-roledescription={pinned ? "slide" : undefined}
      aria-label={`${label}: ${cs.title}`}
      className={`group relative grid shrink-0 overflow-hidden border hairline bg-surface transition-[border-color] hover:border-fg/40 lg:grid-cols-[1.1fr_0.9fr] ${
        pinned ? "w-[min(1080px,76vw)] will-change-transform" : "w-full"
      }`}
    >
      <div className="flex flex-col p-6 sm:p-9">
        <p className="label flex flex-wrap gap-x-3">
          <span>Case study {cs.index}</span>
          <span className="!text-signal">{cs.where}</span>
        </p>
        <h3 className="display mt-4 text-[clamp(2.2rem,4vw,4rem)]">
          {a}
          <span className="text-signal">{cs.emphasis}</span>
          {b}
        </h3>
        <p className="mt-4 line-clamp-3 max-w-lg text-lg leading-relaxed text-muted">{cs.summary}</p>
        <dl className="mt-auto grid grid-cols-3 gap-4 border-t hairline pt-5">
          {cs.results.map((r) => (
            <div key={r.label} className="flex flex-col-reverse">
              <dt className="label mt-2 leading-5 !text-[0.65rem]">{r.label}</dt>
              <dd className="display text-[clamp(2rem,3.2vw,3rem)]">{r.value}</dd>
            </div>
          ))}
        </dl>
        <span className="label mt-6 inline-flex items-center gap-3 !text-fg">
          Read the case study
          <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-2">→</span>
        </span>
      </div>
      <div className="relative hidden min-h-[300px] border-l hairline bg-bg/40 lg:block">
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
  if (slug === "ai-helpdesk") {
    return (
      <div className="absolute inset-0 flex flex-col justify-center gap-2 px-10">
        {[
          ["Model", "proposes a tool call", false],
          ["Code", "checks role · validates input", true],
          ["Tool", "runs · streams the step", false],
          ["Model", "explains in plain words", false],
        ].map(([who, what, sig], i) => (
          <div key={i} className={`flex items-center justify-between border px-4 py-3 ${sig ? "border-signal bg-signal text-bg" : "hairline bg-bg/50"}`}>
            <span className="display text-2xl">{who as string}</span>
            <span className={`font-mono text-[0.62rem] uppercase tracking-[0.1em] ${sig ? "text-bg/80" : "text-muted"}`}>{what as string}</span>
          </div>
        ))}
      </div>
    );
  }
  if (slug === "native-crm") {
    return (
      <div className="absolute inset-0 flex items-center justify-center gap-6">
        {["iOS", "Android"].map((os, i) => (
          <div key={os} className={`flex h-[260px] w-[130px] flex-col border-[3px] p-3 ${i === 0 ? "border-signal" : "border-line"}`} style={{ borderRadius: 22 }}>
            <div className="mx-auto h-1.5 w-10 bg-line" style={{ borderRadius: 4 }} />
            <p className="label mt-4 !text-[0.55rem]">Today</p>
            <div className="mt-2 space-y-1.5">
              {[0, 1, 2].map((k) => (
                <div key={k} className="h-6 border hairline bg-bg/60" />
              ))}
            </div>
            <div className="mt-auto bg-signal py-1.5 text-center font-mono text-[0.55rem] uppercase tracking-[0.1em] text-bg">Check in</div>
            <p className="display mt-2 text-center text-lg">{os}</p>
          </div>
        ))}
      </div>
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

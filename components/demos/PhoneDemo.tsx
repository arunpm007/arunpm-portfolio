"use client";

import { useEffect, useRef, useState } from "react";
import MiniCard from "./MiniCard";

const CARDS = [
  { name: "Zenith", rarity: "Legendary", serial: "001", power: 94, set: "Origins" },
  { name: "Aurora", rarity: "Rare", serial: "214", power: 71, set: "Origins" },
  { name: "Ember", rarity: "Epic", serial: "087", power: 83, set: "Firestorm" },
  { name: "Tidal", rarity: "Common", serial: "512", power: 48, set: "Deepwater" },
  { name: "Nova", rarity: "Legendary", serial: "777", power: 97, set: "Starfall" },
];

/**
 * A phone mock with a real swipeable card carousel (scroll-snap, works with
 * touch, trackpad and the arrow buttons) and a bottom sheet.
 */
export default function PhoneDemo() {
  const rail = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [sheet, setSheet] = useState(false);

  // Track which card is nearest the centre of the rail.
  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const mid = el.scrollLeft + el.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      el.querySelectorAll<HTMLElement>("[data-i]").forEach((c) => {
        const d = Math.abs(c.offsetLeft + c.clientWidth / 2 - mid);
        if (d < bestDist) {
          bestDist = d;
          best = Number(c.dataset.i);
        }
      });
      setActive(best);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const go = (i: number) => {
    const el = rail.current;
    const target = el?.querySelector<HTMLElement>(`[data-i="${Math.max(0, Math.min(CARDS.length - 1, i))}"]`);
    if (el && target) el.scrollTo({ left: target.offsetLeft - (el.clientWidth - target.clientWidth) / 2, behavior: "smooth" });
  };

  const card = CARDS[active];

  return (
    <div className="mx-auto w-[min(300px,80vw)]">
      <div className="relative aspect-[9/19] overflow-hidden rounded-[44px] border-[6px] border-[#2a2a30] bg-[#0b0b0d] shadow-[0_50px_100px_-30px_rgba(0,0,0,0.9),inset_0_0_0_1px_rgba(255,255,255,0.06)]">
        {/* Dynamic island */}
        <div className="absolute left-1/2 top-2.5 z-30 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />

        {/* App */}
        <div className="flex h-full flex-col pt-12">
          <div className="flex items-center justify-between px-5">
            <div>
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-faint">My collection</p>
              <p className="mt-1 text-lg font-semibold">5 cards</p>
            </div>
            <div className="flex h-8 w-8 items-center justify-center border hairline text-xs text-muted">AP</div>
          </div>

          <div
            ref={rail}
            className="no-scrollbar mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain px-[18%] pb-4"
            aria-label="Card carousel — swipe sideways"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") go(active + 1);
              if (e.key === "ArrowLeft") go(active - 1);
            }}
          >
            {CARDS.map((c, i) => (
              <div
                key={c.name}
                data-i={i}
                className={`w-[64%] shrink-0 snap-center transition-transform duration-300 ${i === active ? "scale-100" : "scale-[0.9] opacity-60"}`}
              >
                <MiniCard name={c.name} rarity={c.rarity} serial={c.serial} tilt={false} />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-1.5" aria-hidden="true">
            {CARDS.map((c, i) => (
              <span key={c.name} className={`h-1 transition-all ${i === active ? "w-6 bg-signal" : "w-2 bg-fg/25"}`} />
            ))}
          </div>

          <div className="mt-5 px-5">
            <p className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-faint">Recent pulls</p>
            <ul className="mt-2 divide-y divide-border">
              {[CARDS[4], CARDS[2]].map((c, i) => (
                <li key={c.name} className="flex items-center justify-between py-2.5 text-sm">
                  <span className="flex items-center gap-2.5">
                    <span className="h-7 w-5 rounded-[4px] border border-fg/15 bg-[linear-gradient(140deg,#4a4a50,#1c1c20)]" />
                    {c.name}
                  </span>
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-faint">{i === 0 ? "2m ago" : "1h ago"}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-auto px-5 pb-6">
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => go(active - 1)} aria-label="Previous card" className="flex h-11 w-11 cursor-pointer items-center justify-center border hairline text-muted transition-colors hover:text-fg">←</button>
              <button
                type="button"
                onClick={() => setSheet(true)}
                className="btn btn-signal !min-h-11 flex-1 cursor-pointer justify-center !px-2"
              >
                <span>View {card.name}</span>
              </button>
              <button type="button" onClick={() => go(active + 1)} aria-label="Next card" className="flex h-11 w-11 cursor-pointer items-center justify-center border hairline text-muted transition-colors hover:text-fg">→</button>
            </div>
            <p className="mt-3 text-center font-mono text-[0.55rem] uppercase tracking-[0.2em] text-faint">Swipe the cards</p>
          </div>
        </div>

        {/* Bottom sheet */}
        <div
          className={`absolute inset-0 z-20 bg-black/50 transition-opacity duration-300 ${sheet ? "opacity-100" : "pointer-events-none opacity-0"}`}
          onClick={() => setSheet(false)}
          aria-hidden="true"
        />
        <div
          role="dialog"
          aria-label={`${card.name} details`}
          aria-hidden={!sheet}
          className={`absolute inset-x-0 bottom-0 z-20 border-t hairline bg-surface px-5 pb-8 pt-3 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${sheet ? "translate-y-0" : "translate-y-full"}`}
        >
          <div className="mx-auto h-1 w-10 rounded-full bg-fg/25" />
          <div className="mt-4 flex items-baseline justify-between">
            <p className="display text-4xl">{card.name}</p>
            <p className="label">#{card.serial}</p>
          </div>
          <dl className="mt-4 grid grid-cols-3 gap-2 text-center">
            {[
              ["Rarity", card.rarity],
              ["Power", String(card.power)],
              ["Set", card.set],
            ].map(([k, v]) => (
              <div key={k} className="border hairline py-3">
                <dt className="font-mono text-[0.5rem] uppercase tracking-[0.18em] text-faint">{k}</dt>
                <dd className="mt-1 text-sm">{v}</dd>
              </div>
            ))}
          </dl>
          <button
            type="button"
            tabIndex={sheet ? 0 : -1}
            onClick={() => setSheet(false)}
            className="btn mt-4 w-full cursor-pointer justify-center"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useRef } from "react";
import { card } from "./cardContent";

/**
 * The same card in HTML + CSS (titanium + signal edge). Shown on devices that
 * get no WebGL, for reduced motion, and while the WebGL card loads.
 */
export default function HoloCardHTML({ flipped, interactive }: { flipped: boolean; interactive: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    if (!interactive || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.setProperty("--rx", `${-y * 14}deg`);
    ref.current.style.setProperty("--ry", `${x * 18}deg`);
    ref.current.style.setProperty("--gx", `${(x + 0.5) * 100}%`);
  };
  const onLeave = () => {
    ref.current?.style.setProperty("--rx", "0deg");
    ref.current?.style.setProperty("--ry", "0deg");
  };

  return (
    <div className="[perspective:1400px]" onPointerMove={onMove} onPointerLeave={onLeave}>
      <div
        ref={ref}
        className="relative aspect-[5/7] w-full transition-transform duration-700 ease-out [transform-style:preserve-3d]"
        style={{ transform: `rotateX(var(--rx, 0deg)) rotateY(calc(var(--ry, 0deg) + ${flipped ? 180 : 0}deg))` }}
      >
        <Face>
          <div className="label flex items-center justify-between !text-[0.6rem]">
            <span>{card.edition}</span>
            <span>{card.serial}</span>
          </div>
          <div className="mt-3 h-px bg-fg/15" />
          <div className="mt-4 h-[9%] w-[12%] bg-[linear-gradient(135deg,#6b6b70,#2b2b30)]" />
          <Emblem />
          <div className="mt-auto">
            <p className="display text-[clamp(2.6rem,6vw,3.8rem)]">{card.name}</p>
            <p className="mt-2 text-[clamp(0.75rem,1.3vw,0.95rem)] text-muted">{card.role}</p>
            <div className="mt-4 flex items-center gap-3">
              <span className="h-1 w-16 bg-signal" />
              <span className="h-px flex-1 bg-fg/15" />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {card.stats.map((s) => (
                <div key={s.label}>
                  <p className="display text-[clamp(1.4rem,2.6vw,2rem)]">{s.value}</p>
                  <p className="label mt-1 !text-[0.55rem]">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="label mt-5 flex justify-between !text-[0.55rem]">
              <span>{card.footerLeft}</span>
              <span>{card.footerRight}</span>
            </div>
          </div>
        </Face>

        <Face back>
          <div className="label flex items-center justify-between !text-[0.6rem]">
            <span>{card.back.title}</span>
            <span>{card.serial}</span>
          </div>
          <div className="mt-3 h-px bg-fg/15" />
          <dl className="mt-4 space-y-3">
            {card.back.rows.map((row) => (
              <div key={row.label} className="border-b border-fg/10 pb-2">
                <dt className="label !text-[0.55rem]">{row.label}</dt>
                <dd className="mt-1 text-[clamp(0.8rem,1.4vw,1rem)]">{row.value}</dd>
              </div>
            ))}
          </dl>
        </Face>
      </div>
    </div>
  );
}

function Face({ children, back = false }: { children: React.ReactNode; back?: boolean }) {
  return (
    <div
      className="absolute inset-0 flex flex-col overflow-hidden rounded-[3%/2.2%] border border-signal/70 bg-[linear-gradient(160deg,#2a2a2e,#17171a_50%,#0d0d0f)] p-[7%] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,90,31,0.25)] [backface-visibility:hidden]"
      style={back ? { transform: "rotateY(180deg)" } : undefined}
    >
      {/* Brushed metal streaks + a highlight band that follows the pointer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.025) 0 1px, transparent 1px 3px), linear-gradient(105deg, transparent calc(var(--gx,30%) - 20%), rgba(255,255,255,0.12) var(--gx,30%), transparent calc(var(--gx,30%) + 20%))",
        }}
      />
      <div className="relative flex h-full flex-col">{children}</div>
    </div>
  );
}

// Round so server and browser render identical SVG coordinates.
const r2 = (n: number) => Math.round(n * 100) / 100;

function Emblem() {
  const rings = Array.from({ length: 8 }, (_, i) => 22 + i * 9);
  const rays = Array.from({ length: 48 }, (_, i) => (i / 48) * Math.PI * 2);
  return (
    <svg viewBox="0 0 200 200" className="mx-auto mt-2 w-[62%] opacity-60" aria-hidden="true">
      <g fill="none" stroke="#9c978c" strokeWidth="0.6">
        {rings.map((r) => (
          <circle key={r} cx="100" cy="100" r={r} />
        ))}
        {rays.map((a) => (
          <line key={a} x1={r2(100 + Math.cos(a) * 22)} y1={r2(100 + Math.sin(a) * 22)} x2={r2(100 + Math.cos(a) * 85)} y2={r2(100 + Math.sin(a) * 85)} />
        ))}
      </g>
      <circle cx="100" cy="100" r="22" fill="none" stroke="#ff5a1f" strokeWidth="1.2" />
    </svg>
  );
}

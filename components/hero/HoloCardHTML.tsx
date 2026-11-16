"use client";

import { useRef } from "react";
import { card } from "./cardContent";

/**
 * The same card in HTML + CSS. Shown on devices that get no WebGL, for
 * reduced motion, and as the placeholder while the WebGL card loads.
 */
export default function HoloCardHTML({
  flipped,
  interactive,
}: {
  flipped: boolean;
  interactive: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    if (!interactive || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.setProperty("--rx", `${-y * 14}deg`);
    ref.current.style.setProperty("--ry", `${x * 18}deg`);
    ref.current.style.setProperty("--gx", `${(x + 0.5) * 100}%`);
    ref.current.style.setProperty("--gy", `${(y + 0.5) * 100}%`);
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
        style={{
          transform: `rotateX(var(--rx, 0deg)) rotateY(calc(var(--ry, 0deg) + ${flipped ? 180 : 0}deg))`,
        }}
      >
        <Face>
          <div className="flex items-center justify-between label !text-[0.6rem] sm:!text-[0.68rem]">
            <span>{card.edition}</span>
            <span>{card.serial}</span>
          </div>
          <div className="mt-3 h-px bg-fg/15" />
          <div className="mt-4 h-[9%] w-[12%] rounded-md [background:var(--holo)] opacity-80" />
          <Emblem />
          <div className="mt-auto">
            <p className="font-display text-[clamp(2.2rem,5.4vw,3.4rem)] italic leading-none">{card.name}</p>
            <p className="mt-2 text-[clamp(0.75rem,1.3vw,0.95rem)] text-muted">{card.role}</p>
            <div className="mt-4 h-px [background:var(--holo)] opacity-70" />
            <div className="mt-4 grid grid-cols-3 gap-2">
              {card.stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-[clamp(1.2rem,2.4vw,1.7rem)] leading-none">{s.value}</p>
                  <p className="label mt-1 !text-[0.58rem]">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="label mt-6 flex justify-between !text-[0.58rem]">
              <span>{card.footerLeft}</span>
              <span>{card.footerRight}</span>
            </div>
          </div>
        </Face>

        <Face back>
          <div className="flex items-center justify-between label !text-[0.6rem] sm:!text-[0.68rem]">
            <span>{card.back.title}</span>
            <span>{card.serial}</span>
          </div>
          <div className="mt-3 h-px bg-fg/15" />
          <dl className="mt-4 space-y-3">
            {card.back.rows.map((row) => (
              <div key={row.label} className="border-b border-fg/10 pb-2">
                <dt className="label !text-[0.58rem]">{row.label}</dt>
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
      className="absolute inset-0 flex flex-col overflow-hidden rounded-[4.5%/3.2%] border border-fg/15 bg-[linear-gradient(160deg,#1c1c21,#111114_55%,#0b0b0d)] p-[7%] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] [backface-visibility:hidden]"
      style={back ? { transform: "rotateY(180deg)" } : undefined}
    >
      {/* Foil sheen that follows the pointer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-screen"
        style={{
          background:
            "radial-gradient(circle at var(--gx,30%) var(--gy,25%), rgba(255,255,255,0.5), transparent 45%), var(--holo)",
        }}
      />
      <div className="relative flex h-full flex-col">{children}</div>
    </div>
  );
}

function Emblem() {
  const rings = Array.from({ length: 8 }, (_, i) => 22 + i * 9);
  const rays = Array.from({ length: 48 }, (_, i) => (i / 48) * Math.PI * 2);
  return (
    <svg viewBox="0 0 200 200" className="mx-auto mt-2 w-[62%] opacity-70" aria-hidden="true">
      <defs>
        <linearGradient id="emblem-holo" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#9ff2d8" />
          <stop offset="0.35" stopColor="#a9c4ff" />
          <stop offset="0.65" stopColor="#d8b4ff" />
          <stop offset="1" stopColor="#ffc7a6" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#emblem-holo)" strokeWidth="0.6">
        {rings.map((r) => (
          <circle key={r} cx="100" cy="100" r={r} />
        ))}
        {rays.map((a) => (
          <line
            key={a}
            x1={100 + Math.cos(a) * 22}
            y1={100 + Math.sin(a) * 22}
            x2={100 + Math.cos(a) * 85}
            y2={100 + Math.sin(a) * 85}
          />
        ))}
      </g>
    </svg>
  );
}

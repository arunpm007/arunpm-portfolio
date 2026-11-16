"use client";

import { useRef } from "react";

// Round so server and browser render identical SVG coordinates.
const r2 = (n: number) => Math.round(n * 100) / 100;

const RARITY_HUE: Record<string, number> = {
  Legendary: 0,
  Epic: 70,
  Rare: 170,
  Common: 230,
};

/**
 * A small holographic collectible card in pure CSS: pointer tilt, a foil band
 * and a glare, all driven by CSS variables (no React re-render per frame).
 */
export default function MiniCard({
  name,
  rarity = "Legendary",
  serial = "001",
  tilt = true,
  className = "",
  children,
}: {
  name: string;
  rarity?: keyof typeof RARITY_HUE | string;
  serial?: string;
  tilt?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!tilt || !el || e.pointerType === "touch") return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--rx", `${(0.5 - y) * 18}deg`);
    el.style.setProperty("--ry", `${(x - 0.5) * 22}deg`);
    el.style.setProperty("--gx", `${x * 100}%`);
    el.style.setProperty("--gy", `${y * 100}%`);
    el.style.setProperty("--fp", `${x * 100}%`);
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <div className={`[perspective:900px] ${className}`} onPointerMove={onMove} onPointerLeave={onLeave}>
      <div
        ref={ref}
        className="mini-card relative aspect-[5/7] w-full overflow-hidden rounded-[3%/2%] border border-fg/20 shadow-[0_24px_50px_-20px_rgba(0,0,0,0.9)]"
        style={{ "--hue": `${RARITY_HUE[rarity] ?? 0}deg` } as React.CSSProperties}
      >
        <div className="absolute inset-0 bg-[linear-gradient(160deg,#2a2a2e,#17171a_50%,#0d0d0f)]" />
        <svg viewBox="0 0 100 140" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <g fill="none" stroke="rgba(237,236,231,0.16)" strokeWidth="0.5">
            {[10, 15, 20, 25, 30, 35].map((r) => (
              <circle key={r} cx="50" cy="56" r={r} />
            ))}
            {Array.from({ length: 24 }, (_, i) => {
              const a = (i / 24) * Math.PI * 2;
              return (
                <line key={i} x1={r2(50 + Math.cos(a) * 10)} y1={r2(56 + Math.sin(a) * 10)} x2={r2(50 + Math.cos(a) * 35)} y2={r2(56 + Math.sin(a) * 35)} />
              );
            })}
          </g>
        </svg>
        {/* Foil band + glare */}
        <div className="mini-foil absolute inset-0" aria-hidden="true" />
        <div className="mini-glare absolute inset-0" aria-hidden="true" />

        <div className="absolute inset-0 flex flex-col p-[9%]">
          <div className="flex justify-between font-mono text-[0.55rem] uppercase tracking-[0.18em] text-fg/60">
            <span>{rarity}</span>
            <span>#{serial}</span>
          </div>
          <div className="mt-auto">
            <p className="display truncate text-[clamp(1.3rem,2.6vw,1.9rem)] text-fg">
              {name || "yourname"}
            </p>
            <div className="mt-2 flex items-center gap-1.5"><span className="h-[3px] w-6 bg-signal" /><span className="h-px flex-1 bg-fg/20" /></div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

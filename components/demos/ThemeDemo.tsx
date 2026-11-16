"use client";

import { useState } from "react";

/** Four brand themes. Components below read only these CSS variables. */
const THEMES = [
  { name: "Identity", accent: "#ff5a1f", surface: "#141416", text: "#ece8df", radius: "2px", font: "var(--font-display)" },
  { name: "Payments", accent: "#2f6bff", surface: "#0f1420", text: "#e6ecf7", radius: "10px", font: "var(--font-sans)" },
  { name: "Gaming", accent: "#c8ff00", surface: "#101010", text: "#f2f2f2", radius: "0px", font: "var(--font-display)" },
  { name: "Collectibles", accent: "#e8c07d", surface: "#17130e", text: "#f3ead9", radius: "16px", font: "var(--font-sans)" },
];

/**
 * Runtime theming, live: pick a brand and the same component re-skins via
 * CSS variables — no rebuild, no forked component.
 */
export default function ThemeDemo() {
  const [i, setI] = useState(0);
  const t = THEMES[i];

  return (
    <div className="flex h-full flex-col gap-6 p-6 sm:p-8">
      <div role="radiogroup" aria-label="Brand theme" className="grid grid-cols-2 gap-2">
        {THEMES.map((th, j) => (
          <button
            key={th.name}
            role="radio"
            aria-checked={i === j}
            onClick={() => setI(j)}
            className={`flex min-h-11 cursor-pointer items-center gap-2 border px-3 text-left font-mono text-[0.68rem] uppercase tracking-[0.1em] transition-colors ${
              i === j ? "border-fg text-fg" : "hairline text-muted hover:text-fg"
            }`}
          >
            <span className="h-3 w-3 shrink-0" style={{ background: th.accent }} />
            {th.name}
          </button>
        ))}
      </div>

      {/* The component: reads tokens only */}
      <div
        className="flex-1 border p-6 transition-colors duration-500"
        style={
          {
            "--t-accent": t.accent,
            "--t-surface": t.surface,
            "--t-text": t.text,
            "--t-radius": t.radius,
            background: "var(--t-surface)",
            color: "var(--t-text)",
            borderColor: "color-mix(in srgb, var(--t-text) 15%, transparent)",
            borderRadius: "var(--t-radius)",
          } as React.CSSProperties
        }
      >
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] opacity-60">Sign in · {t.name}</p>
        <p className="mt-3 text-3xl font-bold uppercase leading-none" style={{ fontFamily: t.font }}>
          Welcome back
        </p>
        <div
          className="mt-5 flex h-11 items-center px-4 text-sm opacity-80"
          style={{ border: "1px solid color-mix(in srgb, var(--t-text) 20%, transparent)", borderRadius: "var(--t-radius)" }}
        >
          you@example.com
        </div>
        <div
          className="mt-3 flex h-11 items-center justify-center text-sm font-semibold transition-colors duration-500"
          style={{ background: "var(--t-accent)", color: t.surface, borderRadius: "var(--t-radius)" }}
        >
          Continue
        </div>
      </div>
      <p className="label">Same component · four themes · zero rebuilds</p>
    </div>
  );
}

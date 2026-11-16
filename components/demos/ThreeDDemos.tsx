"use client";

import { useEffect, useState } from "react";
import MiniCard from "./MiniCard";
import { useGpuInfo, type Tier } from "../three/useDeviceTier";

/** Holographic cards: three cards in a fan, each tilts under the pointer. */
export function TiltDemo() {
  return (
    <div className="relative flex h-full min-h-[260px] w-full items-center justify-center py-6">
      <div className="relative flex w-full max-w-[360px] items-end justify-center">
        <MiniCard name="Aurora" rarity="Rare" serial="214" className="-mr-10 w-[34%] rotate-[-9deg] translate-y-3" />
        <MiniCard name="Zenith" rarity="Legendary" serial="001" className="relative z-10 w-[40%]" />
        <MiniCard name="Ember" rarity="Epic" serial="087" className="-ml-10 w-[34%] rotate-[9deg] translate-y-3" />
      </div>
    </div>
  );
}

/** Type-to-mint: the name you type appears on the card, then mints. */
export function MintDemo() {
  const [name, setName] = useState("");
  const [state, setState] = useState<"idle" | "minting" | "done">("idle");

  useEffect(() => {
    if (state === "idle") return;
    const t = setTimeout(() => setState(state === "minting" ? "done" : "idle"), state === "minting" ? 1100 : 1800);
    return () => clearTimeout(t);
  }, [state]);

  return (
    <div className="grid h-full items-center gap-6 py-6 sm:grid-cols-[minmax(0,1fr)_132px]">
      <form
        className="order-2 sm:order-1"
        onSubmit={(e) => {
          e.preventDefault();
          if (state === "idle") setState("minting");
        }}
      >
        <label htmlFor="mint-name" className="label">Type a name</label>
        <div className="mt-3 flex items-center gap-2 border hairline bg-bg/60 p-1.5 pl-5 focus-within:border-fg/40">
          <input
            id="mint-name"
            value={name}
            onChange={(e) => setName(e.target.value.replace(/[^a-zA-Z0-9-]/g, "").slice(0, 14).toLowerCase())}
            placeholder="yourname"
            autoComplete="off"
            className="w-0 min-w-0 flex-1 bg-transparent font-mono text-sm outline-none placeholder:text-faint"
          />
          <button
            type="submit"
            disabled={state !== "idle"}
            className="btn btn-signal !min-h-9 shrink-0 cursor-pointer !px-4 disabled:cursor-default"
          >
            <span>{state === "done" ? "Minted ✓" : state === "minting" ? "Minting…" : "Mint"}</span>
          </button>
        </div>
        <p className="mt-3 text-xs text-faint">Letters, numbers and dashes. Nothing is saved.</p>
      </form>
      <div className="order-1 mx-auto w-[132px] sm:order-2">
        <MiniCard name={name} rarity="Legendary" serial={state === "done" ? "NEW" : "—"}>
          {state === "minting" && <div className="mint-scan absolute inset-0" aria-hidden="true" />}
          {state === "done" && <div className="mint-flash absolute inset-0" aria-hidden="true" />}
        </MiniCard>
      </div>
    </div>
  );
}

/** Pack opening: click the pack, it splits and the card rises out. */
export function PackDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex h-full min-h-[320px] flex-col items-center justify-end gap-8 pb-6 pt-14">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-pressed={open}
        aria-label={open ? "Close the pack" : "Open the pack"}
        className={`pack relative h-[190px] w-[130px] cursor-pointer ${open ? "is-open" : ""}`}
      >
        <div className="pack-card absolute inset-x-[8%] top-[6%]">
          <MiniCard name="Nova" rarity="Legendary" serial="777" tilt={false} />
        </div>
        <div className="pack-half pack-top absolute inset-x-0 top-0 h-[38%]" />
        <div className="pack-half pack-bottom absolute inset-x-0 bottom-0 h-[62%]">
          <span className="display absolute inset-x-0 top-[28%] text-center text-3xl text-fg/90">Pack</span>
          <span className="absolute inset-x-0 bottom-3 text-center font-mono text-[0.5rem] uppercase tracking-[0.2em] text-fg/60">Series 01</span>
        </div>
      </button>
      <p className="label relative z-10">{open ? "Click to reseal" : "Click the pack"}</p>
    </div>
  );
}

const TIERS: { id: Tier; name: string; gets: string }[] = [
  { id: "high", name: "High", gets: "Full detail · DPR up to 2 · every effect" },
  { id: "mid", name: "Mid", gets: "Capped DPR · lighter effects" },
  { id: "low", name: "Low", gets: "Static HTML + CSS card" },
];

/** Live GPU readout: which tier this visitor's device lands in. */
export function GpuDemo() {
  const info = useGpuInfo();
  const renderer = info?.renderer
    ? info.renderer.replace(/^ANGLE \(/, "").replace(/\)$/, "").split(",").slice(0, 2).join(" ·").trim()
    : info
      ? "Not exposed by this browser"
      : "Measuring…";

  return (
    <div className="flex h-full flex-col justify-center gap-5 py-4">
      <div className="border hairline bg-bg/60 p-4">
        <p className="label">Your GPU, right now</p>
        <p className="mt-2 truncate font-mono text-sm text-fg" title={info?.renderer}>{renderer}</p>
      </div>
      <ul className="space-y-2">
        {TIERS.map((t) => {
          const me = info?.tier === t.id;
          return (
            <li
              key={t.id}
              className={`flex items-center justify-between gap-4 border px-4 py-3 transition-colors ${
                me ? "border-signal bg-signal text-bg" : "hairline text-muted"
              }`}
            >
              <span className="display text-2xl">{t.name}</span>
              <span className={`text-right text-xs ${me ? "text-bg/75" : ""}`}>{t.gets}</span>
              {me && <span className="sr-only">(your device)</span>}
            </li>
          );
        })}
      </ul>
      <p className="text-xs text-faint">
        {info ? `This device gets the ${info.tier} tier — the hero card above is rendering at it now.` : " "}
      </p>
    </div>
  );
}

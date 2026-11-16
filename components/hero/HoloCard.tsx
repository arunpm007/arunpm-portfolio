"use client";

import { useCallback, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import { useDeviceTier } from "../three/useDeviceTier";
import HoloCardHTML from "./HoloCardHTML";

const HoloCardScene = dynamic(() => import("./HoloCardScene"), { ssr: false });

export default function HoloCard() {
  const tier = useDeviceTier();
  const [flipped, setFlipped] = useState(false);
  const [ready, setReady] = useState(false);
  const hovering = useRef(false);

  const flip = useCallback(() => setFlipped((f) => !f), []);
  const onReady = useCallback(() => setReady(true), []);

  const webgl = tier === "high" || tier === "mid";
  const dpr: [number, number] = tier === "high" ? [1, 2] : [1, 1.5];

  return (
    <div className="mx-auto w-full max-w-[min(380px,74vw)]">
      <div className="relative">
        {/* Soft floor shadow */}
        <div
          aria-hidden="true"
          className="absolute -bottom-12 left-1/2 h-10 w-3/4 -translate-x-1/2 rounded-[50%] bg-black/70 blur-2xl"
        />

        {/* HTML card: the fallback, and the placeholder until WebGL is ready */}
        <div
          className={`transition-opacity duration-700 ${webgl && ready ? "pointer-events-none opacity-0" : "opacity-100"}`}
          aria-hidden={webgl && ready}
        >
          <HoloCardHTML flipped={flipped} interactive={tier !== null && tier !== "low"} />
        </div>

        {webgl && (
          // Canvas is larger than the card so tilted corners never clip.
          <div
            className={`absolute -inset-[22%] transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
            onPointerEnter={() => (hovering.current = true)}
            onPointerLeave={() => (hovering.current = false)}
          >
            <Canvas
              dpr={dpr}
              camera={{ position: [0, 0, 9.5], fov: 30 }}
              gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
              className="cursor-pointer"
              aria-label="Holographic profile card for Arun P M. Click to flip."
              role="img"
            >
              <HoloCardScene flipped={flipped} hovering={hovering} onFlip={flip} onReady={onReady} />
            </Canvas>
          </div>
        )}
      </div>

      <div className="relative z-10 mt-16 flex justify-center">
        <button
          type="button"
          onClick={flip}
          className="btn cursor-pointer bg-bg/70 backdrop-blur"
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path d="M3 12a9 9 0 0 1 15.5-6.3L21 8M21 3v5h-5M21 12a9 9 0 0 1-15.5 6.3L3 16M3 21v-5h5" />
          </svg>
          {flipped ? "Show the front" : "Flip the card"}
        </button>
      </div>
    </div>
  );
}

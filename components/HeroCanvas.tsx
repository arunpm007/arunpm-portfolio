"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import { useDeviceTier } from "./three/useDeviceTier";

const HeroScene = dynamic(() => import("./three/HeroScene"), { ssr: false });

/** Static poster shown on low-end devices / before the client tier is known. */
function Poster() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-[42vmin] w-[42vmin] rounded-full bg-[radial-gradient(circle_at_35%_30%,#25d366_0%,#0f5132_45%,#050a10_75%)] opacity-80 blur-[2px]" />
    </div>
  );
}

export default function HeroCanvas() {
  const tier = useDeviceTier();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted || tier === null || tier === "low") {
    return <Poster />;
  }

  const dpr: [number, number] = tier === "high" ? [1, 2] : [1, 1.5];

  return (
    <Canvas
      dpr={dpr}
      camera={{ position: [0, 0, 4.9], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <HeroScene tier={tier} />
    </Canvas>
  );
}

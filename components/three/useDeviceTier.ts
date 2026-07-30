"use client";

import { useEffect, useState } from "react";

export type Tier = "high" | "mid" | "low";

/**
 * Lightweight device tiering — decides how heavy the 3D scene may be.
 * Returns null until measured on the client (avoids hydration mismatch).
 */
export function useDeviceTier(): Tier | null {
  const [tier, setTier] = useState<Tier | null>(null);

  useEffect(() => {
    const nav = navigator as Navigator & { deviceMemory?: number };
    const cores = nav.hardwareConcurrency ?? 4;
    const mem = nav.deviceMemory ?? 4;
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // No WebGL → force low (poster fallback)
    let webgl = false;
    try {
      const c = document.createElement("canvas");
      webgl = !!(
        c.getContext("webgl2") || c.getContext("webgl")
      );
    } catch {
      webgl = false;
    }

    let next: Tier = "high";
    if (reduced || !webgl || cores <= 2 || mem <= 2) {
      next = "low";
    } else if (mobile || cores <= 4 || mem <= 4) {
      next = "mid";
    }
    setTier(next);
  }, []);

  return tier;
}

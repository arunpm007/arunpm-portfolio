"use client";

import { useSyncExternalStore } from "react";

export type Tier = "high" | "mid" | "low";

/**
 * Device tiering by GPU, not screen size.
 *  - low:  no WebGL, a software renderer, reduced motion, or a very weak device → static card
 *  - mid:  phones / integrated mobile GPUs → capped pixel ratio
 *  - high: everything else
 */
function detectTier(): Tier {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return "low";

  let renderer = "";
  try {
    const canvas = document.createElement("canvas");
    const gl = (canvas.getContext("webgl2") ||
      canvas.getContext("webgl")) as WebGLRenderingContext | null;
    if (!gl) return "low";
    const info = gl.getExtension("WEBGL_debug_renderer_info");
    renderer = String(
      gl.getParameter(info ? info.UNMASKED_RENDERER_WEBGL : gl.RENDERER) ?? ""
    );
    gl.getExtension("WEBGL_lose_context")?.loseContext();
  } catch {
    return "low";
  }

  if (/swiftshader|llvmpipe|softpipe|software|basic render/i.test(renderer)) return "low";

  const nav = navigator as Navigator & { deviceMemory?: number };
  const cores = nav.hardwareConcurrency ?? 4;
  const memory = nav.deviceMemory ?? 4;
  if (cores <= 2 || memory <= 2) return "low";

  const mobileGpu = /mali|adreno|powervr|apple gpu/i.test(renderer);
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  if (mobileGpu && coarse) return "mid";
  if (cores <= 4 || memory <= 4) return "mid";
  return "high";
}

let cached: Tier | null = null;
const getSnapshot = () => (cached ??= detectTier());
const getServerSnapshot = () => null;
const subscribe = () => () => {};

/** Returns null during SSR / hydration, then the measured tier. */
export function useDeviceTier(): Tier | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

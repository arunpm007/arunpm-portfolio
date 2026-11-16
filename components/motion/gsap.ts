"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

let registered = false;

/** Registers GSAP plugins once (client only) and returns gsap. */
export function getGsap() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    registered = true;
  }
  return gsap;
}

export const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

type LenisLike = { scroll: number; scrollTo: (t: number | HTMLElement, o?: Record<string, unknown>) => void };

/** The page's Lenis instance, registered by SmoothScroll (null with reduced motion). */
export const getLenis = () =>
  typeof window === "undefined" ? null : ((window as unknown as { __lenis?: LenisLike }).__lenis ?? null);

/** Scroll the page to a y position — through Lenis when it's running. */
export function scrollToY(y: number, immediate = false) {
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(y, { immediate, duration: 1.1 });
  else window.scrollTo({ top: y, behavior: immediate || reducedMotion() ? "auto" : "smooth" });
}

export { ScrollTrigger, SplitText };

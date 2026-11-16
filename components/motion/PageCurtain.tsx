"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { getGsap, reducedMotion } from "./gsap";

/**
 * Route-change curtain: a signal-orange panel wipes off the screen upward
 * each time the pathname changes (not on the very first load).
 */
export default function PageCurtain() {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const el = ref.current;
    if (!el || reducedMotion()) return;
    const gsap = getGsap();
    gsap.fromTo(
      el,
      { yPercent: 0, autoAlpha: 1 },
      { yPercent: -100, duration: 0.8, ease: "expo.inOut", delay: 0.05, onComplete: () => gsap.set(el, { autoAlpha: 0 }) }
    );
  }, [pathname]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[80] bg-signal"
      style={{ visibility: "hidden" }}
    />
  );
}

"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { getGsap, getLenis, reducedMotion, ScrollTrigger } from "./motion/gsap";

/**
 * Lenis smooth scroll, driven by GSAP's ticker so ScrollTrigger and Lenis
 * share one clock (no jitter on pinned/scrubbed scenes). Also owns scroll
 * position on route changes: a new page always opens at its top (or at the
 * #hash it links to), never where the previous page was scrolled.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const gsap = getGsap();
    if (reducedMotion()) return;

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // In-page anchors scroll through Lenis.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest('a[href^="#"], a[href^="/#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const raw = a.getAttribute("href")!;
      if (raw.startsWith("/#") && location.pathname !== "/") return; // cross-page: let Next navigate
      const hash = raw.replace(/^\//, "");
      if (hash === "#") return;
      const el = document.querySelector(hash);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el as HTMLElement, { offset: -72 });
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tick);
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
      lenis.destroy();
    };
  }, []);

  // New route → start at the top (or the hash target), with no smooth glide.
  useEffect(() => {
    const lenis = getLenis();
    const hash = window.location.hash;
    const jump = () => {
      const target = hash ? document.querySelector<HTMLElement>(hash) : null;
      if (lenis) lenis.scrollTo(target ?? 0, { immediate: true, force: true, offset: target ? -72 : 0 });
      else if (target) target.scrollIntoView();
      else window.scrollTo(0, 0);
      ScrollTrigger.refresh();
    };
    jump();
    // Once more after layout settles (fonts, pinned sections measuring).
    const t = window.setTimeout(jump, 120);
    return () => window.clearTimeout(t);
  }, [pathname]);

  return <>{children}</>;
}

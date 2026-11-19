"use client";

import { useEffect, useRef } from "react";

/**
 * A soft signal-coloured glow that trails the cursor and lights the space
 * behind the content — a subtle "reveal on movement". Sits behind the content
 * (-z-10) so it never tints text. Disabled for touch and reduced motion.
 */
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    const apply = () => {
      raf = 0;
      cx += (tx - cx) * 0.14;
      cy += (ty - cy) * 0.14;
      el.style.setProperty("--gx", `${cx.toFixed(1)}px`);
      el.style.setProperty("--gy", `${cy.toFixed(1)}px`);
      if (Math.abs(tx - cx) > 0.5 || Math.abs(ty - cy) > 0.5) raf = requestAnimationFrame(apply);
    };

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      el.style.opacity = "1";
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      el.style.opacity = "0";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 opacity-0 transition-opacity duration-700"
      style={{
        backgroundImage:
          "radial-gradient(300px circle at var(--gx, -300px) var(--gy, -300px), rgba(255, 90, 31, 0.13), transparent 70%)," +
          "linear-gradient(var(--color-line) 1px, transparent 1px)," +
          "linear-gradient(90deg, var(--color-line) 1px, transparent 1px)",
        backgroundSize: "100% 100%, 46px 46px, 46px 46px",
        maskImage:
          "radial-gradient(300px circle at var(--gx, -300px) var(--gy, -300px), #000 10%, transparent 72%)",
        WebkitMaskImage:
          "radial-gradient(300px circle at var(--gx, -300px) var(--gy, -300px), #000 10%, transparent 72%)",
      }}
    />
  );
}

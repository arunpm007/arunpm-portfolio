"use client";

import { useEffect, useRef } from "react";
import { getGsap, reducedMotion, ScrollTrigger, SplitText } from "./gsap";

type Tag = "h1" | "h2" | "h3" | "p" | "div" | "span";

function useTagRef<T extends HTMLElement>() {
  return useRef<T>(null);
}

/**
 * Masked line reveal for display headings: lines slide up from behind a mask
 * when the heading enters the viewport (or immediately with `immediate`).
 */
export function LineReveal({
  as = "h2",
  className = "",
  children,
  immediate = false,
  delay = 0,
}: {
  as?: Tag;
  className?: string;
  children: React.ReactNode;
  immediate?: boolean;
  delay?: number;
}) {
  const ref = useTagRef<HTMLElement>();

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion()) return;
    const gsap = getGsap();
    let split: SplitText | null = null;
    const ctx = gsap.context(() => {
      split = SplitText.create(el, { type: "lines", mask: "lines", linesClass: "line-inner" });
      gsap.from(split.lines, {
        yPercent: 110,
        duration: 1,
        ease: "expo.out",
        stagger: 0.07,
        delay,
        scrollTrigger: immediate ? undefined : { trigger: el, start: "top 88%", once: true },
      });
    }, el);
    return () => {
      ctx.revert();
      split?.revert();
    };
  }, [ref, immediate, delay]);

  const Comp = as as unknown as React.FC<{ ref: React.Ref<HTMLElement>; className: string; children: React.ReactNode }>;
  return (
    <Comp ref={ref} className={className}>
      {children}
    </Comp>
  );
}

/** Words go from dim to full as you scroll through the block (scrubbed). */
export function ScrubText({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion()) return;
    const gsap = getGsap();
    const ctx = gsap.context(() => {
      const words = el.querySelectorAll<HTMLElement>("[data-w]");
      gsap.fromTo(
        words,
        { opacity: 0.16 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  // Words wrapped in **double asterisks** get the signal colour.
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <p ref={ref} className={className}>
      {parts.map((part, i) => {
        const strong = part.startsWith("**");
        const clean = strong ? part.slice(2, -2) : part;
        return clean.split(/(\s+)/).map((w, j) =>
          /^\s+$/.test(w) || !w ? (
            w
          ) : (
            <span key={`${i}-${j}`} data-w className={strong ? "text-signal" : undefined}>
              {w}
            </span>
          )
        );
      })}
    </p>
  );
}

/** Counts a number up once when it enters view. Keeps prefix/suffix text. */
export function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion()) return;
    // Animate the LAST number in the string (e.g. "28→61" counts the 61).
    const match = value.match(/(\d+(?:\.\d+)?)(?!.*\d)/);
    if (!match || match.index === undefined) return;
    const target = parseFloat(match[1]);
    const decimals = (match[1].split(".")[1] ?? "").length;
    const before = value.slice(0, match.index);
    const after = value.slice(match.index + match[1].length);
    const gsap = getGsap();
    const counter = { n: 0 };
    const ctx = gsap.context(() => {
      gsap.to(counter, {
        n: target,
        duration: 1.6,
        ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
        onUpdate: () => {
          el.textContent = `${before}${counter.n.toFixed(decimals)}${after}`;
        },
      });
    }, el);
    return () => ctx.revert();
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}

/** Moves children vertically against the scroll for a parallax layer. */
export function Parallax({ children, amount = 10, className = "" }: { children: React.ReactNode; amount?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion()) return;
    const gsap = getGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: -amount / 2 },
        { yPercent: amount / 2, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } }
      );
    }, el);
    return () => ctx.revert();
  }, [amount]);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/** Refreshes ScrollTrigger once fonts/images settle (pins measure correctly). */
export function RefreshOnLoad() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    return () => window.removeEventListener("load", refresh);
  }, []);
  return null;
}

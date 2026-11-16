"use client";

import { useEffect, useState } from "react";
import { SECTIONS } from "@/lib/case-studies";

/** Sticky section index for a case study; highlights the section in view. */
export default function CaseToc() {
  const [active, setActive] = useState<string>(SECTIONS[0].id);

  // Active = the last section whose top has passed 35% of the viewport.
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-case-section]"));
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.35;
      let current = els[0]?.id;
      for (const el of els) if (el.getBoundingClientRect().top <= line) current = el.id;
      if (current) setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <nav aria-label="Case study sections" className="hidden lg:block">
      <ol className="sticky top-28 space-y-1">
        {SECTIONS.map((s, i) => {
          const on = active === s.id;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={on ? "true" : undefined}
                className={`flex items-center gap-3 py-1.5 font-mono text-[0.72rem] uppercase tracking-[0.12em] transition-colors ${
                  on ? "text-fg" : "text-muted hover:text-fg"
                }`}
              >
                <span className={`h-px transition-all duration-300 ${on ? "w-8 bg-signal" : "w-3 bg-line"}`} />
                <span className={on ? "text-signal" : ""}>{String(i + 1).padStart(2, "0")}</span>
                {s.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

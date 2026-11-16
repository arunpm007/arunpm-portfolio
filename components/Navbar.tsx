"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { nav } from "@/lib/site";

export default function Navbar({ home = true }: { home?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently in view.
  useEffect(() => {
    if (!home) return;
    const sections = nav
      .map((n) => document.querySelector<HTMLElement>(n.href))
      .filter((s): s is HTMLElement => !!s);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [home]);

  const href = (h: string) => (home ? h : `/${h}`);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        aria-label="Main"
        className={`relative flex w-full max-w-6xl items-center justify-between rounded-full py-2 pl-5 pr-2 transition-all duration-300 ${
          scrolled || open
            ? "border hairline bg-surface/75 backdrop-blur-xl"
            : "border border-transparent"
        }`}
      >
        <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2" aria-label="Arun P M — home">
          <span className="font-display text-2xl italic leading-none">AP</span>
          <span className="label hidden sm:inline">Arun P M</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={href(item.href)}
              className={`relative rounded-full px-3.5 py-2 text-sm transition-colors ${
                active === item.href ? "text-fg" : "text-muted hover:text-fg"
              }`}
            >
              {item.label}
              {active === item.href && (
                <span className="absolute inset-x-3.5 -bottom-0.5 h-px [background:var(--holo)]" />
              )}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/resume"
            className="btn-primary hidden min-h-10 items-center rounded-full px-5 text-sm font-semibold sm:inline-flex"
          >
            <span className="relative z-10">Résumé</span>
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border hairline md:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
            </svg>
          </button>
        </div>

        {open && (
          <div className="absolute left-0 right-0 top-[calc(100%+8px)] rounded-3xl border hairline bg-surface/95 p-3 shadow-2xl backdrop-blur-xl md:hidden">
            {nav.map((item) => (
              <a
                key={item.href}
                href={href(item.href)}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 text-muted transition-colors hover:bg-surface-2 hover:text-fg"
              >
                {item.label}
              </a>
            ))}
            <Link
              href="/resume"
              onClick={() => setOpen(false)}
              className="btn-primary mt-1 block rounded-2xl px-4 py-3 text-center font-semibold"
            >
              <span className="relative z-10">Résumé</span>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { nav } from "@/lib/site";

export default function Navbar({ home = true }: { home?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  const href = (h: string) => (home ? h : `/${h}`);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open ? "hairline bg-bg/90 backdrop-blur-md" : "border-transparent"
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-4 sm:px-6">
        <Link href="/" onClick={() => setOpen(false)} className="display text-2xl" aria-label="Arun P M — home">
          Arun P M<span className="text-signal">.</span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <a key={item.href} href={href(item.href)} className="label transition-colors hover:text-fg">
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="label hidden items-center gap-2 xl:inline-flex">
            <span className="h-1.5 w-1.5 bg-signal" /> Available
          </span>
          <Link href="/resume" className="btn btn-signal hidden !min-h-10 sm:inline-flex">
            Résumé
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-11 w-11 cursor-pointer items-center justify-center border hairline lg:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 8h18M3 16h18" />}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-x-0 bottom-0 top-16 flex flex-col bg-bg px-4 pb-10 pt-6 lg:hidden">
          {nav.map((item, i) => (
            <a
              key={item.href}
              href={href(item.href)}
              onClick={() => setOpen(false)}
              className="display flex items-baseline gap-4 border-b hairline py-4 text-5xl"
            >
              <span className="label">0{i + 1}</span>
              {item.label}
            </a>
          ))}
          <Link href="/resume" onClick={() => setOpen(false)} className="btn btn-signal mt-auto justify-center">
            Résumé
          </Link>
        </div>
      )}
    </header>
  );
}

"use client";

import { useEffect, useState } from "react";
import { nav } from "@/lib/site";

function MenuIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Logo: scroll to top when already home, otherwise navigate home.
  const handleLogo = (e: React.MouseEvent) => {
    setOpen(false);
    if (typeof window !== "undefined" && window.location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={`relative flex w-full max-w-6xl items-center justify-between rounded-full px-5 py-2.5 transition-all duration-300 ${
          scrolled || open
            ? "border border-border bg-surface/70 backdrop-blur-xl"
            : "border border-transparent bg-transparent"
        }`}
      >
        <a
          href="/"
          onClick={handleLogo}
          className="font-heading text-sm font-bold tracking-tight text-fg"
        >
          Arun<span className="text-accent">.</span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted transition-colors duration-200 hover:text-fg"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/resume"
            className="hidden cursor-pointer rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-bg transition-colors duration-200 hover:bg-accent-soft sm:inline-block"
          >
            Résumé
          </a>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border text-fg transition-colors hover:border-accent/50 md:hidden"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {open && (
          <div className="absolute left-0 right-0 top-[calc(100%+8px)] rounded-2xl border border-border bg-surface/95 p-3 shadow-2xl backdrop-blur-xl md:hidden">
            <div className="flex flex-col">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-fg"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="/resume"
                onClick={() => setOpen(false)}
                className="mt-1 rounded-xl bg-accent px-4 py-3 text-center text-sm font-medium text-bg transition-colors hover:bg-accent-soft"
              >
                Résumé
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

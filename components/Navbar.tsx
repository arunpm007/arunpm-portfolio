"use client";

import { useEffect, useState } from "react";
import { nav, profile } from "@/lib/site";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={`flex w-full max-w-6xl items-center justify-between rounded-full px-5 py-2.5 transition-all duration-300 ${
          scrolled
            ? "border border-border bg-surface/70 backdrop-blur-xl"
            : "border border-transparent bg-transparent"
        }`}
      >
        <a
          href="#top"
          className="font-heading text-sm font-bold tracking-tight text-fg"
        >
          Arun<span className="text-accent">.</span>
        </a>

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

        <a
          href={profile.resumeUrl}
          className="cursor-pointer rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-bg transition-colors duration-200 hover:bg-accent-soft"
        >
          Résumé
        </a>
      </nav>
    </header>
  );
}

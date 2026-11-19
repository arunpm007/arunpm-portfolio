import type { Metadata, Viewport } from "next";
import { Big_Shoulders, Caveat, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import PageCurtain from "@/components/motion/PageCurtain";
import CursorGlow from "@/components/CursorGlow";
import { profile, siteUrl } from "@/lib/site";

// All three are variable fonts: no weight list, one file each.
const display = Big_Shoulders({ variable: "--font-big-shoulders", subsets: ["latin"], adjustFontFallback: false });

const sans = Inter_Tight({ variable: "--font-inter-tight", subsets: ["latin"] });

const mono = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });

// Caveat is NOT a variable font — an explicit weight list is required.
const hand = Caveat({ variable: "--font-caveat", subsets: ["latin"], weight: ["600", "700"] });

const title = `${profile.name} — ${profile.role}`;
const description =
  "Senior frontend lead engineer — React, Next.js and TypeScript, design systems, single sign-on, security and performance across connected consumer products.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: `%s — ${profile.name}` },
  description,
  keywords: [
    "Arun P M",
    "Senior Frontend Engineer",
    "Frontend Lead",
    "Design Systems",
    "React",
    "Next.js",
    "TypeScript",
    "Three.js",
    "React Three Fiber",
  ],
  openGraph: { title, description, type: "website", siteName: profile.name },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = { themeColor: "#0b0b0c" };

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable} ${hand.variable} antialiased`}
    >
      <body className="grain min-h-screen" suppressHydrationWarning>
        <CursorGlow />
        <PageCurtain />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Archivo, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Arun P M — Senior Frontend Lead Engineer",
  description:
    "Senior frontend lead engineer — React, Next.js and TypeScript, design systems, single sign-on, security and performance across connected consumer products.",
  keywords: [
    "Arun P M",
    "Frontend Engineer",
    "Frontend Lead",
    "Design Systems",
    "TypeScript",
    "Three.js",
    "React Three Fiber",
    "React",
    "Next.js",
    "WebGL",
  ],
  openGraph: {
    title: "Arun P M — Senior Frontend Lead Engineer",
    description:
      "Senior frontend lead — React, Next.js, TypeScript and design systems.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${spaceGrotesk.variable} antialiased`}
    >
      <body className="grain min-h-screen" suppressHydrationWarning>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}

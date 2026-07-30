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
  title: "Arun P M — Frontend & 3D Engineer",
  description:
    "Frontend & 3D web engineer building immersive, high-performance interfaces with React, Next.js, Three.js and React Three Fiber.",
  keywords: [
    "Arun P M",
    "Frontend Engineer",
    "3D Web",
    "Three.js",
    "React Three Fiber",
    "React",
    "Next.js",
    "WebGL",
  ],
  openGraph: {
    title: "Arun P M — Frontend & 3D Engineer",
    description:
      "Immersive, high-performance web experiences with React, Next.js & Three.js.",
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

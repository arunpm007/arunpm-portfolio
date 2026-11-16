import { ImageResponse } from "next/og";
import { profile, ticker } from "@/lib/site";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const holo = "linear-gradient(100deg, #9ff2d8 0%, #a9c4ff 30%, #d8b4ff 58%, #ffc7a6 85%)";

// The link preview people see when the site is shared.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "radial-gradient(60% 70% at 85% 30%, #2a2140 0%, #0c0c0e 60%)",
          color: "#edece7",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: 4, color: "#8a887f" }}>
          <span>ARUN P M / BANGALORE, INDIA</span>
          <span>PORTFOLIO · 2026</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 104, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>{profile.name}</div>
          <div style={{ marginTop: 20, fontSize: 40, color: "#a8a69f" }}>{profile.role}</div>
          <div style={{ marginTop: 40, height: 6, width: 420, borderRadius: 3, backgroundImage: holo }} />
        </div>
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 2, color: "#a8a69f" }}>
          {ticker.slice(1, 4).join("   ·   ").toUpperCase()}
        </div>
      </div>
    ),
    size
  );
}

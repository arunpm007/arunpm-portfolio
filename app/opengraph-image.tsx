import { ImageResponse } from "next/og";
import { profile } from "@/lib/site";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";


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
          background: "#0b0b0c",
          color: "#ece8df",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: 4, color: "#8a857b" }}>
          <span>ARUN P M / BANGALORE, INDIA</span>
          <span>PORTFOLIO · 2026</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 120, fontWeight: 800, letterSpacing: -2, lineHeight: 1, textTransform: "uppercase" }}>{profile.name}<span style={{ color: "#ff5a1f" }}>.</span></div>
          <div style={{ marginTop: 20, fontSize: 40, color: "#9c978c" }}>{`Frontend Architect · ${profile.role}`}</div>
          <div style={{ marginTop: 40, height: 8, width: 160, background: "#ff5a1f" }} />
        </div>
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 2, color: "#9c978c" }}>
          {"Platform · Identity · Commerce · Real-time 3D · Design systems".toUpperCase()}
        </div>
      </div>
    ),
    size
  );
}

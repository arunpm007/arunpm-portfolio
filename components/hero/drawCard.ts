// Paints the hero card onto 2D canvases that become WebGL textures:
//  - `color`: what the card looks like under flat light
//  - `mask`:  where the holographic foil is (white = full foil)
// The shader mixes the two, so the foil only shimmers where the mask says.

import { card } from "./cardContent";

export const CARD_W = 1000;
export const CARD_H = 1400;
const PAD = 72;

export type Fonts = { serif: string; sans: string; mono: string };

/** Reads the next/font family names from the CSS variables on <html>. */
export function readFonts(): Fonts {
  const s = getComputedStyle(document.documentElement);
  const v = (name: string, fallback: string) =>
    s.getPropertyValue(name).trim() || fallback;
  return {
    serif: v("--font-big-shoulders", "Arial Narrow, sans-serif"),
    sans: v("--font-inter-tight", "system-ui, sans-serif"),
    mono: v("--font-jetbrains", "ui-monospace, monospace"),
  };
}

export async function loadFonts(f: Fonts) {
  await Promise.all([
    document.fonts.load(`800 100px ${f.serif}`),
    document.fonts.load(`600 100px ${f.serif}`),
    document.fonts.load(`500 40px ${f.sans}`),
    document.fonts.load(`500 24px ${f.mono}`),
  ]).catch(() => undefined);
}

function makeCanvas(w: number, h: number) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  return [c, c.getContext("2d")!] as const;
}

function spaced(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, spacing: number, align: "left" | "right" = "left") {
  // Canvas letterSpacing is widely supported now; fall back silently if not.
  (ctx as CanvasRenderingContext2D & { letterSpacing?: string }).letterSpacing = `${spacing}px`;
  ctx.textAlign = align;
  ctx.fillText(text, x, y);
  (ctx as CanvasRenderingContext2D & { letterSpacing?: string }).letterSpacing = "0px";
}

function base(ctx: CanvasRenderingContext2D) {
  const g = ctx.createLinearGradient(0, 0, CARD_W * 0.4, CARD_H);
  g.addColorStop(0, "#1c1c21");
  g.addColorStop(0.55, "#111114");
  g.addColorStop(1, "#0b0b0d");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, CARD_W, CARD_H);
}

/** Guilloche-style emblem: concentric rings, rays and a rosette. */
function emblem(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, stroke: string, scale = 1) {
  ctx.save();
  ctx.strokeStyle = stroke;
  ctx.lineWidth = 1.6 * scale;
  for (let i = 0; i < 9; i++) {
    ctx.beginPath();
    ctx.arc(cx, cy, r * (0.28 + i * 0.09), 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.lineWidth = 1.1 * scale;
  for (let i = 0; i < 72; i++) {
    const a = (i / 72) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(a) * r * 0.28, cy + Math.sin(a) * r * 0.28);
    ctx.lineTo(cx + Math.cos(a) * r * 1.0, cy + Math.sin(a) * r * 1.0);
    ctx.stroke();
  }
  // Rosette: a rose curve, the classic banknote motif
  ctx.lineWidth = 2 * scale;
  ctx.beginPath();
  for (let t = 0; t <= Math.PI * 2 + 0.01; t += 0.01) {
    const rr = r * 0.24 * Math.cos(6 * t);
    const x = cx + rr * Math.cos(t);
    const y = cy + rr * Math.sin(t);
    if (t === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.restore();
}

function frame(ctx: CanvasRenderingContext2D, stroke: string, width: number) {
  ctx.save();
  ctx.strokeStyle = stroke;
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.roundRect(28, 28, CARD_W - 56, CARD_H - 56, 34);
  ctx.stroke();
  ctx.restore();
}

function chip(ctx: CanvasRenderingContext2D, x: number, y: number, fill: string, line: string) {
  ctx.save();
  ctx.fillStyle = fill;
  ctx.beginPath();
  ctx.roundRect(x, y, 118, 88, 16);
  ctx.fill();
  ctx.strokeStyle = line;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(x, y + 44); ctx.lineTo(x + 118, y + 44);
  ctx.moveTo(x + 40, y); ctx.lineTo(x + 40, y + 88);
  ctx.moveTo(x + 78, y); ctx.lineTo(x + 78, y + 88);
  ctx.stroke();
  ctx.restore();
}

function hatch(ctx: CanvasRenderingContext2D, alpha: number) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 1;
  for (let x = -CARD_H; x < CARD_W; x += 9) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + CARD_H, CARD_H);
    ctx.stroke();
  }
  ctx.restore();
}

export function drawFront(f: Fonts) {
  const [color, c] = makeCanvas(CARD_W, CARD_H);
  const [mask, m] = makeCanvas(CARD_W, CARD_H);
  m.fillStyle = "#000";
  m.fillRect(0, 0, CARD_W, CARD_H);

  base(c);
  const ex = CARD_W / 2;
  const ey = 500;

  // Faint print of the emblem on the card itself; the foil lights it up.
  emblem(c, ex, ey, 300, "rgba(236,232,223,0.10)");
  frame(c, "rgba(236,232,223,0.14)", 2);

  // Foil areas
  hatch(m, 0.16);
  emblem(m, ex, ey, 300, "#fff", 1.4);
  frame(m, "#fff", 5);
  chip(m, PAD, 168, "#d9d9d9", "#000");
  m.fillStyle = "#fff";
  m.fillRect(PAD, 1068, CARD_W - PAD * 2, 3);

  chip(c, PAD, 168, "#2b2b31", "#1a1a1e");

  // Header
  c.fillStyle = "#8a857b";
  c.font = `500 24px ${f.mono}`;
  c.textBaseline = "alphabetic";
  spaced(c, card.edition.toUpperCase(), PAD, 112, 4);
  spaced(c, card.serial, CARD_W - PAD, 112, 4, "right");
  c.fillStyle = "rgba(236,232,223,0.16)";
  c.fillRect(PAD, 136, CARD_W - PAD * 2, 2);

  // Name + role
  c.fillStyle = "#ece8df";
  c.font = `800 190px ${f.serif}`;
  c.textAlign = "left";
  c.fillText(card.name.toUpperCase(), PAD - 4, 960);
  c.fillStyle = "#9c978c";
  c.font = `500 40px ${f.sans}`;
  c.fillText(card.role, PAD, 1022);

  // Signal-orange rule under the role
  c.fillStyle = "#ff5a1f";
  c.fillRect(PAD, 1066, 180, 5);
  c.fillStyle = "rgba(236,232,223,0.18)";
  c.fillRect(PAD + 196, 1068, CARD_W - PAD * 2 - 196, 2);

  // Stats
  const colW = (CARD_W - PAD * 2) / card.stats.length;
  card.stats.forEach((s, i) => {
    const x = PAD + i * colW;
    c.fillStyle = "#ece8df";
    c.font = `800 72px ${f.serif}`;
    c.textAlign = "left";
    c.fillText(s.value, x, 1168);
    c.fillStyle = "#8a857b";
    c.font = `500 22px ${f.mono}`;
    spaced(c, s.label.toUpperCase(), x, 1208, 3);
  });

  // Footer
  c.fillStyle = "#8a857b";
  c.font = `500 22px ${f.mono}`;
  spaced(c, card.footerLeft.toUpperCase(), PAD, CARD_H - 76, 4);
  spaced(c, card.footerRight.toUpperCase(), CARD_W - PAD, CARD_H - 76, 4, "right");

  return { color, mask };
}

export function drawBack(f: Fonts) {
  const [color, c] = makeCanvas(CARD_W, CARD_H);
  const [mask, m] = makeCanvas(CARD_W, CARD_H);
  m.fillStyle = "#000";
  m.fillRect(0, 0, CARD_W, CARD_H);

  base(c);
  frame(c, "rgba(236,232,223,0.14)", 2);
  hatch(m, 0.22);
  frame(m, "#fff", 5);

  // Big faint monogram, foil only
  m.fillStyle = "#fff";
  m.globalAlpha = 0.2;
  m.font = `900 820px ${f.serif}`;
  m.textAlign = "center";
  m.fillText("AP", CARD_W / 2 + 20, 980);
  m.globalAlpha = 1;
  c.fillStyle = "rgba(236,232,223,0.035)";
  c.font = `900 820px ${f.serif}`;
  c.textAlign = "center";
  c.fillText("AP", CARD_W / 2 + 20, 980);

  c.fillStyle = "#8a857b";
  c.font = `500 24px ${f.mono}`;
  spaced(c, card.back.title.toUpperCase(), PAD, 112, 4);
  spaced(c, card.serial, CARD_W - PAD, 112, 4, "right");
  c.fillStyle = "rgba(236,232,223,0.16)";
  c.fillRect(PAD, 136, CARD_W - PAD * 2, 2);

  card.back.rows.forEach((row, i) => {
    const y = 250 + i * 142;
    c.fillStyle = "#8a857b";
    c.font = `500 22px ${f.mono}`;
    spaced(c, row.label.toUpperCase(), PAD, y, 4);
    c.fillStyle = "#ece8df";
    c.font = `500 40px ${f.sans}`;
    c.textAlign = "left";
    c.fillText(row.value, PAD, y + 56);
    c.fillStyle = "rgba(236,232,223,0.10)";
    c.fillRect(PAD, y + 86, CARD_W - PAD * 2, 2);
  });

  // Barcode — foil
  let x = PAD;
  let seed = 7;
  while (x < CARD_W - PAD - 10) {
    seed = (seed * 9301 + 49297) % 233280;
    const w = 3 + (seed % 4) * 3;
    m.fillStyle = "#fff";
    m.fillRect(x, CARD_H - 200, w, 74);
    c.fillStyle = "rgba(236,232,223,0.55)";
    c.fillRect(x, CARD_H - 200, w, 74);
    x += w + 5 + (seed % 3) * 3;
  }

  c.fillStyle = "#8a857b";
  c.font = `500 22px ${f.mono}`;
  spaced(c, card.back.hint.toUpperCase(), PAD, CARD_H - 76, 3);

  return { color, mask };
}

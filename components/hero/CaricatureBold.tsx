"use client";

import { useEffect, useRef } from "react";

/**
 * Bold hero mascot — a stylized HOMAGE to Monkey D. Luffy (One Piece),
 * rendered in the Industrial-signal palette (cream straw hat, signal-orange
 * band + vest, carbon line-art) so it reads instantly without a rainbow.
 *
 * Signature cues: straw hat (crown + wide brim + orange band), big carefree
 * grin, the scar under the left eye, the chest X-scar, messy hair under the
 * brim, and an enthusiastic HIGH wave. Reacts: pupils track the cursor, blinks,
 * waves high on a loop, breathes. All motion off under prefers-reduced-motion.
 *
 * SVG is the fast/free proof; a real drawn-anime Luffy rigged in Rive is the
 * premium upgrade once the direction is locked.
 */
export default function CaricatureBold() {
  const rootRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;

    const apply = () => {
      raf = 0;
      curX += (targetX - curX) * 0.18;
      curY += (targetY - curY) * 0.18;
      root.style.setProperty("--px", curX.toFixed(2) + "px");
      root.style.setProperty("--py", curY.toFixed(2) + "px");
      if (Math.abs(targetX - curX) > 0.1 || Math.abs(targetY - curY) > 0.1) {
        raf = requestAnimationFrame(apply);
      }
    };

    const onMove = (e: PointerEvent) => {
      const r = root.getBoundingClientRect();
      const eyeX = r.left + r.width * 0.5;
      const eyeY = r.top + r.height * 0.4;
      const dx = e.clientX - eyeX;
      const dy = e.clientY - eyeY;
      const dist = Math.hypot(dx, dy) || 1;
      const reach = Math.min(6, dist / 20);
      targetX = (dx / dist) * reach;
      targetY = (dy / dist) * reach;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-[min(440px,82vw)]">
      <div
        aria-hidden="true"
        className="absolute -bottom-6 left-1/2 h-8 w-2/3 -translate-x-1/2 rounded-[50%] bg-black/70 blur-2xl"
      />

      <svg
        ref={rootRef}
        viewBox="0 0 360 440"
        className="car relative w-full"
        role="img"
        aria-label="Stylized Monkey D. Luffy mascot that follows your cursor and waves"
        fill="none"
        stroke="#ECE8DF"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <style>{`
          .car .breathe { animation: car-breathe 5.5s ease-in-out infinite; transform-box: fill-box; transform-origin: 50% 100%; }
          .car .arm { animation: car-wave 4.5s ease-in-out .3s infinite; transform-box: fill-box; transform-origin: 46% 97%; }
          .car .eye { animation: car-blink 5.2s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
          .car .eye.r { animation-delay: .05s; }
          .car .pupil { transform: translate(var(--px,0), var(--py,0)); will-change: transform; }
          .car .zip { animation: car-zip 4.5s ease-in-out .3s infinite; }
          @keyframes car-breathe { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
          @keyframes car-blink { 0%,90%,100% { transform: scaleY(1); } 94% { transform: scaleY(.1); } }
          @keyframes car-zip { 0%,48%,100% { opacity: .12; } 10%,38% { opacity: 1; } }
          @keyframes car-wave {
            0% { transform: rotate(0deg); }
            7% { transform: rotate(-30deg); }
            14% { transform: rotate(-6deg); }
            21% { transform: rotate(-28deg); }
            28% { transform: rotate(-6deg); }
            35% { transform: rotate(-24deg); }
            42% { transform: rotate(-9deg); }
            48% { transform: rotate(0deg); }
            100% { transform: rotate(0deg); }
          }
          @media (prefers-reduced-motion: reduce) {
            .car .breathe, .car .arm, .car .eye, .car .zip { animation: none; }
          }
        `}</style>

        <g className="breathe">
          {/* ================= Neck ================= */}
          <path d="M165 208 L162 278 L198 278 L195 208 Z" fill="#0b0b0c" />
          <path d="M165 212 C164 234 166 256 170 272" fill="none" />
          <path d="M195 212 C196 234 194 256 190 272" fill="none" />

          {/* ================= Body ================= */}
          {/* bare chest (carbon, line-art) */}
          <path
            d="M104 440 C106 344 140 276 180 268 C220 276 254 344 256 440 Z"
            fill="#0b0b0c"
          />
          {/* open orange vest — left & right panels */}
          <path d="M104 440 C106 350 138 282 172 274 L170 300 C150 308 128 360 126 440 Z" fill="#FF5A1F" stroke="none" />
          <path d="M256 440 C254 350 222 282 188 274 L190 300 C210 308 232 360 234 440 Z" fill="#FF5A1F" stroke="none" />
          {/* vest outlines */}
          <path d="M104 440 C106 350 138 282 172 274" fill="none" />
          <path d="M256 440 C254 350 222 282 188 274" fill="none" />
          <path d="M172 274 L170 300 C150 308 128 360 126 440" fill="none" />
          <path d="M188 274 L190 300 C210 308 232 360 234 440" fill="none" />
          {/* the chest X-scar */}
          <path d="M169 306 L191 338" stroke="#ECE8DF" strokeWidth={4.5} />
          <path d="M191 306 L169 338" stroke="#ECE8DF" strokeWidth={4.5} />

          {/* ================= Head ================= */}
          {/* face (carbon, line-art), round */}
          <path
            d="M126 150 C126 122 150 110 180 110 C210 110 234 122 234 150 C234 182 223 202 204 212 C196 216 188 220 180 220 C172 220 164 216 156 212 C137 202 126 182 126 150 Z"
            fill="#0b0b0c"
          />
          {/* ears */}
          <path d="M126 160 q-10 2 -8 14 q2 10 12 7" fill="#0b0b0c" />
          <path d="M234 160 q10 2 8 14 q-2 10 -12 7" fill="#0b0b0c" />

          {/* messy hair fringe peeking under the brim */}
          <path
            d="M138 122 L146 136 L154 124 L162 138 L170 124 L178 138 L186 124 L194 138 L202 124 L210 136 L218 122 Z"
            fill="#0b0b0c"
          />

          {/* brows */}
          <path d="M142 148 Q156 142 170 147" fill="none" strokeWidth={4} />
          <path d="M190 147 Q204 142 218 148" fill="none" strokeWidth={4} />

          {/* ----- Eyes (big, round) ----- */}
          <g className="eye l">
            <ellipse cx="156" cy="163" rx="12" ry="13" fill="#ECE8DF" stroke="#ECE8DF" />
            <circle className="pupil" cx="156" cy="163" r="7" fill="#0b0b0c" stroke="none" />
            <circle className="pupil" cx="159" cy="160" r="2" fill="#ECE8DF" stroke="none" />
          </g>
          <g className="eye r">
            <ellipse cx="204" cy="163" rx="12" ry="13" fill="#ECE8DF" stroke="#ECE8DF" />
            <circle className="pupil" cx="204" cy="163" r="7" fill="#0b0b0c" stroke="none" />
            <circle className="pupil" cx="207" cy="160" r="2" fill="#ECE8DF" stroke="none" />
          </g>

          {/* the scar under the left eye (viewer's right) */}
          <path d="M204 180 L203 191" stroke="#ECE8DF" strokeWidth={2.2} />
          <path d="M199 183 L209 183" stroke="#ECE8DF" strokeWidth={2.2} />
          <path d="M199 188 L209 188" stroke="#ECE8DF" strokeWidth={2.2} />

          {/* nose */}
          <path d="M180 170 Q184 176 179 176" fill="none" />

          {/* big carefree grin + teeth */}
          <path d="M150 190 Q180 222 210 190 Q180 199 150 190 Z" fill="#0b0b0c" stroke="#ECE8DF" strokeWidth={2.5} />
          <path d="M156 192 Q180 199 204 192" fill="none" stroke="#ECE8DF" strokeWidth={2} />

          {/* ================= Straw hat ================= */}
          {/* brim */}
          <path d="M90 116 Q180 94 270 116 Q180 140 90 116 Z" fill="#ECE8DF" />
          {/* crown */}
          <path d="M139 116 C137 78 154 62 180 62 C206 62 223 78 221 116 Z" fill="#ECE8DF" />
          {/* straw texture */}
          <path d="M150 112 Q153 86 168 70" stroke="#0b0b0c" strokeWidth={1.4} fill="none" />
          <path d="M180 114 L180 64" stroke="#0b0b0c" strokeWidth={1.4} fill="none" />
          <path d="M210 112 Q207 86 192 70" stroke="#0b0b0c" strokeWidth={1.4} fill="none" />
          <path d="M112 118 Q140 108 150 114" stroke="#0b0b0c" strokeWidth={1.2} fill="none" />
          <path d="M248 118 Q220 108 210 114" stroke="#0b0b0c" strokeWidth={1.2} fill="none" />
          {/* orange hat band */}
          <path d="M140 108 Q180 100 220 108 L220 116 Q180 108 140 116 Z" fill="#FF5A1F" stroke="none" />
          {/* brim + crown outline */}
          <path d="M90 116 Q180 94 270 116 Q180 140 90 116 Z" fill="none" />
          <path d="M139 116 C137 78 154 62 180 62 C206 62 223 78 221 116" fill="none" />

          {/* ================= Waving arm (high) ================= */}
          <g className="arm">
            {/* bare arm, raised high */}
            <path d="M128 302 L118 210 L134 112" fill="none" strokeWidth={8} />
            {/* open hand, fingers spread */}
            <g>
              <path d="M120 120 Q114 98 128 94 Q144 96 142 118 Z" fill="#0b0b0c" />
              <path d="M124 100 L120 80" />
              <path d="M131 96 L130 74" />
              <path d="M138 97 L142 76" />
              <path d="M143 102 L151 86" />
              <path d="M120 112 Q106 108 108 96" />
            </g>
          </g>
          {/* motion lines by the raised hand */}
          <g className="zip">
            <path d="M150 96 L162 88" strokeWidth={2.5} />
            <path d="M156 106 L170 102" strokeWidth={2.5} />
            <path d="M104 92 L92 86" strokeWidth={2.5} />
          </g>
        </g>
      </svg>
    </div>
  );
}

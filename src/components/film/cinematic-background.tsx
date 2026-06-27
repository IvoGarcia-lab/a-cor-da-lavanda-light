"use client";

import { useEffect } from "react";

/**
 * CinematicBackground — pure CSS, no canvas, no particles.
 *
 * Writes phase-driven CSS custom properties to :root based on scroll:
 *   --bg-r / --bg-g / --bg-b  (current phase color, 0-255)
 *   --phase    (0..3)
 *   --digital  (0..1, ramps during phases 2-3)
 *   --glitch   (0..1, ramps during phase 3)
 *
 * The actual visual layers (radial glow, scanlines, glitch slices) are
 * pure CSS in globals.css — fully GPU-composited, zero JS paint cost.
 */
export function CinematicBackground() {
  useEffect(() => {
    // Phase palette (memory -> shadow -> digital -> abyss)
    const COLORS: [number, number, number][] = [
      [222, 176, 110], // memory  · warm amber
      [126, 96, 150], // shadow  · muted violet
      [96, 138, 206], // digital · sterile blue
      [158, 128, 214], // abyss   · electric violet
    ];

    let anchors = [0, 0, 0, 0];
    const updateAnchors = () => {
      anchors = (["fase-1", "fase-2", "fase-3", "fase-4"] as const).map(
        (id) => {
          const el = document.getElementById(id);
          return el ? el.offsetTop : 0;
        }
      );
    };
    updateAnchors();
    const t1 = setTimeout(updateAnchors, 800);
    const t2 = setTimeout(updateAnchors, 2500);
    window.addEventListener("resize", updateAnchors);

    let target = 0;
    let current = 0;
    let raf = 0;
    let running = true;

    const onScroll = () => {
      const sy = window.scrollY + window.innerHeight * 0.4;
      const [a1, a2, a3, a4] = anchors;
      if (!a1 || !a4 || a4 <= a1) {
        target = 0;
        return;
      }
      if (sy <= a1) target = 0;
      else if (sy >= a4) target = 3;
      else if (sy < a2) target = (sy - a1) / (a2 - a1);
      else if (sy < a3) target = 1 + (sy - a2) / (a3 - a2);
      else target = 2 + (sy - a3) / (a4 - a3);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const root = document.documentElement;
    let lastR = -1;
    let lastG = -1;
    let lastB = -1;

    const tick = () => {
      if (!running) return;
      current += (target - current) * 0.06;
      const p = current;

      const i0 = Math.max(0, Math.min(3, Math.floor(p)));
      const i1 = Math.min(3, i0 + 1);
      const tt = p - i0;
      const r =
        COLORS[i0][0] + (COLORS[i1][0] - COLORS[i0][0]) * tt;
      const g =
        COLORS[i0][1] + (COLORS[i1][1] - COLORS[i0][1]) * tt;
      const b =
        COLORS[i0][2] + (COLORS[i1][2] - COLORS[i0][2]) * tt;
      const cr = Math.round(r);
      const cg = Math.round(g);
      const cb = Math.round(b);
      if (cr !== lastR || cg !== lastG || cb !== lastB) {
        root.style.setProperty("--bg-r", String(cr));
        root.style.setProperty("--bg-g", String(cg));
        root.style.setProperty("--bg-b", String(cb));
        lastR = cr;
        lastG = cg;
        lastB = cb;
      }
      const digital = Math.max(0, Math.min(1, (p - 1.4) / 1.6));
      const glitch = Math.max(0, Math.min(1, (p - 2.3) / 0.7));
      root.style.setProperty("--phase", p.toFixed(3));
      root.style.setProperty("--digital", digital.toFixed(3));
      root.style.setProperty("--glitch", glitch.toFixed(3));

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onVis = () => {
      running = !document.hidden;
      if (running) {
        raf = requestAnimationFrame(tick);
      } else {
        cancelAnimationFrame(raf);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("resize", updateAnchors);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVis);
      root.style.removeProperty("--bg-r");
      root.style.removeProperty("--bg-g");
      root.style.removeProperty("--bg-b");
      root.style.removeProperty("--phase");
      root.style.removeProperty("--digital");
      root.style.removeProperty("--glitch");
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden
    >
      {/* Phase-tinted radial glow */}
      <div className="absolute inset-0 cb-glow" />
      {/* CSS scanlines — fade in during digital phase */}
      <div className="absolute inset-0 cb-scanlines" />
      {/* CSS glitch slices — fade in during abyss phase */}
      <div className="absolute inset-0 cb-glitch" />
      <div className="absolute inset-0 cb-glitch cb-glitch--alt" />
    </div>
  );
}

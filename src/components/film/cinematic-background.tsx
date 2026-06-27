"use client";

import { useEffect, useRef } from "react";

/**
 * CinematicBackground — modern, performant, integrated.
 *
 * Architecture:
 *  - A single light <canvas> with ~18 simple particles (filled arcs, no sprites).
 *  - All glitch / scanline / grain effects are pure CSS overlays driven by
 *    CSS custom properties (--phase, --digital, --glitch, --bg-r/g/b) that
 *    this component writes to :root. Any section can therefore react to the
 *    same phase, making the background feel "integrated" with the content.
 *  - No getImageData / putImageData (the previous perf killer). Glitch slices
 *    are done with CSS clip-path animations on a tinted layer — GPU-accelerated.
 *  - Pause on tab hide; respects prefers-reduced-motion.
 */
export function CinematicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
    let w = 0;
    let h = 0;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // Phase palette (memory -> shadow -> digital -> abyss)
    const COLORS: [number, number, number][] = [
      [222, 176, 110], // memory  · warm amber
      [126, 96, 150], // shadow  · muted violet
      [96, 138, 206], // digital · sterile blue
      [158, 128, 214], // abyss   · electric violet
    ];

    // Light particle field
    const N = reduced ? 12 : 22;
    const particles = Array.from({ length: N }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00025,
      vy: -Math.random() * 0.00035 - 0.00008,
      r: 0.8 + Math.random() * 2.2,
      a: 0.18 + Math.random() * 0.32,
      ph: Math.random() * Math.PI * 2,
    }));

    // Section anchors
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

    const writeCSS = (p: number) => {
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
    };

    let raf = 0;
    let last = performance.now();
    let running = true;

    const frame = (now: number) => {
      if (!running) return;
      const dt = Math.min(50, now - last);
      last = now;

      current += (target - current) * 0.06;
      const p = current;
      writeCSS(p);

      const i0 = Math.max(0, Math.min(3, Math.floor(p)));
      const i1 = Math.min(3, i0 + 1);
      const tt = p - i0;
      const r =
        COLORS[i0][0] + (COLORS[i1][0] - COLORS[i0][0]) * tt;
      const g =
        COLORS[i0][1] + (COLORS[i1][1] - COLORS[i0][1]) * tt;
      const b =
        COLORS[i0][2] + (COLORS[i1][2] - COLORS[i0][2]) * tt;
      const cr = r | 0;
      const cg = g | 0;
      const cb = b | 0;

      // Trail fade — skip every other frame for perf (half the fillRect cost)
      ctx.globalCompositeOperation = "source-over";
      if ((now | 0) % 2 === 0) {
        ctx.fillStyle = "rgba(6, 4, 12, 0.6)";
        ctx.fillRect(0, 0, w, h);
      }

      // Particles (additive)
      const speedMult = 1 + Math.max(0, p - 1) * 1.3;
      ctx.globalCompositeOperation = "lighter";
      for (const pt of particles) {
        pt.x += pt.vx * speedMult * dt;
        pt.y += pt.vy * speedMult * dt;
        if (pt.y < -0.04) {
          pt.y = 1.04;
          pt.x = Math.random();
        }
        if (pt.y > 1.04) {
          pt.y = -0.04;
          pt.x = Math.random();
        }
        if (pt.x < -0.04) pt.x = 1.04;
        if (pt.x > 1.04) pt.x = -0.04;

        const flick = 0.55 + 0.45 * Math.sin(now * 0.001 + pt.ph);
        const a = pt.a * flick;
        const x = pt.x * w;
        const y = pt.y * h;

        ctx.fillStyle = `rgba(${cr},${cg},${cb},${a})`;
        ctx.beginPath();
        ctx.arc(x, y, pt.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const onVis = () => {
      running = !document.hidden;
      if (running) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      } else {
        cancelAnimationFrame(raf);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("resize", resize);
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
      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0" />
      {/* CSS scanlines — fade in during digital phase */}
      <div className="absolute inset-0 cb-scanlines" />
      {/* CSS glitch slices — fade in during abyss phase */}
      <div className="absolute inset-0 cb-glitch" />
      <div className="absolute inset-0 cb-glitch cb-glitch--alt" />
    </div>
  );
}

"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { PHASES } from "@/lib/film-data";

const phaseColors: Record<string, string> = {
  memory: "oklch(0.78 0.13 75)",
  shadow: "oklch(0.45 0.05 285)",
  digital: "oklch(0.62 0.14 230)",
  abyss: "oklch(0.55 0.16 295)",
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const yTitle = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const yContent = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const yRibbon = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacityRibbon = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const triggerPlay = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent("play-cinematic-video"));
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Background: layered gradients mimicking the four phases */}
      <motion.div
        style={{ scale, y }}
        className="absolute inset-0 -z-10"
        aria-hidden
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.10_0.04_285_/_0.6)] via-[oklch(0.07_0.05_295_/_0.4)] to-transparent" />
        <div
          className="absolute -top-1/4 -left-1/4 w-[80vw] h-[80vw] rounded-full opacity-20 blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, oklch(0.78 0.13 75 / 0.35), transparent 60%)",
          }}
        />
        <div
          className="absolute top-1/4 -right-1/4 w-[70vw] h-[70vw] rounded-full opacity-25 blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, oklch(0.55 0.16 295 / 0.45), transparent 60%)",
          }}
        />
        <div
          className="absolute -bottom-1/4 left-1/4 w-[60vw] h-[60vw] rounded-full opacity-20 blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, oklch(0.62 0.14 230 / 0.35), transparent 60%)",
          }}
        />
      </motion.div>

      {/* Viewfinder crosshairs & guideline grid overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-20">
        {/* Viewfinder Corners */}
        <div className="absolute top-24 left-8 w-6 h-6 border-t border-l border-foreground/60" />
        <div className="absolute top-24 right-8 w-6 h-6 border-t border-r border-foreground/60" />
        <div className="absolute bottom-24 left-8 w-6 h-6 border-b border-l border-foreground/60" />
        <div className="absolute bottom-24 right-8 w-6 h-6 border-b border-r border-foreground/60" />

        {/* Center Crosshair */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center">
          <div className="w-4 h-px bg-foreground/60" />
          <div className="h-4 w-px bg-foreground/60 absolute" />
        </div>

        {/* Grid Guidelines */}
        <div className="absolute top-0 bottom-0 left-1/3 w-px bg-foreground/[0.03]" />
        <div className="absolute top-0 bottom-0 right-1/3 w-px bg-foreground/[0.03]" />
        <div className="absolute left-0 right-0 top-1/3 h-px bg-foreground/[0.03]" />
        <div className="absolute left-0 right-0 bottom-1/3 h-px bg-foreground/[0.03]" />

        {/* Tech data readouts */}
        <div className="absolute bottom-24 left-8 font-mono text-[9px] uppercase tracking-widest text-muted-foreground/80 hidden xl:block">
          ISO 400 · f/2.8 · 1/50s · 80mm · 24fps
        </div>
        <div className="absolute bottom-24 right-8 font-mono text-[9px] uppercase tracking-widest text-muted-foreground/80 hidden xl:block">
          BAT 98% · CH1 -12dB · CH2 -12dB
        </div>
      </div>

      {/* Scan line */}
      <div className="scan-line" aria-hidden />

      {/* Top bar */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.4 }}
        className="absolute top-0 inset-x-0 z-30 px-6 md:px-12 pt-24 pb-6 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-lavender lavender-pulse" />
          <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Curta-metragem · 2024
          </span>
        </div>
        <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-muted-foreground hidden sm:block">
          120s · 4 planos · 1 ideia
        </span>
      </motion.header>

      {/* Main content */}
      <motion.div
        style={{ opacity }}
        className="relative z-20 px-6 md:px-12 max-w-7xl mx-auto w-full"
      >
        <motion.div style={{ y: yTitle }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.2 }}
            className="font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] text-lavender/80 mb-6 md:mb-10"
          >
            Entre a memória de Proust e a sombra de Jung
          </motion.div>

          <h1 className="font-[family-name:var(--font-display)] font-light leading-[0.92] tracking-tight">
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.5 }}
              className="block text-[18vw] md:text-[12vw] lg:text-[10rem] text-glow-lavender"
            >
              A Cor da
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.7 }}
              className="block text-[18vw] md:text-[12vw] lg:text-[10rem] italic text-glow-lavender"
              style={{
                background:
                  "linear-gradient(90deg, oklch(0.78 0.13 75), oklch(0.55 0.16 295) 50%, oklch(0.62 0.14 230))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Lavanda
            </motion.span>
          </h1>
        </motion.div>

        <motion.div style={{ y: yContent }} className="mt-8 md:mt-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 1.1 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-end"
          >
            <p className="md:col-span-7 font-[family-name:var(--font-display)] italic text-xl md:text-2xl lg:text-3xl leading-relaxed text-foreground/85 max-w-2xl">
              Uma anatomia cinematográfica de 120 segundos. Quatro fases. Uma
              ideia que se dissolve no reflexo de um ecrã.
            </p>
            <div className="md:col-span-5 md:col-start-9 space-y-2">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                A ideia...
              </div>
              <div className="font-[family-name:var(--font-display)] italic text-2xl md:text-3xl text-lavender text-glow-lavender">
                morreu no vidro.
                <span className="blink ml-1 text-lavender">|</span>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.4 }}
            className="mt-12 md:mt-16 flex flex-col sm:flex-row items-center gap-4 w-full"
          >
            <button
              onClick={triggerPlay}
              className="group relative inline-flex items-center gap-3 px-8 py-3.5 bg-lavender text-background hover:bg-white hover:text-black transition-all duration-500 rounded-full font-semibold shadow-[0_0_30px_rgba(158,128,214,0.4)] focus:outline-none w-full sm:w-auto justify-center"
            >
              <span className="text-xs">▶</span>
              <span className="font-mono text-xs uppercase tracking-[0.25em]">
                Ver o Filme (94s)
              </span>
            </button>
            <a
              href="#manifesto"
              className="group relative inline-flex items-center gap-2 px-6 py-3 border border-white/20 hover:border-lavender transition-all duration-500 rounded-full w-full sm:w-auto justify-center"
            >
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground group-hover:text-foreground">
                Manifesto
              </span>
              <span className="transition-transform duration-500 group-hover:translate-y-1 text-muted-foreground group-hover:text-foreground">
                ↓
              </span>
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Phase timeline ribbon at bottom */}
      <motion.div
        style={{ y: yRibbon, opacity: opacityRibbon }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 1.6 }}
        className="absolute bottom-0 inset-x-0 z-20 px-6 md:px-12 pb-6 md:pb-8 pointer-events-auto"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-4 gap-2 md:gap-4">
            {PHASES.map((p, i) => (
              <motion.a
                key={p.id}
                href={`#fase-${p.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.8 + i * 0.12 }}
                className="group block relative"
              >
                <div
                  className="h-1 md:h-1.5 w-full rounded-full transition-all duration-700 group-hover:h-2.5"
                  style={{
                    background: phaseColors[p.color],
                    boxShadow: `0 0 20px ${phaseColors[p.color]}`,
                  }}
                />
                <div className="mt-3 hidden md:block">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {p.timecode}
                  </div>
                  <div className="font-[family-name:var(--font-display)] italic text-sm text-foreground/70 group-hover:text-foreground transition-colors">
                    {p.name}
                  </div>
                </div>
                <div className="mt-2 md:hidden font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                  {p.index}
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

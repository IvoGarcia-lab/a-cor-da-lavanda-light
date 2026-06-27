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
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.10_0.04_285)] via-[oklch(0.07_0.05_295)] to-[oklch(0.05_0.02_285)]" />
        <div
          className="absolute -top-1/4 -left-1/4 w-[80vw] h-[80vw] rounded-full opacity-40 blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, oklch(0.78 0.13 75 / 0.35), transparent 60%)",
          }}
        />
        <div
          className="absolute top-1/4 -right-1/4 w-[70vw] h-[70vw] rounded-full opacity-50 blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, oklch(0.55 0.16 295 / 0.45), transparent 60%)",
          }}
        />
        <div
          className="absolute -bottom-1/4 left-1/4 w-[60vw] h-[60vw] rounded-full opacity-40 blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, oklch(0.62 0.14 230 / 0.35), transparent 60%)",
          }}
        />
      </motion.div>

      {/* Scan line */}
      <div className="scan-line" aria-hidden />

      {/* Top bar */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.4 }}
        className="absolute top-0 inset-x-0 z-30 px-6 md:px-12 py-6 flex items-center justify-between"
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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 1.1 }}
          className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-end"
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
          className="mt-12 md:mt-16 flex flex-col sm:flex-row items-start sm:items-center gap-4"
        >
          <a
            href="#manifesto"
            className="group relative inline-flex items-center gap-3 px-6 py-3 border border-lavender/40 hover:border-lavender transition-all duration-500 overflow-hidden"
          >
            <span className="absolute inset-0 bg-lavender/0 group-hover:bg-lavender/10 transition-colors duration-500" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] relative z-10">
              Descer ao abismo
            </span>
            <span className="relative z-10 transition-transform duration-500 group-hover:translate-y-1">
              ↓
            </span>
          </a>
          <a
            href="#video"
            className="group inline-flex items-center gap-3 px-2 py-3 text-muted-foreground hover:text-lavender transition-colors duration-500"
          >
            <span className="w-10 h-10 rounded-full border border-current flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              ▶
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.3em]">
              Ver o filme
            </span>
          </a>
        </motion.div>
      </motion.div>

      {/* Phase timeline ribbon at bottom */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 1.6 }}
        className="absolute bottom-0 inset-x-0 z-20 px-6 md:px-12 pb-6 md:pb-8"
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

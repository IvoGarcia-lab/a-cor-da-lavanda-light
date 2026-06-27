"use client";

import { motion } from "framer-motion";
import { SOUND_EVOLUTION } from "@/lib/film-data";

const colorMap: Record<string, { c: string; bg: string }> = {
  memory: {
    c: "oklch(0.82 0.13 75)",
    bg: "linear-gradient(180deg, oklch(0.78 0.13 75 / 0.15), transparent)",
  },
  shadow: {
    c: "oklch(0.70 0.06 285)",
    bg: "linear-gradient(180deg, oklch(0.45 0.05 285 / 0.35), transparent)",
  },
  digital: {
    c: "oklch(0.70 0.14 230)",
    bg: "linear-gradient(180deg, oklch(0.62 0.14 230 / 0.18), transparent)",
  },
  abyss: {
    c: "oklch(0.72 0.16 295)",
    bg: "linear-gradient(180deg, oklch(0.55 0.16 295 / 0.22), transparent)",
  },
};

// Deterministic pseudo-random heights for waveform bars
function genBars(seed: number, count: number, intensity: number) {
  const bars: number[] = [];
  for (let i = 0; i < count; i++) {
    const v =
      (Math.sin(i * 0.7 + seed) * 0.4 +
        Math.sin(i * 0.21 + seed * 1.7) * 0.3 +
        Math.sin(i * 1.9 + seed * 0.5) * 0.2 +
        0.5) *
      intensity;
    bars.push(Math.max(0.1, Math.min(1, v)));
  }
  return bars;
}

export function EvolucaoSonora() {
  return (
    <section
      id="som"
      className="relative py-32 md:py-48 px-6 md:px-12 overflow-hidden border-y border-border/30"
    >
      <div
        className="absolute inset-0 -z-10 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, oklch(0.25 0.06 295 / 0.5), transparent 70%)",
        }}
        aria-hidden
      />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] text-lavender/70 mb-10 flex items-center gap-4"
        >
          <span className="h-px w-12 bg-lavender/40" />
          Evolução sonora
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 md:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.1, delay: 0.1 }}
            className="lg:col-span-7 font-[family-name:var(--font-display)] font-light text-5xl md:text-7xl leading-[0.95] tracking-tight"
          >
            Do silêncio orgânico{" "}
            <span className="italic text-lavender">ao corte para negro.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.3 }}
            className="lg:col-span-5 lg:col-start-8 self-end text-base md:text-lg text-muted-foreground leading-relaxed"
          >
            A onda sonora acompanha a degradação narrativa. Ondas suaves e
            amareladas cedem ao zumbido grave, depois ao ruído digital, e por
            fim ao colapso fragmentado — antes do silêncio absoluto aos 120
            segundos.
          </motion.p>
        </div>

        {/* Waveform visualization */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1 }}
          className="film-frame p-6 md:p-10"
        >
          {/* Time axis */}
          <div className="flex items-center justify-between mb-6 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            <span>0:00</span>
            <span>0:40</span>
            <span>1:20</span>
            <span>1:55</span>
            <span className="text-lavender">2:00 · corte</span>
          </div>

          {/* 4-phase waveform strips */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-border/30 border border-border/30">
            {SOUND_EVOLUTION.map((phase, i) => {
              const colors = colorMap[phase.color];
              const bars = genBars(i + 1, 40, 0.4 + i * 0.2);
              return (
                <div
                  key={phase.phase}
                  className="relative bg-background/60 p-5 md:p-6"
                  style={{ background: colors.bg }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{
                        background: colors.c,
                        boxShadow: `0 0 10px ${colors.c}`,
                      }}
                    />
                    <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground">
                      Fase {phase.phase}
                    </span>
                  </div>

                  {/* Waveform */}
                  <div className="flex items-end gap-[2px] h-24 md:h-32 mb-4">
                    {bars.map((h, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: h }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.6,
                          delay: 0.3 + idx * 0.015,
                          ease: "easeOut",
                        }}
                        className="flex-1 origin-bottom rounded-sm"
                        style={{
                          height: "100%",
                          background: colors.c,
                          opacity: 0.4 + h * 0.6,
                          transform: `scaleY(${h})`,
                        }}
                      />
                    ))}
                  </div>

                  <div
                    className="font-[family-name:var(--font-display)] italic text-2xl md:text-3xl mb-1"
                    style={{ color: colors.c }}
                  >
                    {phase.label}
                  </div>
                  <p className="text-xs text-foreground/70 leading-relaxed">
                    {phase.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Final black */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-px bg-background border border-border/30 p-6 md:p-8 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-px h-12 bg-lavender/40" />
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-1">
                  Corte para negro · 120s
                </div>
                <div className="font-[family-name:var(--font-display)] italic text-2xl md:text-3xl text-lavender text-glow-lavender">
                  Silêncio absoluto.
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-lavender/30"
                  style={{ height: 4 + (i % 3) * 2 }}
                />
              ))}
              <span className="ml-3 font-mono text-[10px] text-muted-foreground">
                ─────
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

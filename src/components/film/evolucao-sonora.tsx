"use client";

import { motion } from "framer-motion";
import { SOUND_EVOLUTION } from "@/lib/film-data";
import { useState, useEffect } from "react";

const colorMap: Record<string, { c: string; bg: string; pulseGlow: string }> = {
  memory: {
    c: "oklch(0.82 0.13 75)",
    bg: "linear-gradient(180deg, oklch(0.78 0.13 75 / 0.15), transparent)",
    pulseGlow: "shadow-[0_0_15px_rgba(212,165,116,0.6)]",
  },
  shadow: {
    c: "oklch(0.70 0.06 285)",
    bg: "linear-gradient(180deg, oklch(0.45 0.05 285 / 0.35), transparent)",
    pulseGlow: "shadow-[0_0_15px_rgba(90,74,107,0.6)]",
  },
  digital: {
    c: "oklch(0.70 0.14 230)",
    bg: "linear-gradient(180deg, oklch(0.62 0.14 230 / 0.18), transparent)",
    pulseGlow: "shadow-[0_0_15px_rgba(74,124,154,0.6)]",
  },
  abyss: {
    c: "oklch(0.72 0.16 295)",
    bg: "linear-gradient(180deg, oklch(0.55 0.16 295 / 0.22), transparent)",
    pulseGlow: "shadow-[0_0_15px_rgba(107,91,142,0.6)]",
  },
};

// Deterministic pseudo-random heights for waveform bars.
function genBars(seed: number, count: number, intensity: number) {
  const bars: number[] = [];
  for (let i = 0; i < count; i++) {
    const v =
      (Math.sin(i * 0.7 + seed) * 0.4 +
        Math.sin(i * 0.21 + seed * 1.7) * 0.3 +
        Math.sin(i * 1.9 + seed * 0.5) * 0.2 +
        0.5) *
      intensity;
    bars.push(Math.round(Math.max(0.1, Math.min(1, v)) * 1000) / 1000);
  }
  return bars;
}

export function EvolucaoSonora() {
  const [playingPhase, setPlayingPhase] = useState<number | null>(null);
  const [activeScrollPhase, setActiveScrollPhase] = useState<number>(0);

  useEffect(() => {
    const onScroll = () => {
      const phase = (window as any).__currentPhase || 0;
      const newPhase = Math.max(0, Math.min(3, Math.floor(phase)));
      setActiveScrollPhase((prev) => (prev !== newPhase ? newPhase : prev));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const playSoundPreview = (phaseIndex: number) => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      gainNode.connect(ctx.destination);
      osc.connect(gainNode);
      
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.1);
      
      if (phaseIndex === 0) {
        osc.type = "sine";
        osc.frequency.setValueAtTime(60, ctx.currentTime);
      } else if (phaseIndex === 1) {
        osc.type = "sine";
        osc.frequency.setValueAtTime(40, ctx.currentTime);
        
        // add overtone
        const osc2 = ctx.createOscillator();
        osc2.type = "sine";
        osc2.frequency.setValueAtTime(120, ctx.currentTime);
        osc2.connect(gainNode);
        osc2.start();
        setTimeout(() => {
          try { osc2.stop(); } catch(e){}
        }, 1500);
      } else if (phaseIndex === 2) {
        osc.type = "square";
        osc.frequency.setValueAtTime(200, ctx.currentTime);
      } else {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(80, ctx.currentTime);
      }
      
      osc.start();
      setPlayingPhase(phaseIndex);
      
      // fade out
      gainNode.gain.setValueAtTime(0.3, ctx.currentTime + 1.2);
      gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.5);
      
      setTimeout(() => {
        try {
          osc.stop();
          ctx.close();
        } catch (e) {}
        setPlayingPhase(null);
      }, 1500);
    } catch (e) {
      console.error(e);
    }
  };

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
            <span className="italic text-lavender text-glow-lavender">ao corte para negro.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.3 }}
            className="lg:col-span-5 lg:col-start-8 self-end text-base md:text-lg text-muted-foreground leading-relaxed"
          >
            A onda sonora acompanha a degradação narrativa.
            <br />
            Ondas suaves e amareladas cedem ao zumbido grave, depois ao ruído digital, e por fim ao colapso fragmentado — antes do silêncio absoluto aos 120 segundos.
            <span className="block mt-4 text-xs font-mono tracking-wider text-lavender/80">
              [ Clica numa secção de ondas para ouvir uma amostra ]
            </span>
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
            <span>0:46</span>
            <span>1:16</span>
            <span>1:23</span>
            <span className="text-lavender">1:34 · corte</span>
          </div>

          {/* 4-phase waveform strips */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-border/30 border border-border/30">
            {SOUND_EVOLUTION.map((phase, i) => {
              const colors = colorMap[phase.color];
              const bars = genBars(i + 1, 40, 0.4 + i * 0.2);
              const isActive = activeScrollPhase === i;
              const isPlaying = playingPhase === i;

              return (
                <div
                  key={phase.phase}
                  onClick={() => playSoundPreview(i)}
                  className={`relative p-5 md:p-6 cursor-pointer select-none transition-all duration-500 border-b-2 ${
                    isActive ? "opacity-100" : "opacity-70 hover:opacity-90"
                  }`}
                  style={{
                    background: colors.bg,
                    borderColor: isPlaying ? colors.c : isActive ? "rgba(255, 255, 255, 0.2)" : "transparent",
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{
                        background: colors.c,
                        boxShadow: `0 0 10px ${colors.c}`,
                      }}
                    />
                    <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground">
                      {isPlaying ? "▶ A TOCAR..." : `Fase ${phase.phase}`}
                    </span>
                  </div>

                  {/* Waveform container */}
                  <div className="flex items-end gap-[2px] h-24 md:h-32 mb-4 overflow-hidden">
                    {bars.map((h, idx) => {
                      const opacity = Math.round((0.4 + h * 0.6) * 1000) / 1000;
                      return (
                        <motion.div
                          key={idx}
                          initial={{ scaleY: 0 }}
                          whileInView={{ scaleY: h }}
                          viewport={{ once: true }}
                          animate={
                            isPlaying
                              ? {
                                  scaleY: [h, h * 1.3, h],
                                  transition: {
                                    repeat: Infinity,
                                    duration: 0.6,
                                    delay: idx * 0.005,
                                    ease: "easeInOut",
                                  },
                                }
                              : {
                                  scaleY: [h, h * 1.06, h],
                                  transition: {
                                    repeat: Infinity,
                                    duration: 3 + idx * 0.05,
                                    ease: "easeInOut",
                                  },
                                }
                          }
                          transition={{
                            duration: 0.6,
                            delay: 0.3 + idx * 0.015,
                            ease: "easeOut",
                          }}
                          className="flex-1 origin-bottom rounded-sm transition-all duration-300 group-hover:scale-y-110"
                          style={{
                            height: "100%",
                            backgroundColor: colors.c,
                            opacity,
                          }}
                        />
                      );
                    })}
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

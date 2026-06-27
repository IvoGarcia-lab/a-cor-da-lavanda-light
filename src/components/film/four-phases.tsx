"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { PHASES, type Phase } from "@/lib/film-data";

const phaseBg: Record<Phase["color"], string> = {
  memory: "bg-phase-memory",
  shadow: "bg-phase-shadow",
  digital: "bg-phase-digital",
  abyss: "bg-phase-abyss",
};

const phaseText: Record<Phase["color"], string> = {
  memory: "text-[oklch(0.82_0.13_75)]",
  shadow: "text-[oklch(0.70_0.06_285)]",
  digital: "text-[oklch(0.70_0.14_230)]",
  abyss: "text-[oklch(0.72_0.16_295)]",
};

const phaseGlow: Record<Phase["color"], string> = {
  memory: "text-glow-memory",
  shadow: "",
  digital: "text-glow-digital",
  abyss: "text-glow-abyss",
};

const phaseShadow: Record<Phase["color"], string> = {
  memory: "oklch(0.78 0.13 75)",
  shadow: "oklch(0.45 0.05 285)",
  digital: "oklch(0.62 0.14 230)",
  abyss: "oklch(0.55 0.16 295)",
};

export function FourPhases() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // A progress bar that fills as we move through the 4 phases
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="fases"
      ref={sectionRef}
      className="relative"
    >
      {/* Sticky progress indicator */}
      <div className="sticky top-0 z-30 h-1 bg-border/30 backdrop-blur-sm">
        <motion.div
          style={{
            width: progressWidth,
            background:
              "linear-gradient(90deg, oklch(0.78 0.13 75), oklch(0.45 0.05 285) 33%, oklch(0.62 0.14 230) 66%, oklch(0.55 0.16 295))",
          }}
          className="h-full"
        />
      </div>

      {/* Section header */}
      <div className="px-6 md:px-12 py-20 md:py-32 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] text-lavender/70 mb-10 flex items-center gap-4"
        >
          <span className="h-px w-12 bg-lavender/40" />
          Anatomia · 120 segundos
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.1, delay: 0.1 }}
          className="font-[family-name:var(--font-display)] font-light text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight max-w-4xl"
        >
          Quatro fases.{" "}
          <span className="italic text-lavender">Uma descida.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-8 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed"
        >
          Do dourado orgânico do poente ao corte abrupto para negro. Cada plano
          é uma escolha técnica que serve uma degradação narrativa: a passagem
          da memória à anestesia, da textura ao reflexo, do silêncio ao ruído.
        </motion.p>
      </div>

      {/* Phase blocks */}
      <div className="space-y-0">
        {PHASES.map((phase, i) => (
          <PhaseBlock key={phase.id} phase={phase} index={i} />
        ))}
      </div>
    </section>
  );
}

function PhaseBlock({ phase, index }: { phase: Phase; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

  return (
    <div
      id={`fase-${phase.id}`}
      ref={ref}
      className={`relative scroll-mt-20 ${phaseBg[phase.color]} border-y border-border/30`}
    >
      <div className="px-6 md:px-12 py-20 md:py-32 max-w-7xl mx-auto">
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start ${
            isEven ? "" : "lg:[direction:rtl]"
          }`}
        >
          {/* Left: phase number + timecode */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1 }}
            className="lg:col-span-4 lg:[direction:ltr]"
          >
            <div
              className={`font-[family-name:var(--font-display)] font-light text-[28vw] md:text-[14rem] lg:text-[12rem] leading-[0.8] tracking-tighter ${phaseText[phase.color]} ${phaseGlow[phase.color]}`}
            >
              {phase.index}
            </div>
            <div className="mt-4 flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  background: phaseShadow[phase.color],
                  boxShadow: `0 0 20px ${phaseShadow[phase.color]}`,
                }}
              />
              <span className="font-mono text-xs md:text-sm uppercase tracking-[0.3em] text-muted-foreground">
                {phase.timecode}
              </span>
              <span className="font-mono text-xs text-muted-foreground/60">
                · {phase.duration}
              </span>
            </div>
            <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/70">
              {phase.theme}
            </div>
          </motion.div>

          {/* Right: content */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, delay: 0.1 }}
            className="lg:col-span-8 lg:[direction:ltr] space-y-8"
          >
            <div>
              <h3 className="font-[family-name:var(--font-display)] font-light text-4xl md:text-6xl leading-[1.05] tracking-tight">
                {phase.name}
              </h3>
              <div
                className={`mt-2 font-[family-name:var(--font-display)] italic text-xl md:text-2xl ${phaseText[phase.color]}`}
              >
                {phase.subtitle}
              </div>
            </div>

            {/* Quote */}
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative pl-6 border-l-2"
              style={{ borderColor: phaseShadow[phase.color] }}
            >
              <p className="font-[family-name:var(--font-display)] italic text-2xl md:text-4xl leading-snug">
                “{phase.quote}”
              </p>
              <footer className="mt-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                — {phase.quoteAuthor}
              </footer>
            </motion.blockquote>

            {/* Description */}
            <p className="text-base md:text-lg text-foreground/80 leading-relaxed max-w-2xl">
              {phase.description}
            </p>

            {/* Technical specs grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-border/30 border border-border/30">
              {[
                { l: "Câmara", v: phase.camera },
                { l: "Lente", v: phase.lens },
                { l: "Temperatura", v: phase.temperature },
                { l: "Iluminação", v: phase.light },
                { l: "Som", v: phase.sound },
                { l: "Voz", v: phase.voice },
                { l: "Símbolo", v: phase.symbol },
                { l: "Movimento", v: phase.movement },
              ].map((s) => (
                <div
                  key={s.l}
                  className="bg-background/60 backdrop-blur-sm p-4 md:p-5 hover:bg-card/50 transition-colors"
                >
                  <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground mb-1.5">
                    {s.l}
                  </div>
                  <div className="text-sm text-foreground/90 leading-snug">
                    {s.v}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

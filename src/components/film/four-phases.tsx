"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { PHASES, type Phase } from "@/lib/film-data";

const phaseBg: Record<Phase["color"], string> = {
  memory: "bg-phase-memory",
  shadow: "bg-phase-shadow",
  digital: "bg-phase-digital",
  abyss: "bg-phase-abyss",
};

const phaseBgImages: Record<Phase["color"], string> = {
  memory: "/film/frame-1.jpg",
  shadow: "/film/frame-3.jpg",
  digital: "/film/frame-5.jpg",
  abyss: "/film/frame-6.jpg",
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

const phaseOklch: Record<Phase["color"], string> = {
  memory: "oklch(0.78 0.13 75)",
  shadow: "oklch(0.30 0.04 285)",
  digital: "oklch(0.62 0.14 230)",
  abyss: "oklch(0.45 0.16 295)",
};

const phaseTimes = {
  memory: { start: 0, end: 45, pctStart: "0%", pctWidth: "47.9%" },
  shadow: { start: 46, end: 75, pctStart: "47.9%", pctWidth: "31.9%" },
  digital: { start: 76, end: 82, pctStart: "79.8%", pctWidth: "7.4%" },
  abyss: { start: 83, end: 94, pctStart: "87.2%", pctWidth: "12.8%" },
};

// Advanced typography morphing between organic/cursive and cold digital/tech fonts
const phaseTitleFont: Record<Phase["color"], string> = {
  memory: "font-display italic font-light tracking-wide text-4xl md:text-6xl lg:text-7xl",
  shadow: "font-display font-normal tracking-normal text-4xl md:text-5xl lg:text-6xl text-foreground/90",
  digital: "font-sans font-bold tracking-tight uppercase text-3xl md:text-5xl lg:text-6xl",
  abyss: "font-mono font-bold tracking-widest uppercase text-2xl md:text-4xl lg:text-5xl",
};

const phaseQuoteFont: Record<Phase["color"], string> = {
  memory: "font-display italic font-light text-2xl md:text-4xl leading-snug tracking-wide",
  shadow: "font-display italic font-normal text-2xl md:text-4xl leading-snug tracking-normal text-muted-foreground/80",
  digital: "font-sans font-semibold text-xl md:text-3xl leading-snug tracking-tight text-foreground",
  abyss: "font-mono font-bold text-lg md:text-2xl leading-normal tracking-wider uppercase text-[oklch(0.72_0.16_295)]",
};

const phaseDescFont: Record<Phase["color"], string> = {
  memory: "font-display text-lg md:text-xl font-light text-foreground/80 leading-relaxed",
  shadow: "font-sans text-base md:text-lg font-light text-foreground/75 leading-relaxed",
  digital: "font-sans text-sm md:text-base font-normal text-foreground/75 leading-normal tracking-tight",
  abyss: "font-mono text-xs md:text-sm text-foreground/70 leading-relaxed tracking-normal",
};

export function FourPhases() {
  const sectionRef = useRef<HTMLElement>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="fases" ref={sectionRef} className="relative">
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
          Anatomia · 94 segundos
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.1, delay: 0.1 }}
          className="font-display font-light text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight max-w-4xl"
        >
          Quatro fases.{" "}
          <span className="italic text-lavender">Uma descida.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-8 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed animate-pulse"
        >
          Do dourado orgânico do poente ao corte abrupto para negro. Cada plano
          é uma escolha técnica que serve uma degradação narrativa: a passagem
          da memória à anestesia, da textura ao reflexo, do silêncio ao ruído.
          <span className="block mt-4 text-xs font-mono tracking-wider text-lavender/80">
            [ Clica numa fase para a explorar em profundidade ]
          </span>
        </motion.p>
      </div>

      {/* Phase blocks */}
      <div className="space-y-0">
        {PHASES.map((phase, i) => (
          <PhaseBlock
            key={phase.id}
            phase={phase}
            index={i}
            isExpanded={expandedId === phase.id}
            onToggle={() => setExpandedId(expandedId === phase.id ? null : phase.id)}
          />
        ))}
      </div>
    </section>
  );
}

function PhaseBlock({
  phase,
  index,
  isExpanded,
  onToggle,
}: {
  phase: Phase;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;
  const timeInfo = phaseTimes[phase.color];

  return (
    <div
      id={`fase-${phase.id}`}
      ref={ref}
      onClick={onToggle}
      className={`relative scroll-mt-[160px] ${phaseBg[phase.color]} border-y border-border/30 cursor-pointer group overflow-hidden transition-colors duration-500`}
    >
      {/* Cinematic Background Image for Phase */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-[0.40] group-hover:opacity-[0.62] mix-blend-luminosity transition-all duration-[1000ms] ease-out">
        <img
          src={phaseBgImages[phase.color]}
          alt=""
          className="w-full h-full object-cover object-center scale-105 group-hover:scale-100 transition-transform duration-[1200ms] ease-out"
        />
        {/* Soft Vignettes */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      <div className="relative z-10 px-6 md:px-12 py-20 md:py-32 max-w-7xl mx-auto">
        {/* Hover Hint */}
        <div className="absolute top-4 right-6 font-mono text-[9px] uppercase tracking-[0.25em] text-lavender/40 group-hover:text-lavender transition-colors duration-300 pointer-events-none">
          {isExpanded ? "✕ Fechar detalhe" : "➔ Clicar para explorar"}
        </div>

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
              className={`font-display font-light text-[28vw] md:text-[14rem] lg:text-[12rem] leading-[0.8] tracking-tighter ${phaseText[phase.color]} ${phaseGlow[phase.color]}`}
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
              {/* Morphed Title */}
              <h3 className={`${phaseTitleFont[phase.color]} leading-[1.05] tracking-tight`}>
                {phase.name}
              </h3>
              <div
                className={`mt-2 font-display italic text-xl md:text-2xl ${phaseText[phase.color]}`}
              >
                {phase.subtitle}
              </div>
            </div>

            {/* Morphed Quote */}
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative pl-6 border-l-2"
              style={{ borderColor: phaseShadow[phase.color] }}
            >
              <p className={`${phaseQuoteFont[phase.color]} leading-snug`}>
                “{phase.quote}”
              </p>
              <footer className="mt-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                — {phase.quoteAuthor}
              </footer>
            </motion.blockquote>

            {/* Morphed Description */}
            <p className={phaseDescFont[phase.color]}>
              {phase.description}
            </p>

            {/* Technical specs grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-border/30 border border-border/30 font-mono">
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
                  <div className="text-xs text-foreground/95 leading-snug">
                    {s.v}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Expanded Panel Details */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              onClick={(e) => e.stopPropagation()} // Stop click propagation to parent
              className="overflow-hidden mt-12 pt-12 border-t border-border/30 lg:col-span-12 w-full cursor-default"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* 1. Timecode indicator bar */}
                <div className="lg:col-span-12 space-y-2 mb-6">
                  <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                    <span>Posição na narrativa</span>
                    <span className="text-foreground">{phase.timecode} / 94s</span>
                  </div>
                  <div className="h-1.5 w-full bg-border/20 rounded-full relative overflow-hidden">
                    <div
                      className="absolute top-0 bottom-0 h-full rounded-full transition-all duration-500"
                      style={{
                        left: timeInfo.pctStart,
                        width: timeInfo.pctWidth,
                        backgroundColor: phaseShadow[phase.color],
                        boxShadow: `0 0 12px ${phaseShadow[phase.color]}`,
                      }}
                    />
                  </div>
                </div>

                {/* 2. Color Palette details */}
                <div className="lg:col-span-4 space-y-6">
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-lavender/70 mb-3 block">
                      Cromia & Atmosfera
                    </span>
                    <h4 className="font-display text-2xl mb-4 italic">
                      Paleta de Cor da Fase
                    </h4>
                  </div>
                  
                  <div className="flex gap-4">
                    {/* Primary Color Sample */}
                    <div className="flex flex-col items-center">
                      <div
                        className="w-14 h-14 rounded-md border border-white/10 mb-2 shadow-lg"
                        style={{ backgroundColor: phaseOklch[phase.color] }}
                      />
                      <span className="font-mono text-[10px] text-foreground font-semibold">
                        {phase.hex}
                      </span>
                      <span className="font-mono text-[8px] text-muted-foreground/60">
                        {phase.color}
                      </span>
                    </div>

                    {/* OKLCH spec details */}
                    <div className="flex-1 space-y-2 font-mono text-xs py-1">
                      <div className="flex justify-between border-b border-border/10 pb-1">
                        <span className="text-muted-foreground/75">Val:</span>
                        <span className="text-foreground">{phaseOklch[phase.color]}</span>
                      </div>
                      <div className="flex justify-between border-b border-border/10 pb-1">
                        <span className="text-muted-foreground/75">Temp:</span>
                        <span className="text-foreground">{phase.temperature}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Staggered letter typewriter quote */}
                <div className="lg:col-span-8 space-y-6">
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-lavender/70 mb-3 block">
                      Subtexto e Reflexão
                    </span>
                    <h4 className="font-display text-2xl mb-4 italic">
                      Ficha Narrativa
                    </h4>
                  </div>

                  <div className="p-6 bg-background/40 border border-border/20 rounded-md">
                    {/* Morphed Quote Typewriter */}
                    <p className={`${phaseQuoteFont[phase.color]} mb-4`}>
                      {phase.quote.split(" ").map((word, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: i * 0.08 }}
                          className="inline-block mr-1.5"
                        >
                          {word}
                        </motion.span>
                      ))}
                    </p>
                    <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
                      — {phase.quoteAuthor} · Plano {phase.index}
                    </div>
                  </div>
                </div>

                {/* Close Button */}
                <div className="lg:col-span-12 flex justify-end mt-4">
                  <button
                    onClick={onToggle}
                    className="font-mono text-xs uppercase tracking-wider text-muted-foreground hover:text-lavender transition-colors py-2 px-4 border border-border/30 hover:border-lavender/30 rounded focus:outline-none"
                  >
                    ✕ Fechar Detalhes
                  </button>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

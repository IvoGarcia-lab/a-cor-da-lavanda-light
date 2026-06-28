"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FINAL_QUOTE } from "@/lib/film-data";

export function Sintese() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);

  const yRing1 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const yRing2 = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const yRing3 = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const yRing4 = useTransform(scrollYProgress, [0, 1], [10, -10]);

  const quoteScale = useTransform(scrollYProgress, [0, 0.7], [0.92, 1.0]);

  const yCard1 = useTransform(scrollYProgress, [0, 1], [0, -15]);
  const yCard2 = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const yCard3 = useTransform(scrollYProgress, [0, 1], [0, -45]);
  const yCards = [yCard1, yCard2, yCard3];

  return (
    <section
      id="sintese"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-32 md:py-48 px-6 md:px-12"
    >
      {/* Deep abyss backdrop with frame-7.jpg in background */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 -z-10"
        aria-hidden
      >
        {/* Parallax background image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.6] filter grayscale sepia-[20%] contrast-110"
          style={{ backgroundImage: "url('/film/frame-7.jpg')" }}
        />
        {/* Soft edge blending gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.07_0.012_285)] via-transparent to-[oklch(0.07_0.012_285)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.07_0.012_285)] via-transparent to-[oklch(0.07_0.012_285)]" />

        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] rounded-full opacity-40 blur-[140px]"
          style={{
            background:
              "radial-gradient(circle, oklch(0.45 0.16 295 / 0.3), transparent 60%)",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] rounded-full opacity-50 blur-[100px]"
          style={{
            background:
              "radial-gradient(circle, oklch(0.62 0.14 230 / 0.2), transparent 60%)",
          }}
        />
      </motion.div>

      {/* Concentric slow-spinning ring (calibration symbol) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none -z-10 w-[80vw] md:w-[60vw] aspect-square">
        <motion.div style={{ y: yRing1 }} className="absolute inset-0 slow-spin rounded-full border border-lavender/10" />
        <motion.div style={{ y: yRing2 }} className="absolute inset-[10%] slow-spin-reverse rounded-full border border-lavender/8" />
        <motion.div style={{ y: yRing3 }} className="absolute inset-[25%] slow-spin rounded-full border border-lavender/8" />
        <motion.div style={{ y: yRing4 }} className="absolute inset-[40%] slow-spin-reverse rounded-full border border-lavender/8" />
      </div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-5xl mx-auto text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] text-lavender/70 mb-12 md:mb-16 flex items-center justify-center gap-4"
        >
          <span className="h-px w-12 bg-lavender/40" />
          Síntese · 94s
          <span className="h-px w-12 bg-lavender/40" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="font-mono text-xs uppercase tracking-[0.4em] text-muted-foreground mb-6"
        >
          A integração falhou.
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.6, delay: 0.3, ease: "easeOut" }}
          className="font-[family-name:var(--font-display)] font-light text-6xl md:text-8xl lg:text-9xl leading-[0.95] tracking-tight text-glow-lavender"
        >
          <motion.span style={{ scale: quoteScale, display: "block" }}>
            <span className="italic">{FINAL_QUOTE.text.split("...")[0]}</span>
            <span className="text-lavender">...</span>
            <br />
            <span
              style={{
                background:
                  "linear-gradient(90deg, oklch(0.78 0.13 75), oklch(0.55 0.16 295) 50%, oklch(0.62 0.14 230))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
              className="italic"
            >
              {FINAL_QUOTE.text.split("...")[1]}
            </span>
          </motion.span>
        </motion.h2>

        {/* The reconciliation that did not happen */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="mt-20 md:mt-28 grid grid-cols-3 gap-8 md:gap-12 max-w-3xl mx-auto bg-transparent border-0"
        >
          {[
            {
              k: "Memória",
              v: "Proust",
              c: "oklch(0.78 0.13 75)",
              s: "gatilho",
            },
            {
              k: "Sombra",
              v: "Jung",
              c: "oklch(0.45 0.05 285)",
              s: "confronto",
            },
            {
              k: "Vidro",
              v: "Digital",
              c: "oklch(0.62 0.14 230)",
              s: "anestesia",
            },
          ].map((p, i) => (
            <motion.div
              key={p.k}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.9 + i * 0.15 }}
              className="bg-transparent p-4 flex flex-col items-center justify-center border-0 text-center"
            >
              <motion.div style={{ y: yCards[i] }} className="w-full h-full">
                <div
                  className="w-2 h-2 rounded-full mx-auto mb-4"
                  style={{
                    background: p.c,
                    boxShadow: `0 0 16px ${p.c}`,
                  }}
                />
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-1">
                  {p.v}
                </div>
                <div className="font-[family-name:var(--font-display)] italic text-2xl md:text-3xl mb-1">
                  {p.k}
                </div>
                <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/70">
                  {p.s}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.2, delay: 1.4 }}
          className="mt-12 font-[family-name:var(--font-display)] italic text-xl md:text-2xl text-foreground/70 max-w-2xl mx-auto leading-relaxed"
        >
          A individualização exige o silêncio que o digital recusa.
          <br />
          A tecnologia não matou a ideia — matou o silêncio de que ela precisava para nascer.
        </motion.p>
      </motion.div>
    </section>
  );
}

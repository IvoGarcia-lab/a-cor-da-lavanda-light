"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const yQuote = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const yCard1 = useTransform(scrollYProgress, [0, 1], [0, -15]);
  const yCard2 = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const yCard3 = useTransform(scrollYProgress, [0, 1], [0, -45]);
  const yCards = [yCard1, yCard2, yCard3];

  return (
    <section
      id="manifesto"
      ref={ref}
      className="relative py-32 md:py-48 px-6 md:px-12 overflow-hidden"
    >
      {/* Subtle lavender backdrop */}
      <div
        className="absolute inset-0 -z-10 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, oklch(0.20 0.05 295 / 0.6), transparent 70%)",
        }}
        aria-hidden
      />

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] text-lavender/70 mb-10 md:mb-14 flex items-center gap-4"
        >
          <span className="h-px w-12 bg-lavender/40" />
          Manifesto
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, delay: 0.1 }}
          className="font-[family-name:var(--font-display)] text-4xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight font-light text-foreground"
        >
          <motion.span style={{ y: yQuote, display: "block" }}>
            Num espaço <span className="font-normal italic text-lavender text-glow-lavender">tingido de azul-violeta</span>, uma mão eleva uma carta de calibração cromática perante o espelho. A câmara capta a sua <span className="font-semibold text-foreground border-b border-lavender/30">própria reflexão</span>.
            <br className="hidden md:block" />
            <span className="block mt-6 font-[family-name:var(--font-display)] text-2xl md:text-4xl text-muted-foreground/80 font-light">
              A cor da lavanda não está na parede — reside <span className="italic text-foreground font-normal border-b border-white/10">no gesto preciso de a tentar medir.</span>
            </span>
          </motion.span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="mt-12 font-sans text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl font-light tracking-wide"
        >
          <motion.span style={{ y: yQuote, display: "block" }}>
            A <strong className="font-semibold text-foreground">memória involuntária</strong> de Proust é o gatilho. A <strong className="font-semibold text-foreground">sombra</strong> de Jung é o confronto. A tecnologia é a <span className="italic text-lavender">anestesia digital</span>. E o vidro — o vidro é o limite onde a ideia se dissolve, aos 120 segundos, num corte abrupto para o silêncio.
          </motion.span>
        </motion.p>

        {/* Three pillars */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-px bg-border/40"
        >
          {[
            {
              k: "Memória",
              v: "Proust",
              c: "oklch(0.78 0.13 75)",
              d: "O passado escondido fora do intelecto, em algo material.",
            },
            {
              k: "Sombra",
              v: "Jung",
              c: "oklch(0.45 0.05 285)",
              d: "Aquilo que não desejamos ser — projetado no vidro.",
            },
            {
              k: "Anestesia",
              v: "Digital",
              c: "oklch(0.62 0.14 230)",
              d: "Substituir o abismo pelo ruído infinito do ecrã.",
            },
          ].map((p, i) => (
            <motion.div
              key={p.k}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 + i * 0.15 }}
              className="bg-background p-8 md:p-10 group hover:bg-card/40 transition-colors duration-500"
            >
              <motion.div style={{ y: yCards[i] }} className="h-full w-full">
                <div
                  className="w-8 h-px mb-6"
                  style={{ background: p.c, boxShadow: `0 0 12px ${p.c}` }}
                />
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-2">
                  {p.v}
                </div>
                <div className="font-[family-name:var(--font-display)] text-3xl md:text-4xl mb-4 italic">
                  {p.k}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {p.d}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

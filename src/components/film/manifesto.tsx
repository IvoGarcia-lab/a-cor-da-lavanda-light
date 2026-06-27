"use client";

import { motion } from "framer-motion";

export function Manifesto() {
  return (
    <section
      id="manifesto"
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
          className="font-[family-name:var(--font-display)] text-3xl md:text-5xl lg:text-6xl leading-[1.15] tracking-tight font-light"
        >
          Num banheiro banhado de azul-violeta,{" "}
          <span className="italic text-lavender text-glow-lavender">
            uma mão ergue um painel de cor
          </span>{" "}
          contra o espelho. A câmara filma a sua própria reflexão. A cor da
          lavanda não está na parede — está{" "}
          <span className="italic">no gesto de a tentar medir.</span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="mt-10 md:mt-14 font-[family-name:var(--font-display)] italic text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl"
        >
          A membrória involuntária de Proust é o gatilho. A sombra de Jung é o
          confronto. A tecnologia é a anestesia. E o vidro — o vidro é onde a
          ideia vai morrer, aos 120 segundos, num corte para negro.
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
          ))}
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function Creditos() {
  const productionCredits = [
    {
      title: "Realização e Conceito",
      name: "Ivo Garcia",
      description: "Responsável pela visão artística e direção técnica da curta-metragem.",
    },
    {
      title: "Colaboração",
      name: "Cátia Geraldes",
      description: "Atriz principal, assistência técnica e colaboração criativa fundamental.",
    },
  ];

  return (
    <section
      id="creditos"
      className="relative py-32 md:py-48 px-6 md:px-12 overflow-hidden border-t border-border/30 bg-black"
    >
      <div
        className="absolute inset-0 -z-10 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, oklch(0.45 0.16 295 / 0.15), transparent 70%)",
        }}
        aria-hidden
      />

      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] text-lavender/70 mb-16 flex items-center gap-4 justify-center"
        >
          <span className="h-px w-12 bg-lavender/40" />
          Ficha Técnica e Produção
          <span className="h-px w-12 bg-lavender/40" />
        </motion.div>

        {/* Principal Credits */}
        <div className="space-y-16 md:space-y-24 mb-24 max-w-2xl w-full">
          {productionCredits.map((credit, i) => (
            <motion.div
              key={credit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="flex flex-col items-center"
            >
              <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-muted-foreground/75 mb-3">
                {credit.title}
              </span>
              <h3 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-light text-foreground mb-4 text-glow-lavender italic">
                {credit.name}
              </h3>
              <p className="text-sm md:text-base text-foreground/80 font-light leading-relaxed max-w-md">
                {credit.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Divider line */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "80px" }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="h-px bg-lavender/30 my-8"
        />

        {/* Institution Credits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex flex-col items-center mt-8 space-y-4"
        >
          <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-muted-foreground/70">
            Escola
          </span>
          
          {/* Logo IPCI */}
          <div className="relative w-72 h-16 md:w-96 md:h-20 my-2">
            <Image
              src="/film/logo-ipci.png"
              alt="IPCI - Instituto de Produção Cultural e Imagem"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 288px, 384px"
            />
          </div>

          <p className="font-mono text-[10px] md:text-xs text-muted-foreground tracking-widest uppercase pt-2">
            Curso Básico de Vídeo
          </p>
          
          <span className="block font-mono text-[10px] md:text-xs text-lavender/60 tracking-[0.4em] pt-6">
            2026
          </span>
        </motion.div>
      </div>
    </section>
  );
}

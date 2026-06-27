"use client";

import { motion } from "framer-motion";
import { TECH_SPECS } from "@/lib/film-data";

const phaseHeaders = [
  { label: "Plano 01 · 0:00 — 0:40", color: "oklch(0.78 0.13 75)", name: "Memória" },
  { label: "Plano 02 · 0:40 — 1:20", color: "oklch(0.45 0.05 285)", name: "Sombra" },
  { label: "Plano 03 · 1:20 — 1:55", color: "oklch(0.62 0.14 230)", name: "Digital" },
  { label: "Plano 04 · 1:55 — 2:00", color: "oklch(0.55 0.16 295)", name: "Abismo" },
];

export function MapeamentoTecnico() {
  return (
    <section
      id="tecnico"
      className="relative py-32 md:py-48 px-6 md:px-12 overflow-hidden border-y border-border/30"
    >
      <div
        className="absolute inset-0 -z-10 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, oklch(0.30 0.10 295 / 0.4), transparent 70%)",
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
          Mapeamento técnico
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 md:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.1, delay: 0.1 }}
            className="lg:col-span-7 font-[family-name:var(--font-display)] font-light text-5xl md:text-7xl leading-[0.95] tracking-tight"
          >
            A engenharia{" "}
            <span className="italic text-lavender">invisível.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.3 }}
            className="lg:col-span-5 lg:col-start-8 self-end text-base md:text-lg text-muted-foreground leading-relaxed"
          >
            Uma única câmara — Sony a6500 — atravessa as quatro fases. A lente
            alarga-se de 80mm anamórfica para 16mm Sigma, e a temperatura de cor
            sobe de 2000K a 6500K absoluto. Cada parâmetro é narrativa.
          </motion.p>
        </div>

        {/* Technical specs table */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1 }}
          className="film-frame overflow-hidden"
        >
          {/* Table head */}
          <div className="grid grid-cols-5 border-b border-border/40 bg-card/30">
            <div className="p-4 md:p-5 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Parâmetro
            </div>
            {phaseHeaders.map((h) => (
              <div
                key={h.label}
                className="p-4 md:p-5 border-l border-border/30"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{
                      background: h.color,
                      boxShadow: `0 0 10px ${h.color}`,
                    }}
                  />
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {h.name}
                  </span>
                </div>
                <div className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.15em] text-muted-foreground/70">
                  {h.label}
                </div>
              </div>
            ))}
          </div>

          {/* Table body */}
          <div className="divide-y divide-border/30">
            {TECH_SPECS.map((row, idx) => (
              <motion.div
                key={row.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                className="grid grid-cols-5 group hover:bg-card/20 transition-colors"
              >
                <div className="p-4 md:p-5 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-lavender/80">
                  {row.label}
                </div>
                {[
                  { v: row.phase1, c: "oklch(0.78 0.13 75)" },
                  { v: row.phase2, c: "oklch(0.45 0.05 285)" },
                  { v: row.phase3, c: "oklch(0.62 0.14 230)" },
                  { v: row.phase4, c: "oklch(0.55 0.16 295)" },
                ].map((cell, i) => (
                  <div
                    key={i}
                    className="p-4 md:p-5 border-l border-border/30 text-sm md:text-base text-foreground/85"
                  >
                    <span
                      className="inline-block w-1 h-1 rounded-full mr-2 align-middle"
                      style={{ background: cell.c }}
                    />
                    {cell.v}
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Color temperature progression bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-12 md:mt-16"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Temperatura de cor · Progressão
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              2000K → 6500K absoluto
            </div>
          </div>
          <div className="relative h-3 md:h-4 rounded-full overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, oklch(0.78 0.13 75) 0%, oklch(0.45 0.05 285) 40%, oklch(0.62 0.14 230) 75%, oklch(0.55 0.16 295) 100%)",
              }}
            />
          </div>
          <div className="mt-3 grid grid-cols-4 gap-2 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            <span>2000K · Poente</span>
            <span>3200K · Crepúsculo</span>
            <span>6500K · LED</span>
            <span>6500K · Absoluto</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

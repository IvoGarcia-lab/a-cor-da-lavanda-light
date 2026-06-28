"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { TECH_SPECS } from "@/lib/film-data";

const phaseHeaders = [
  { id: 1, label: "Plano 01 · 0:00 — 0:45", color: "oklch(0.78 0.13 75)", name: "Memória", key: "phase1" },
  { id: 2, label: "Plano 02 · 0:46 — 1:15", color: "oklch(0.45 0.05 285)", name: "Sombra", key: "phase2" },
  { id: 3, label: "Plano 03 · 1:16 — 1:22", color: "oklch(0.62 0.14 230)", name: "Digital", key: "phase3" },
  { id: 4, label: "Plano 04 · 1:23 — 1:34", color: "oklch(0.55 0.16 295)", name: "Abismo", key: "phase4" },
];

const axes = [
  { name: "Câmara", key: "Câmara", values: [80, 80, 80, 80] },
  { name: "Lente", key: "Lente", values: [80, 80, 40, 20] },
  { name: "Temperatura", key: "Temperatura de cor", values: [20, 45, 80, 100] },
  { name: "Iluminação", key: "Iluminação", values: [95, 70, 30, 15] },
  { name: "Movimento", key: "Movimento", values: [10, 50, 30, 95] },
  { name: "Som", key: "Som", values: [15, 40, 75, 100] },
  { name: "Voz", key: "Voz", values: [80, 72, 32, 12] },
  { name: "Paleta", key: "Paleta", values: [85, 60, 35, 50] },
];

export function MapeamentoTecnico() {
  const [view, setView] = useState<"radar" | "table">("radar");
  const [highlightedPhase, setHighlightedPhase] = useState<number | null>(null);
  const [hoveredAxis, setHoveredAxis] = useState<number | null>(null);

  // SVG Radar Dimensions
  const cx = 200;
  const cy = 200;
  const r = 130;
  const numAxes = axes.length;

  // Calculate coordinates for a specific value on an axis
  const getCoordinates = (axisIndex: number, value: number) => {
    const angle = (axisIndex * 2 * Math.PI) / numAxes - Math.PI / 2;
    const distance = (value / 100) * r;
    return {
      x: cx + distance * Math.cos(angle),
      y: cy + distance * Math.sin(angle),
    };
  };

  // Generate points string for SVG polygon
  const getPolygonPoints = (phaseIdx: number) => {
    return axes
      .map((axis, i) => {
        const { x, y } = getCoordinates(i, axis.values[phaseIdx]);
        return `${x},${y}`;
      })
      .join(" ");
  };

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
          className="font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] text-lavender/70 mb-10 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <span className="h-px w-12 bg-lavender/40" />
            Mapeamento técnico
          </div>

          {/* Toggle View Controller */}
          <div className="flex gap-2 bg-background/60 p-1 border border-border/30 rounded-md">
            <button
              onClick={() => setView("radar")}
              className={`px-3 py-1 text-[10px] font-mono uppercase tracking-wider rounded transition-all focus:outline-none ${
                view === "radar" ? "bg-lavender text-background font-semibold" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Gráfico Radar
            </button>
            <button
              onClick={() => setView("table")}
              className={`px-3 py-1 text-[10px] font-mono uppercase tracking-wider rounded transition-all focus:outline-none ${
                view === "table" ? "bg-lavender text-background font-semibold" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Tabela
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.1, delay: 0.1 }}
            className="lg:col-span-7 font-[family-name:var(--font-display)] font-light text-5xl md:text-7xl leading-[0.95] tracking-tight"
          >
            A engenharia{" "}
            <span className="italic text-lavender text-glow-lavender">invisível.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.3 }}
            className="lg:col-span-5 lg:col-start-8 self-end text-base md:text-lg text-muted-foreground leading-relaxed"
          >
            Uma única câmara — Sony a6300 — atravessa as quatro fases.
            <br />
            A lente alarga-se de 80mm anamórfica para 16mm Sigma, e a temperatura de cor sobe de 2000K a 6500K absoluto.
            <br />
            Cada parâmetro é narrativa.
          </motion.p>
        </div>

        {/* View switching panel */}
        <AnimatePresence mode="wait">
          {view === "radar" ? (
            <motion.div
              key="radar"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="film-frame p-8 flex flex-col md:flex-row items-center justify-center gap-12 bg-card/10 backdrop-blur-sm"
            >
              {/* Radar Chart SVG */}
              <div className="relative w-full max-w-[360px] aspect-square shrink-0">
                <svg
                  viewBox="0 0 400 400"
                  className="w-full h-full overflow-visible"
                >
                  {/* Concentric helper grids */}
                  {[0.25, 0.5, 0.75, 1.0].map((pct, idx) => (
                    <circle
                      key={idx}
                      cx={cx}
                      cy={cy}
                      r={r * pct}
                      fill="none"
                      stroke="rgba(255, 255, 255, 0.05)"
                      strokeWidth="1"
                    />
                  ))}

                  {/* Radiating Axes lines and labels */}
                  {axes.map((axis, i) => {
                    const angle = (i * 2 * Math.PI) / numAxes - Math.PI / 2;
                    const end = getCoordinates(i, 100);
                    const labelDist = r + 24;
                    const labelX = cx + labelDist * Math.cos(angle);
                    const labelY = cx + labelDist * Math.sin(angle);
                    const isHovered = hoveredAxis === i;

                    return (
                      <g key={axis.name}>
                        <line
                          x1={cx}
                          y1={cy}
                          x2={end.x}
                          y2={end.y}
                          stroke={isHovered ? "rgba(222, 176, 110, 0.35)" : "rgba(255, 255, 255, 0.1)"}
                          strokeWidth={isHovered ? "1.5" : "1"}
                        />
                        {/* Interactive Axis Area Target */}
                        <circle
                          cx={labelX}
                          cy={labelY}
                          r="18"
                          fill="transparent"
                          className="cursor-help"
                          onMouseEnter={() => setHoveredAxis(i)}
                          onMouseLeave={() => setHoveredAxis(null)}
                        />
                        <text
                          x={labelX}
                          y={labelY + 3}
                          className={`font-mono text-[9px] uppercase tracking-wider text-center select-none pointer-events-none transition-colors ${
                            isHovered ? "fill-lavender font-bold" : "fill-muted-foreground/80"
                          }`}
                          textAnchor="middle"
                        >
                          {axis.name}
                        </text>
                      </g>
                    );
                  })}

                  {/* Polygons (one per phase) */}
                  {phaseHeaders.map((h, i) => {
                    const isSolo = highlightedPhase === null || highlightedPhase === h.id;
                    const opacity = highlightedPhase === h.id ? 0.45 : highlightedPhase === null ? 0.2 : 0.05;
                    const strokeWidth = highlightedPhase === h.id ? 2 : 1;

                    return (
                      <g key={h.name}>
                        <motion.polygon
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: isSolo ? 1 : 0.3 }}
                          transition={{ duration: 0.8, delay: i * 0.15 }}
                          points={getPolygonPoints(i)}
                          fill={h.color}
                          fillOpacity={opacity}
                          stroke={h.color}
                          strokeWidth={strokeWidth}
                          className="transition-all duration-300 pointer-events-none"
                        />
                      </g>
                    );
                  })}
                </svg>

                {/* Hover axis specifications overlay */}
                {hoveredAxis !== null && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none bg-background/80 backdrop-blur-sm rounded-full border border-border/10 p-6 text-center animate-fade-in duration-200">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-lavender mb-1">
                      {axes[hoveredAxis].key}
                    </span>
                    <div className="space-y-1.5 w-full max-w-[200px] mt-1.5">
                      {phaseHeaders.map((h, idx) => (
                        <div key={idx} className="flex justify-between items-center text-[10px] font-mono">
                          <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: h.color }} />
                            <span className="text-muted-foreground">{h.name}:</span>
                          </div>
                          <span className="text-foreground text-right max-w-[110px] truncate">
                            {idx === 0 ? TECH_SPECS[hoveredAxis].phase1 : idx === 1 ? TECH_SPECS[hoveredAxis].phase2 : idx === 2 ? TECH_SPECS[hoveredAxis].phase3 : TECH_SPECS[hoveredAxis].phase4}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Legends and details */}
              <div className="flex-1 space-y-6 self-center">
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-lavender/70 mb-1.5 block">
                    Interacção Narrativa
                  </span>
                  <h4 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-light">
                    Comparação de Variáveis
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                    Seleciona uma fase para destacar a sua assinatura técnica ou passa o rato sobre os eixos do radar para ler as especificações.
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  {phaseHeaders.map((h) => (
                    <button
                      key={h.id}
                      onClick={() => setHighlightedPhase(highlightedPhase === h.id ? null : h.id)}
                      className={`flex items-center justify-between p-3 border rounded text-left transition-all focus:outline-none ${
                        highlightedPhase === h.id
                          ? "border-lavender bg-white/5"
                          : "border-border/30 hover:border-border/60 hover:bg-white/5"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{
                            backgroundColor: h.color,
                            boxShadow: `0 0 10px ${h.color}`,
                          }}
                        />
                        <div>
                          <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground/60 block">
                            Plano 0{h.id}
                          </span>
                          <span className="text-sm font-[family-name:var(--font-display)] italic text-foreground">
                            {h.name}
                          </span>
                        </div>
                      </div>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground/50">
                        {highlightedPhase === h.id ? "[ ATIVO ]" : "[ VER SOZINHO ]"}
                      </span>
                    </button>
                  ))}
                  {highlightedPhase !== null && (
                    <button
                      onClick={() => setHighlightedPhase(null)}
                      className="font-mono text-[9px] uppercase text-center text-muted-foreground hover:text-foreground underline mt-1"
                    >
                      Limpar filtro de destaque
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="table"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="film-frame overflow-hidden"
            >
              {/* Table head */}
              <div className="grid grid-cols-5 border-b border-border/40 bg-card/30">
                <div className="p-4 md:p-5 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  Parâmetro
                </div>
                {phaseHeaders.map((h) => (
                  <div key={h.label} className="p-4 md:p-5 border-l border-border/30">
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
          )}
        </AnimatePresence>

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

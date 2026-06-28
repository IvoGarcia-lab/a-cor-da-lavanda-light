"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

export function GradingSuite() {
  // Slider states
  const [sliderPos, setSliderPos] = useState<number>(50); // 0 to 100 %
  const [temp, setTemp] = useState<number>(0); // -50 (warm/amber) to 50 (cold/lavender)
  const [contrast, setContrast] = useState<number>(100); // 70 to 130 %
  const [saturation, setSaturation] = useState<number>(100); // 0 to 200 %
  const [frameIndex, setFrameIndex] = useState<number>(1); // 1 to 7
  
  const frameSrc = `/film/frame-${frameIndex}.jpg`;
  
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingSlider = useRef<boolean>(false);

  // Handle drag for comparison slider
  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(pct);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDraggingSlider.current) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDraggingSlider.current) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    isDraggingSlider.current = false;
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
    window.removeEventListener("touchmove", handleTouchMove);
    window.removeEventListener("touchend", handleMouseUp);
  };

  const handleMouseDown = () => {
    isDraggingSlider.current = true;
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleMouseUp);
  };

  const handleReset = () => {
    setTemp(0);
    setContrast(100);
    setSaturation(100);
  };

  // Convert temp (-50 to 50) to color tint overlays
  const getTintStyle = () => {
    if (temp > 0) {
      // Cold lavender tint
      return {
        backgroundColor: `rgba(158, 128, 214, ${temp * 0.0035})`,
      };
    } else {
      // Warm amber tint
      return {
        backgroundColor: `rgba(222, 176, 110, ${Math.abs(temp) * 0.0035})`,
      };
    }
  };

  return (
    <section
      id="grading"
      className="relative py-32 md:py-48 px-6 md:px-12 overflow-hidden border-y border-border/30"
    >
      <div
        className="absolute inset-0 -z-10 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, oklch(0.30 0.04 285 / 0.4), transparent 70%)",
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
          Suite de Gradação · Cor e Calibração
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.1, delay: 0.1 }}
            className="lg:col-span-8 font-[family-name:var(--font-display)] font-light text-5xl md:text-7xl leading-[0.95] tracking-tight"
          >
            A calibração do plano.{" "}
            <span className="italic text-lavender text-glow-lavender">Do LOG à Lavanda.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.3 }}
            className="lg:col-span-4 lg:col-start-9 self-end text-base md:text-lg text-muted-foreground leading-relaxed"
          >
            Experimenta a ferramenta de colorista.
            <br />
            Arrasta a barra vertical no centro para ver o perfil bruto da câmara (LOG) contra a gradação final (Rec.709), ou ajusta os parâmetros de cor.
          </motion.p>
        </div>

        {/* Console Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Interactive Slider Window */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div
              ref={containerRef}
              className="relative aspect-film w-full bg-black overflow-hidden select-none film-frame"
            >
              {/* LOG Image (Background) */}
              <div className="absolute inset-0 w-full h-full bg-black">
                <img
                  src={frameSrc}
                  alt="LOG profile"
                  className="w-full h-full object-cover saturate-[0.3] contrast-[0.7] brightness-[1.1] opacity-70"
                />
                <div className="absolute top-4 left-4 font-mono text-[9px] uppercase tracking-wider text-muted-foreground bg-background/60 backdrop-blur px-2 py-1">
                  RAW LOG · FRAME {String(frameIndex).padStart(2, '0')}
                </div>
              </div>

              {/* Graded Image (Foreground, clipped) */}
              <div
                className="absolute inset-y-0 left-0 right-0 overflow-hidden pointer-events-none"
                style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
              >
                <img
                  src={frameSrc}
                  alt="Graded profile"
                  className="absolute inset-0 w-full h-full object-cover transition-all"
                  style={{
                    filter: `contrast(${contrast}%) saturate(${saturation}%)`,
                  }}
                />
                
                {/* Dynamically applied color tint overlay */}
                <div className="absolute inset-0 pointer-events-none mix-blend-color transition-colors duration-200" style={getTintStyle()} />

                <div className="absolute top-4 right-4 font-mono text-[9px] uppercase tracking-wider text-lavender bg-background/60 backdrop-blur px-2 py-1">
                  Rec.709 · DI COLOR GRADE
                </div>
              </div>

              {/* Vertical Handle */}
              <div
                onMouseDown={handleMouseDown}
                onTouchStart={handleMouseDown}
                className="absolute inset-y-0 w-1 bg-lavender cursor-ew-resize z-30 group"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-background border border-lavender flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <span className="text-[10px] text-lavender">↔</span>
                </div>
              </div>
            </div>
            
            {/* Viewfinder metadata strip */}
            <div className="flex justify-between items-center font-mono text-[9px] text-muted-foreground bg-card/25 p-3 border border-border/20 rounded">
              <span>SCOPE: VECTORSCOPE ACTIVE</span>
              <span>LUT: LAVANDA_2383_REC709.cube</span>
              <span>FRAME: {String(frameIndex).padStart(2, '0')} / 07</span>
            </div>

            {/* Frame Switcher Strip */}
            <div className="flex gap-2 mt-3">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <button
                  key={i}
                  onClick={() => setFrameIndex(i)}
                  className={`relative flex-1 aspect-[2.39/1] overflow-hidden rounded border transition-all duration-300 focus:outline-none ${
                    frameIndex === i
                      ? 'border-lavender shadow-[0_0_12px_rgba(158,128,214,0.4)] ring-1 ring-lavender/40'
                      : 'border-border/30 opacity-50 hover:opacity-80 hover:border-border/60'
                  }`}
                >
                  <img
                    src={`/film/frame-${i}.jpg`}
                    alt={`Frame ${i}`}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-0.5 right-1 font-mono text-[7px] text-white/70">
                    {String(i).padStart(2, '0')}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Studio Dashboard & Scopes */}
          <div className="lg:col-span-4 flex flex-col gap-6 bg-card/15 p-6 border border-border/20 backdrop-blur-sm rounded film-frame justify-between">
            
            {/* Real-time SVG Vectorscope */}
            <div className="flex flex-col items-center">
              <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground mb-4 self-start">
                Osciloscópio / Vectorscope
              </span>
              
              <div className="relative w-44 h-44 border border-white/5 rounded-full flex items-center justify-center bg-black/40">
                <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
                  {/* Axis lines */}
                  <line x1="20" y1="100" x2="180" y2="100" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                  <line x1="100" y1="20" x2="100" y2="180" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                  
                  {/* Target Boxes for Colors */}
                  {/* M, B, C, G, Y, R */}
                  {["R", "M", "B", "C", "G", "Y"].map((colorLabel, i) => {
                    const angle = (i * 2 * Math.PI) / 6 - Math.PI / 3;
                    const bx = 100 + 65 * Math.cos(angle);
                    const by = 100 + 65 * Math.sin(angle);
                    return (
                      <g key={colorLabel}>
                        <rect x={bx - 4} y={by - 4} width="8" height="8" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                        <text x={bx} y={by - 8} className="fill-muted-foreground/40 font-mono text-[8px]" textAnchor="middle">{colorLabel}</text>
                      </g>
                    );
                  })}
                  
                  {/* Outer circle */}
                  <circle cx="100" cy="100" r="75" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                  
                  {/* Live shifting lavender plot */}
                  <motion.path
                    animate={{
                      scale: 0.5 + (saturation / 100) * 0.4,
                      rotate: temp,
                    }}
                    transition={{ type: "spring", stiffness: 80 }}
                    d="M 100,100 Q 120,60 140,85 T 150,110 T 110,130 T 75,120 T 70,80 Z"
                    fill="oklch(0.72 0.16 295 / 0.12)"
                    stroke="oklch(0.72 0.16 295 / 0.75)"
                    strokeWidth="1.5"
                    className="origin-center"
                  />
                </svg>
              </div>
            </div>

            {/* Grading Controls */}
            <div className="space-y-5">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground block mb-1">
                  Painel de Gradação
                </span>
                <span className="font-mono text-xs text-foreground/90 font-semibold">
                  Ajustes da Atmosfera
                </span>
              </div>

              {/* Temperature Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between font-mono text-[9px] uppercase text-muted-foreground">
                  <span>Bal. Temperatura</span>
                  <span className={temp === 0 ? "text-muted-foreground" : temp > 0 ? "text-lavender" : "text-amber-400"}>
                    {temp > 0 ? `+${temp}K (Frio)` : temp < 0 ? `${temp}K (Quente)` : "0 (Rec.709)"}
                  </span>
                </div>
                <input
                  type="range"
                  min="-50"
                  max="50"
                  value={temp}
                  onChange={(e) => setTemp(parseInt(e.target.value))}
                  className="w-full h-1 bg-border/40 rounded-lg appearance-none cursor-pointer accent-lavender"
                />
              </div>

              {/* Contrast Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between font-mono text-[9px] uppercase text-muted-foreground">
                  <span>Contraste</span>
                  <span className="text-foreground">{contrast}%</span>
                </div>
                <input
                  type="range"
                  min="70"
                  max="130"
                  value={contrast}
                  onChange={(e) => setContrast(parseInt(e.target.value))}
                  className="w-full h-1 bg-border/40 rounded-lg appearance-none cursor-pointer accent-lavender"
                />
              </div>

              {/* Saturation Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between font-mono text-[9px] uppercase text-muted-foreground">
                  <span>Saturação</span>
                  <span className="text-foreground">{saturation}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={saturation}
                  onChange={(e) => setSaturation(parseInt(e.target.value))}
                  className="w-full h-1 bg-border/40 rounded-lg appearance-none cursor-pointer accent-lavender"
                />
              </div>
            </div>

            {/* Reset Button */}
            <button
              onClick={handleReset}
              className="w-full font-mono text-[10px] uppercase tracking-wider py-2.5 bg-border/20 border border-border/40 hover:border-lavender/40 hover:bg-white/5 transition-all text-center rounded focus:outline-none"
            >
              Repor Gradação do Realizador
            </button>

          </div>
        </div>

      </div>
    </section>
  );
}

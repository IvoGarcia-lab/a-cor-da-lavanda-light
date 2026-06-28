"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { PHASES, type Phase } from "@/lib/film-data";
import { smoothScrollTo } from "@/lib/scroll-utils";

const phaseColors = {
  memory: "oklch(0.78 0.13 75)",
  shadow: "oklch(0.30 0.04 285)",
  digital: "oklch(0.62 0.14 230)",
  abyss: "oklch(0.45 0.16 295)",
};

const phaseGlows = {
  memory: "shadow-[0_0_12px_rgba(212,165,116,0.5)]",
  shadow: "shadow-[0_0_12px_rgba(90,74,107,0.5)]",
  digital: "shadow-[0_0_12px_rgba(74,124,154,0.5)]",
  abyss: "shadow-[0_0_12px_rgba(107,91,142,0.5)]",
};

export function ScrollTimeline() {
  const [activePhase, setActivePhase] = useState<number>(1);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    let anchors: number[] = [0, 0, 0, 0];

    const updateAnchors = () => {
      anchors = [1, 2, 3, 4].map((id) => {
        const el = document.getElementById(`fase-${id}`);
        return el ? el.offsetTop : 0;
      });
    };

    updateAnchors();
    const t = setTimeout(updateAnchors, 1000);
    window.addEventListener("resize", updateAnchors);

    const onScroll = () => {
      const sy = window.scrollY + window.innerHeight * 0.4;
      const [a1, a2, a3, a4] = anchors;
      
      // Calculate current active phase and only update if changed
      let nextPhase = 1;
      if (sy < a2) {
        nextPhase = 1;
      } else if (sy < a3) {
        nextPhase = 2;
      } else if (sy < a4) {
        nextPhase = 3;
      } else {
        nextPhase = 4;
      }
      setActivePhase((prev) => (prev !== nextPhase ? nextPhase : prev));

      // Calculate total progress between first and last phase
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = documentHeight > 0 ? window.scrollY / documentHeight : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", updateAnchors);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handlePhaseClick = (phaseId: number) => {
    const el = document.getElementById(`fase-${phaseId}`);
    if (el) {
      const targetY = el.getBoundingClientRect().top + window.scrollY - 160;
      smoothScrollTo(targetY); // Cinematic ease-out scroll transition
      window.history.pushState(null, "", `#fase-${phaseId}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-8 py-6 px-3 bg-background/20 backdrop-blur-md border border-white/5 rounded-full film-frame"
    >
      {/* Scroll Progress track */}
      <div className="absolute left-1/2 -translate-x-1/2 top-10 bottom-10 w-0.5 bg-border/20 rounded-full overflow-hidden pointer-events-none">
        <div
          className="w-full h-full bg-lavender/60 origin-top"
          style={{ transform: `scaleY(${scrollProgress})` }}
        />
      </div>

      {PHASES.map((phase) => {
        const isActive = activePhase === phase.id;
        const color = phaseColors[phase.color];
        
        return (
          <button
            key={phase.id}
            onClick={() => handlePhaseClick(phase.id)}
            className="group relative flex flex-col items-center cursor-pointer focus:outline-none"
            aria-label={`Scroll to phase ${phase.id}: ${phase.name}`}
          >
            {/* Tooltip text (Timecode + name) */}
            <span className="absolute right-8 top-1/2 -translate-y-1/2 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 pointer-events-none bg-background/85 border border-border/40 backdrop-blur-md px-3 py-1.5 rounded text-left font-mono whitespace-nowrap">
              <span className="block text-[9px] uppercase tracking-[0.25em] text-lavender/70 font-semibold mb-0.5">
                Plano {phase.index} · {phase.timecode}
              </span>
              <span className="block text-xs font-[family-name:var(--font-display)] italic text-foreground">
                {phase.name}
              </span>
            </span>

            {/* Timecode mini label on the timeline */}
            <span
              className={`font-mono text-[9px] mb-1.5 tracking-wider transition-colors duration-300 ${
                isActive ? "text-foreground font-semibold" : "text-muted-foreground/50 group-hover:text-muted-foreground"
              }`}
            >
              {phase.id === 1 ? "0:00" : phase.id === 2 ? "0:46" : phase.id === 3 ? "1:16" : "1:23"}
            </span>

            {/* Indicator Dot */}
            <div
              className={`w-3.5 h-3.5 rounded-full border transition-all duration-500 relative flex items-center justify-center`}
              style={{
                borderColor: isActive ? color : "rgba(255, 255, 255, 0.15)",
                backgroundColor: isActive ? color : "transparent",
              }}
            >
              {/* Active inner pulsing ring */}
              {isActive && (
                <div
                  className={`absolute inset-0 rounded-full animate-ping opacity-35 ${phaseGlows[phase.color]}`}
                  style={{ backgroundColor: color }}
                />
              )}
            </div>
          </button>
        );
      })}

      {/* Final timecode label at bottom */}
      <span className="font-mono text-[9px] mt-1.5 tracking-wider text-muted-foreground/30">
        1:34
      </span>
    </motion.div>
  );
}

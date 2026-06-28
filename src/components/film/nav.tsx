"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_ITEMS } from "@/lib/film-data";
import { handleAnchorClick } from "@/lib/scroll-utils";

const sectionColors: Record<string, string> = {
  "": "oklch(0.85 0.16 75)",             // Hero/Top (Vivid Gold)
  "#video": "oklch(0.85 0.16 75)",      // Memory (Vivid Gold)
  "#manifesto": "oklch(0.85 0.16 75)",  // Memory (Vivid Gold)
  "#fases": "oklch(0.85 0.16 75)",      // Shadow (Vivid Gold)
  "#filosofia": "oklch(0.85 0.16 75)",  // Shadow (Vivid Gold)
  "#tecnico": "oklch(0.74 0.16 230)",    // Digital (Vivid Blue)
  "#grading": "oklch(0.74 0.16 230)",    // Digital (Vivid Blue)
  "#galeria": "oklch(0.74 0.16 230)",    // Digital (Vivid Blue)
  "#som": "oklch(0.74 0.16 230)",        // Abyss (Vivid Blue)
  "#making-of": "oklch(0.74 0.16 230)",  // Abyss (Vivid Blue)
  "#equipamento": "oklch(0.74 0.16 230)", // Abyss (Vivid Blue)
  "#sintese": "oklch(0.74 0.16 230)",    // Abyss (Vivid Blue)
  "#creditos": "oklch(0.74 0.16 230)",   // Abyss (Vivid Blue)
};

const getLogoStyle = (section: string) => {
  // The logo title ALWAYS has the electric blue chromatic aberration glitch effect
  return {
    style: {},
    className: "font-[family-name:var(--font-display)] italic text-base md:text-lg transition-all duration-1000 logo-glitch-active text-white select-none",
  };
};

export function FilmNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll spy section tracking logic
  useEffect(() => {
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.45; // 45% from top of screen as trigger line

      let currentActive = "";
      
      for (const item of NAV_ITEMS) {
        const el = document.querySelector(item.href) as HTMLElement;
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          
          if (scrollPosition >= top && scrollPosition < top + height) {
            currentActive = item.href;
            break;
          }
        }
      }

      if (currentActive !== activeSection) {
        setActiveSection(currentActive);
      }
    };

    // Run on scroll
    window.addEventListener("scroll", handleScrollSpy, { passive: true });
    // Run initially to set active state on load
    handleScrollSpy();

    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, [activeSection]);

  const activeColor = sectionColors[activeSection] || "oklch(0.74 0.09 295)"; // Fallback to lavender
  const logoParams = getLogoStyle(activeSection);

  return (
    <>
      <motion.nav
        className="fixed top-0 inset-x-0 z-50 px-6 md:px-12 py-4 backdrop-blur-md border-b transition-colors duration-300"
        style={{
          backgroundColor: scrolled ? "oklch(0.07 0.012 285 / 0.85)" : "transparent",
          borderColor: scrolled ? "oklch(1 0 0 / 8%)" : "transparent",
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a
            href="#top"
            onClick={(e) => handleAnchorClick(e, "#top")}
            className="flex items-center gap-2 group"
          >
            <span
              className="w-1.5 h-1.5 rounded-full transition-all duration-500"
              style={{
                backgroundColor: activeColor,
                boxShadow: `0 0 12px ${activeColor}, 0 0 20px ${activeColor}`,
              }}
            />
            <span
              style={logoParams.style}
              className={logoParams.className}
            >
              A Cor da Lavanda
            </span>
          </a>
          <div className="hidden md:flex items-center gap-7">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href;
              const color = sectionColors[item.href] || "oklch(0.74 0.09 295)";

              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    if (item.href === "#video") {
                      handleAnchorClick(e, "#video-player", 0, true);
                    } else {
                      handleAnchorClick(e, item.href, 160, false);
                    }
                  }}
                  style={{
                    color: isActive ? "#ffffff" : undefined,
                    transform: isActive ? "scale(1.18)" : "scale(1)",
                    textShadow: isActive
                      ? `-2.5px -1.5px 0px oklch(0.70 0.30 195), 2.5px 1.5px 0px oklch(0.65 0.32 345), 0 0 2px #ffffff, 0 0 6px #ffffff, 0 0 16px ${color}, 0 0 40px ${color}, 0 0 80px ${color}`
                      : undefined,
                  }}
                  className={`relative inline-block font-mono text-[11px] uppercase tracking-[0.25em] transition-all duration-300 py-1.5 px-3 select-none ${
                    isActive
                      ? "font-black italic"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {/* Glowing Bloom Underlay Capsule */}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavGlow"
                      className="absolute -inset-x-4 -inset-y-1.5 -z-10 rounded-full blur-[14px] opacity-75 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle, ${color} 0%, ${color}45 50%, transparent 100%)`,
                      }}
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}

                  {item.label}
                  
                  {/* Sliding active dot under current nav item */}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavDot"
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                      style={{ 
                        backgroundColor: color,
                        boxShadow: `0 0 10px ${color}, 0 0 20px ${color}`
                      }}
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}
                </a>
              );
            })}
          </div>
          <button
            onClick={() => setOpen(true)}
            className="md:hidden font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground"
            aria-label="Abrir menu"
          >
            Menu
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-lg flex flex-col items-center justify-center gap-6"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-6 right-6 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Fechar menu"
            >
              ✕ Fechar
            </button>
            {NAV_ITEMS.map((item, i) => {
              const isActive = activeSection === item.href;
              const color = sectionColors[item.href] || "oklch(0.74 0.09 295)";

              return (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    setOpen(false);
                    if (item.href === "#video") {
                      handleAnchorClick(e, "#video-player", 0, true);
                    } else {
                      handleAnchorClick(e, item.href, 160, false);
                    }
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  style={{
                    color: isActive ? "#ffffff" : undefined,
                    transform: isActive ? "scale(1.12)" : "scale(1)",
                    textShadow: isActive
                      ? `-4px -2px 0px oklch(0.70 0.30 195), 4px 2.5px 0px oklch(0.65 0.32 345), 0 0 3px #ffffff, 0 0 10px #ffffff, 0 0 24px ${color}, 0 0 50px ${color}, 0 0 100px ${color}`
                      : undefined,
                  }}
                  className={`relative font-[family-name:var(--font-display)] italic text-4xl md:text-5xl transition-all ${
                    isActive ? "font-black" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {/* Glowing Bloom Underlay for Mobile */}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavGlowMobile"
                      className="absolute -inset-x-8 -inset-y-4 -z-10 rounded-full blur-[24px] opacity-65 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle, ${color} 0%, ${color}33 60%, transparent 100%)`,
                      }}
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}
                  {item.label}
                </motion.a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_ITEMS } from "@/lib/film-data";

export function FilmNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{
          y: scrolled ? 0 : -60,
          opacity: scrolled ? 1 : 0,
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 inset-x-0 z-50 px-6 md:px-12 py-4 backdrop-blur-md bg-background/70 border-b border-border/40"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2 group">
            <span className="w-1.5 h-1.5 rounded-full bg-lavender lavender-pulse" />
            <span className="font-[family-name:var(--font-display)] italic text-base md:text-lg">
              A Cor da Lavanda
            </span>
          </a>
          <div className="hidden md:flex items-center gap-7">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground hover:text-lavender transition-colors duration-300"
              >
                {item.label}
              </a>
            ))}
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
              className="absolute top-6 right-6 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-lavender"
              aria-label="Fechar menu"
            >
              ✕ Fechar
            </button>
            {NAV_ITEMS.map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className="font-[family-name:var(--font-display)] italic text-4xl md:text-5xl text-foreground hover:text-lavender transition-colors"
              >
                {item.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import { motion } from "framer-motion";

export function FilmFooter() {
  return (
    <footer className="relative border-t border-border/40 bg-background/80 backdrop-blur-sm">
      {/* Marquee quote */}
      <div className="border-b border-border/30 py-6 overflow-hidden">
        <div className="marquee-track">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="mx-8 font-[family-name:var(--font-display)] italic text-2xl md:text-3xl text-muted-foreground/50"
            >
              A ideia morreu no vidro
              <span className="mx-8 text-lavender/60">·</span>
              Entre a memória de Proust e a sombra de Jung
              <span className="mx-8 text-lavender/60">·</span>
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="md:col-span-5"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-lavender lavender-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Curta-metragem · 2024
              </span>
            </div>
            <h3 className="font-[family-name:var(--font-display)] italic text-4xl md:text-5xl mb-4 text-glow-lavender">
              A Cor da Lavanda
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              Uma anatomia cinematográfica de 120 segundos. Entre a memória de
              Proust e a sombra de Jung — quatro fases, uma descida, uma ideia
              que morreu no vidro.
            </p>
          </motion.div>

          {/* Concept index */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1 }}
            className="md:col-span-3 md:col-start-7"
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-lavender/70 mb-5">
              Conceitos
            </div>
            <ul className="space-y-2">
              {[
                "Memória involuntária",
                "Sombra de Jung",
                "Individuação",
                "Anestesia digital",
                "Cocofania",
              ].map((c) => (
                <li
                  key={c}
                  className="font-[family-name:var(--font-display)] italic text-lg text-foreground/80"
                >
                  {c}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Technical index */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="md:col-span-3"
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-lavender/70 mb-5">
              Técnica
            </div>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li>
                <span className="text-muted-foreground">Câmara · </span>Sony
                a6300
              </li>
              <li>
                <span className="text-muted-foreground">Lentes · </span>
                Anamórfica 80mm / Sigma 16mm
              </li>
              <li>
                <span className="text-muted-foreground">Cor · </span>2000K →
                6500K
              </li>
              <li>
                <span className="text-muted-foreground">Som · </span>Silêncio →
                ruído → silêncio
              </li>
              <li>
                <span className="text-muted-foreground">Duração · </span>120s ·
                2.39:1
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-border/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            © 2024 · A Cor da Lavanda · Todos os direitos reservados
          </div>
          <div className="flex items-center gap-6">
            <a
              href="#top"
              className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-lavender transition-colors"
            >
              ↑ Topo
            </a>
            <a
              href="#video"
              onClick={(e) => {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent("play-cinematic-video"));
              }}
              className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-lavender transition-colors"
            >
              Ver filme
            </a>
            <a
              href="#sintese"
              className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-lavender transition-colors"
            >
              Síntese
            </a>
          </div>
        </div>

        {/* Final whisper */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="font-[family-name:var(--font-display)] italic text-xl md:text-2xl text-lavender/40">
            “A ideia... morreu no vidro.”
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

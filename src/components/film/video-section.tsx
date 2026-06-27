"use client";

import { motion } from "framer-motion";

/**
 * FilmStill — replaces the deleted video player with a cinematic "still"
 * section that frames the missing film as a concept: the idea that died
 * in the glass. Uses the reference imagery as a frozen frame.
 */
export function VideoSection() {
  return (
    <section
      id="video"
      className="relative py-32 md:py-48 px-6 md:px-12 overflow-hidden"
    >
      <div
        className="absolute inset-0 -z-10 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, oklch(0.20 0.06 295 / 0.5), transparent 70%)",
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
          O filme · 120 segundos
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.1, delay: 0.1 }}
            className="lg:col-span-8 font-[family-name:var(--font-display)] font-light text-5xl md:text-7xl leading-[0.95] tracking-tight"
          >
            A ideia que morreu{" "}
            <span className="italic text-lavender">no vidro.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.3 }}
            className="lg:col-span-4 lg:col-start-9 self-end text-base md:text-lg text-muted-foreground leading-relaxed"
          >
            Cento e vinte segundos para atravessar a memória, a sombra e a
            anestesia. Quatro planos, um corte para negro, um silêncio
            absoluto.
          </motion.p>
        </div>

        {/* Cinematic still frame */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1 }}
          className="relative film-frame group"
        >
          <div className="relative aspect-film bg-black overflow-hidden">
            {/* Frozen frame — the reference image as a still */}
            <img
              src="/film/ref-01.jpg"
              alt="A Cor da Lavanda — still cinematográfico"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-80 transition-opacity duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/10" />

            {/* Center caption — the absent film */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.4 }}
                className="font-mono text-[10px] uppercase tracking-[0.4em] text-lavender/80 mb-4"
              >
                Corte para negro · 120s
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, delay: 0.5 }}
                className="font-[family-name:var(--font-display)] italic text-3xl md:text-5xl lg:text-6xl text-glow-lavender max-w-3xl"
              >
                A ideia...
                <br />
                <span className="text-lavender">morreu no vidro.</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, delay: 1 }}
                className="mt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
              >
                <span className="blink mr-1 text-lavender">▌</span>
                Silêncio absoluto.
              </motion.div>
            </div>

            {/* Corner HUD */}
            <div className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-[0.3em] text-lavender/90 bg-background/40 backdrop-blur-sm px-2 py-1">
              STILL · 120s
            </div>
            <div className="absolute top-4 right-4 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/70 bg-background/40 backdrop-blur-sm px-2 py-1">
              2.39:1 · a6500
            </div>
            <div className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/70 bg-background/40 backdrop-blur-sm px-2 py-1">
              A Cor da Lavanda
            </div>
            <div className="absolute bottom-4 right-4 font-mono text-[10px] uppercase tracking-[0.3em] text-lavender/90 bg-background/40 backdrop-blur-sm px-2 py-1">
              ● REC
            </div>
          </div>
        </motion.div>

        {/* Phase timecode strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-6 grid grid-cols-4 gap-px bg-border/30 border border-border/30"
        >
          {[
            { t: "0:00 — 0:40", n: "01", c: "oklch(0.78 0.13 75)" },
            { t: "0:40 — 1:20", n: "02", c: "oklch(0.45 0.05 285)" },
            { t: "1:20 — 1:55", n: "03", c: "oklch(0.62 0.14 230)" },
            { t: "1:55 — 2:00", n: "04", c: "oklch(0.55 0.16 295)" },
          ].map((p) => (
            <div
              key={p.n}
              className="bg-background/60 backdrop-blur-sm px-4 py-3 flex items-center gap-3"
            >
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ background: p.c, boxShadow: `0 0 8px ${p.c}` }}
              />
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Plano {p.n}
                </div>
                <div className="font-mono text-xs text-foreground/80">
                  {p.t}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { PHILOSOPHY, type PhilosophyCard } from "@/lib/film-data";

const phaseText: Record<PhilosophyCard["color"], string> = {
  memory: "text-[oklch(0.82_0.13_75)]",
  shadow: "text-[oklch(0.70_0.06_285)]",
  digital: "text-[oklch(0.70_0.14_230)]",
  abyss: "text-[oklch(0.72_0.16_295)]",
};

const phaseBorder: Record<PhilosophyCard["color"], string> = {
  memory: "oklch(0.78 0.13 75)",
  shadow: "oklch(0.45 0.05 285)",
  digital: "oklch(0.62 0.14 230)",
  abyss: "oklch(0.55 0.16 295)",
};

const phaseBg: Record<PhilosophyCard["color"], string> = {
  memory: "bg-phase-memory",
  shadow: "bg-phase-shadow",
  digital: "bg-phase-digital",
  abyss: "bg-phase-abyss",
};

const authorImages: Record<PhilosophyCard["color"], string> = {
  memory: "/film/proust.png",
  shadow: "/film/jung.png",
  digital: "/film/frame-6.jpg",
  abyss: "/film/frame-7.jpg",
};

export function Filosofia() {
  return (
    <section
      id="filosofia"
      className="relative py-32 md:py-48 px-6 md:px-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] text-lavender/70 mb-10 flex items-center gap-4"
        >
          <span className="h-px w-12 bg-lavender/40" />
          Filosofia
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.1, delay: 0.1 }}
          className="font-[family-name:var(--font-display)] font-light text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight max-w-4xl"
        >
          Três vozes que se{" "}
          <span className="italic text-lavender">cruzam no vidro.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-8 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed"
        >
          Proust oferece o gatilho sensorial. Jung desenha o abismo. A
          tecnologia digital ergue a anestesia. O filme é o lugar onde estas
          três forças se encontram — e onde a ideia se dissolve.
        </motion.p>

        <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {PHILOSOPHY.map((p, i) => (
            <motion.article
              key={p.author}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, delay: 0.2 + i * 0.15 }}
              className={`relative group ${phaseBg[p.color]} border border-border/40 p-8 md:p-10 hover:border-lavender/30 overflow-hidden transition-colors duration-700`}
            >
              {/* Dynamic Author Portrait Background */}
              <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-[0.14] group-hover:opacity-[0.24] mix-blend-luminosity transition-all duration-[1000ms] ease-out">
                <img
                  src={authorImages[p.color]}
                  alt=""
                  className="w-full h-full object-cover object-center scale-[1.08] group-hover:scale-[1.0] transition-transform duration-[1200ms] ease-out"
                />
                {/* Vignettes for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-transparent to-background/95" />
                <div className="absolute inset-0 bg-gradient-to-r from-background/20 via-transparent to-background/20" />
              </div>

              <div
                className="absolute top-0 left-0 h-1 w-full z-10"
                style={{
                  background: phaseBorder[p.color],
                  boxShadow: `0 0 24px ${phaseBorder[p.color]}`,
                }}
              />

              <div className="relative z-10">
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
                  {p.role}
                </div>

                <h3
                  className={`font-[family-name:var(--font-display)] italic text-3xl md:text-4xl mb-1 ${phaseText[p.color]}`}
                >
                  {p.author}
                </h3>
                <div className="font-mono text-[10px] text-muted-foreground/70 mb-6">
                  {p.years}
                </div>

                <div className="font-[family-name:var(--font-display)] text-xl md:text-2xl mb-6">
                  {p.concept}
                </div>

                <p className="text-sm md:text-base text-foreground/75 leading-relaxed mb-6">
                  {p.text}
                </p>

                <div
                  className="border-l-2 pl-4"
                  style={{ borderColor: phaseBorder[p.color] }}
                >
                  <p className="font-[family-name:var(--font-display)] italic text-lg md:text-xl text-foreground/90">
                    “{p.quote}”
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* The triangle of individuation */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="mt-24 md:mt-32 film-frame p-10 md:p-16 max-w-4xl mx-auto text-center"
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-lavender/70 mb-6">
            A individuação, segundo Jung
          </div>
          <p className="font-[family-name:var(--font-display)] italic text-2xl md:text-4xl leading-snug">
            A totalidade exige a integração da sombra. Mas a tecnologia oferece
            uma via mais fácil — o ruído. E o ruído mata o silêncio que a
            ideia precisa para nascer.
          </p>
          <div className="mt-8 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Por isso a ideia... morreu no vidro.
          </div>
        </motion.div>
      </div>
    </section>
  );
}

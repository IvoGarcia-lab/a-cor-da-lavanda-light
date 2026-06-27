"use client";

import { motion } from "framer-motion";
import { GALLERY } from "@/lib/film-data";
import { useState } from "react";

export function Galeria() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section
      id="galeria"
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
          Galeria · Quadros de referência
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 md:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.1, delay: 0.1 }}
            className="lg:col-span-7 font-[family-name:var(--font-display)] font-light text-5xl md:text-7xl leading-[0.95] tracking-tight"
          >
            Onde a cor se torna{" "}
            <span className="italic text-lavender">atmosfera.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.3 }}
            className="lg:col-span-5 lg:col-start-8 self-end text-base md:text-lg text-muted-foreground leading-relaxed"
          >
            O banheiro-laboratório, o estúdio doméstico, o linho bordado, a
            carta de cores. Cada quadro é um manifesto: a lavanda não está na
            parede — está no gesto de a tentar medir.
          </motion.p>
        </div>

        {/* Mosaic gallery */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          {GALLERY.map((item, i) => {
            // Custom layout: 1st and 4th span 8, 2nd and 3rd span 4
            const colSpan =
              i === 0
                ? "md:col-span-8"
                : i === 1
                ? "md:col-span-4"
                : i === 2
                ? "md:col-span-4"
                : "md:col-span-8";

            return (
              <motion.figure
                key={item.src}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 1, delay: i * 0.1 }}
                className={`group relative ${colSpan} cursor-pointer overflow-hidden film-frame`}
                onClick={() => setActive(i)}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-700" />

                  {/* Top meta */}
                  <div className="absolute top-0 inset-x-0 p-5 flex items-center justify-between">
                    <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/80">
                      {item.meta}
                    </span>
                    <span className="w-8 h-8 rounded-full border border-foreground/30 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      ⤢
                    </span>
                  </div>

                  {/* Bottom caption */}
                  <figcaption className="absolute bottom-0 inset-x-0 p-5 md:p-7">
                    <h3 className="font-[family-name:var(--font-display)] italic text-2xl md:text-3xl mb-2 text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-sm text-foreground/75 leading-relaxed max-w-md line-clamp-3 md:line-clamp-none">
                      {item.caption}
                    </p>
                  </figcaption>
                </div>
              </motion.figure>
            );
          })}
        </div>

        {/* Conceptual maps */}
        <div className="mt-24 md:mt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1 }}
            className="font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] text-lavender/70 mb-10 flex items-center gap-4"
          >
            <span className="h-px w-12 bg-lavender/40" />
            Os quatro mapas conceptuais
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {[
              {
                src: "/film/linha-pensamento.png",
                title: "A Linha de Pensamento",
                subtitle: "Anatomia Cinematográfica de 120 Segundos",
                description:
                  "O mapa-mãe. Relação técnica e narrativa entre diálogos, iluminação e composição visual em cada plano.",
              },
              {
                src: "/film/jung-sombra.png",
                title: "Entre a Memória e a Sombra de Jung",
                subtitle: "Proust × Jung · Quatro Fases",
                description:
                  "O cruzamento filosófico. A memória involuntária de Proust como gatilho para a emergência da sombra junguiana.",
              },
              {
                src: "/film/mapeamento-tecnico.png",
                title: "Mapeamento Técnico",
                subtitle: "Câmara · Lente · Luz · Som · Montagem",
                description:
                  "A engenharia invisível. Cada escolha técnica serve a degradação narrativa de orgânico a estéril.",
              },
              {
                src: "/film/sintese.png",
                title: "Síntese",
                subtitle: "Mapa da Evolução Sonora e Narrativa",
                description:
                  "A partitura final. A degradação: memória → tensão → anestesia → colapso. A ideia morre no vidro aos 120s.",
              },
            ].map((m, i) => (
              <motion.article
                key={m.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 1, delay: i * 0.08 }}
                className="group film-frame overflow-hidden hover:border-lavender/30 transition-colors duration-700"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-card/40">
                  <img
                    src={m.src}
                    alt={m.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-contain transition-transform duration-[1500ms] ease-out group-hover:scale-105"
                  />
                </div>
                <div className="p-6 md:p-7">
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-lavender/70 mb-2">
                    Mapa {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl mb-1">
                    {m.title}
                  </h3>
                  <div className="font-[family-name:var(--font-display)] italic text-base text-muted-foreground mb-3">
                    {m.subtitle}
                  </div>
                  <p className="text-sm text-foreground/75 leading-relaxed">
                    {m.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {active !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setActive(null)}
          className="fixed inset-0 z-[80] bg-background/95 backdrop-blur-md flex items-center justify-center p-6 md:p-12"
        >
          <button
            onClick={() => setActive(null)}
            className="absolute top-6 right-6 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-lavender"
            aria-label="Fechar"
          >
            ✕ Fechar
          </button>
          <motion.figure
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={GALLERY[active].src}
              alt={GALLERY[active].title}
              className="w-full h-auto max-h-[70vh] object-contain"
            />
            <figcaption className="mt-6 text-center">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-lavender/70 mb-2">
                {GALLERY[active].meta}
              </div>
              <h3 className="font-[family-name:var(--font-display)] italic text-3xl md:text-4xl mb-3">
                {GALLERY[active].title}
              </h3>
              <p className="text-foreground/80 max-w-2xl mx-auto">
                {GALLERY[active].caption}
              </p>
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </section>
  );
}

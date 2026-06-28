"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function MakingOf() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const steps = [
    {
      title: "Conceito",
      desc: "A tensão Proust × Jung como motor narrativo. A busca da memória involuntária confrontada com a sombra do ego.",
      c: "oklch(0.78 0.13 75)", // memory
      image: "/film/bastidores-1.jpg",
    },
    {
      title: "Pré-produção",
      desc: "Mapeamento detalhado de 4 fases narrativas e técnicas, traduzidas numa paleta cromática oklch específica.",
      c: "oklch(0.30 0.04 285)", // shadow
      image: "/film/bastidores-2.jpg",
    },
    {
      title: "Rodagem",
      desc: "Gravação em estúdio doméstico usando a Sony a6300, combinando iluminação natural (golden hour) e LEDs artificiais.",
      c: "oklch(0.62 0.14 230)", // digital
      image: "/film/bastidores-3.jpg",
    },
    {
      title: "Montagem",
      desc: "A transição de ritmos visuais e a degradação sonora em 4 fases, culminando no corte seco para negro aos 120 segundos.",
      c: "oklch(0.45 0.16 295)", // abyss
      image: "/film/bastidores-4-nova.jpg",
    },
  ];

  const credits = [
    { label: "Câmara", value: "Sony a6300" },
    { label: "Lentes", value: "Anamórfica 80mm · Sigma 16mm" },
    { label: "Formato", value: "2.39:1 Cinemascope" },
    { label: "Duração", value: "120 segundos" },
    { label: "Cromia", value: "2000K → 6500K absoluto" },
    { label: "Som", value: "Silêncio orgânico → Ruído digital" },
  ];

  return (
    <section
      id="making-of"
      className="relative py-32 md:py-48 px-6 md:px-12 overflow-hidden border-t border-border/30"
    >
      <div
        className="absolute inset-0 -z-10 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, oklch(0.30 0.04 285 / 0.3), transparent 70%)",
        }}
        aria-hidden
      />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] text-lavender/70 mb-10 flex items-center gap-4"
        >
          <span className="h-px w-12 bg-lavender/40" />
          Nos bastidores · O processo
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 md:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.1, delay: 0.1 }}
            className="lg:col-span-8 font-[family-name:var(--font-display)] font-light text-5xl md:text-7xl leading-[0.95] tracking-tight"
          >
            Como nasce uma ideia que{" "}
            <span className="italic text-lavender text-glow-lavender">morre no vidro.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.3 }}
            className="lg:col-span-4 self-end text-base md:text-lg text-muted-foreground leading-relaxed"
          >
            Filmar com limitações extremas de espaço, tempo e equipamento obriga a que
            cada milissegundo de luz, lente e som sirva um propósito filosófico e estético.
          </motion.p>
        </div>

        {/* Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 md:mb-32">
          {steps.map((step, i) => (
            <motion.article
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="film-frame relative group p-6 md:p-8 hover:border-lavender/30 transition-colors duration-700 flex flex-col justify-between overflow-hidden min-h-[360px] cursor-pointer"
              onClick={() => setSelectedImage(step.image)}
            >
              <div className="absolute inset-0 z-0">
                <img 
                  src={step.image} 
                  alt={step.title} 
                  className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-105 group-hover:scale-100 mix-blend-luminosity group-hover:mix-blend-normal" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/10 group-hover:from-background/80 group-hover:to-transparent transition-all duration-1000 z-10" />
              </div>
              
              <div className="relative z-20">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground/60">
                    Etapa {String(i + 1).padStart(2, "0")}
                  </span>
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{
                      backgroundColor: step.c,
                      boxShadow: `0 0 10px ${step.c}`,
                    }}
                  />
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl mb-3 group-hover:text-glow-lavender transition-all duration-500">
                  {step.title}
                </h3>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed mt-4 relative z-20 group-hover:text-foreground transition-colors duration-500">
                {step.desc}
              </p>
            </motion.article>
          ))}
        </div>

        {/* Storyboard Watercolors Section */}
        <div className="border-t border-border/30 pt-16 md:pt-24 mb-20 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mb-12"
          >
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-lavender/70 mb-3 block">
              Storyboard
            </span>
            <h3 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl mb-4">
              Aguarelas Originais
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
              Os esboços conceituais foram pintados à mão em aguarela, capturando a transição das tonalidades analógicas (pele e linho) até ao abismo frio e digital do ecrã.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { src: "/film/storyboard-1.jpg", title: "O Toque Analógico (Fase 1)", desc: "Estudo da textura da pele e a relação com o linho orgânico." },
              { src: "/film/storyboard-3.jpg", title: "A Anestesia Digital (Fase 3)", desc: "Estudo do perfil iluminado pelo brilho monocromático e estéril do ecrã." },
              { src: "/film/storyboard-2.jpg", title: "O Abismo na Córnea (Fase 4)", desc: "Estudo macro da íris refletindo a cacofonia visual das redes sociais." }
            ].map((story, i) => (
              <motion.div
                key={story.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
                className="film-frame relative group overflow-hidden bg-card/10 cursor-pointer border border-border/30 hover:border-lavender/35 transition-all duration-700"
                onClick={() => setSelectedImage(story.src)}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={story.src}
                    alt={story.title}
                    className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-700" />
                </div>
                <div className="p-5 border-t border-border/30 bg-background/50 backdrop-blur-sm relative z-20">
                  <h4 className="font-[family-name:var(--font-display)] text-lg mb-1 group-hover:text-glow-lavender transition-all duration-500">
                    {story.title}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {story.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Credits Sub-Section */}
        <div className="border-t border-border/30 pt-16 md:pt-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-5"
          >
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-lavender/70 mb-3 block">
              Ficha Técnica
            </span>
            <h3 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl mb-4">
              Especificações e Créditos
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Cada componente técnico foi selecionado para mapear fisicamente a
              degradação da memória orgânica em direção ao vazio anestesiado do ecrã digital.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-px bg-border/20 border border-border/20"
          >
            {credits.map((c) => (
              <div
                key={c.label}
                className="bg-background p-6 hover:bg-card/20 transition-colors"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground block mb-1">
                  {c.label}
                </span>
                <span className="text-base text-foreground font-light font-[family-name:var(--font-display)]">
                  {c.value}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Lightbox / Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-background/95 backdrop-blur-md"
            onClick={() => setSelectedImage(null)}
          >
            <motion.img
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
              src={selectedImage}
              alt="Bastidores Expandido"
              className="w-full h-full max-w-6xl max-h-[85vh] object-contain cursor-zoom-out border border-border/20 rounded-sm shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute top-6 right-6 md:top-10 md:right-10 p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all"
              onClick={() => setSelectedImage(null)}
              aria-label="Fechar"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { GALLERY } from "@/lib/film-data";
import { useState, useEffect, useRef } from "react";

const conceptualMaps = [
  {
    src: "/film/linha-pensamento.png",
    title: "A Linha de Pensamento",
    subtitle: "Anatomia Cinematográfica de 120 Segundos",
    description: "O mapa-mãe. Relação técnica e narrativa entre diálogos, iluminação e composição visual em cada plano.",
    meta: "Mapa conceptual · 01",
  },
  {
    src: "/film/jung-sombra.png",
    title: "Entre a Memória e a Sombra de Jung",
    subtitle: "Proust × Jung · Quatro Fases",
    description: "O cruzamento filosófico. A memória involuntária de Proust como gatilho para a emergência da sombra junguiana.",
    meta: "Mapa conceptual · 02",
  },
  {
    src: "/film/mapeamento-tecnico.png",
    title: "Mapeamento Técnico",
    subtitle: "Câmara · Lente · Luz · Som · Montagem",
    description: "A engenharia invisível. Cada escolha técnica serve a degradação narrativa de orgânico a estéril.",
    meta: "Mapa conceptual · 03",
  },
  {
    src: "/film/sintese.png",
    title: "Síntese",
    subtitle: "Mapa da Evolução Sonora e Narrativa",
    description: "A partitura final. A degradação: memória → tensão → anestesia → colapso. A ideia morre no vidro aos 120s.",
    meta: "Mapa conceptual · 04",
  },
];

// Combine all items for unified lightbox navigation
const allLightboxItems = [
  ...GALLERY.map(item => ({ ...item, isMap: false })),
  ...conceptualMaps.map(map => ({ src: map.src, title: map.title, caption: map.description, meta: map.meta, isMap: true }))
];

export function Galeria() {
  const [active, setActive] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const [windowWidth, setWindowWidth] = useState(1200);
  const [isHovered, setIsHovered] = useState(false);

  // Autoplay slow-rotate effect
  useEffect(() => {
    if (active !== null || isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % GALLERY.length);
    }, 6000); // Natural slow autoplay (every 6 seconds)

    return () => clearInterval(interval);
  }, [active, isHovered]);

  // Hook to handle client-side responsive size
  useEffect(() => {
    if (typeof window === "undefined") return;
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate dynamic dimensions for cinematic ratios (16:9 aspect ratio)
  const cardWidth = windowWidth < 640 ? 280 : windowWidth < 768 ? 420 : windowWidth < 1024 ? 600 : windowWidth < 1280 ? 760 : 920;
  const cardHeight = Math.round((cardWidth * 9) / 16);
  const translation = cardWidth + 19; // 19px is equivalent to 5mm space on screen

  // Keyboard navigation inside lightbox
  useEffect(() => {
    if (active === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActive(null);
      } else if (e.key === "ArrowRight") {
        setActive((prev) => (prev !== null ? (prev + 1) % allLightboxItems.length : null));
      } else if (e.key === "ArrowLeft") {
        setActive((prev) => (prev !== null ? (prev - 1 + allLightboxItems.length) % allLightboxItems.length : null));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [active]);

  // Keyboard navigation for the carousel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (active !== null) return;
      if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev + 1) % GALLERY.length);
      } else if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev - 1 + GALLERY.length) % GALLERY.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [active]);

  // Touch swipe events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX.current - touchEndX;

    // Minimum swipe threshold of 50px
    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        // Swipe left = Next image
        if (active !== null) {
          setActive((prev) => (prev !== null ? (prev + 1) % allLightboxItems.length : null));
        } else {
          setCurrentIndex((prev) => (prev + 1) % GALLERY.length);
        }
      } else {
        // Swipe right = Previous image
        if (active !== null) {
          setActive((prev) => (prev !== null ? (prev - 1 + allLightboxItems.length) % allLightboxItems.length : null));
        } else {
        }
      }
    }
    touchStartX.current = null;
  };

  return (
    <section
      id="galeria"
      className="relative py-32 md:py-48 overflow-hidden"
    >
      {/* 1. Header (inside max-w-7xl container) */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
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
            <span className="italic text-lavender text-glow-lavender">atmosfera.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.3 }}
            className="lg:col-span-5 lg:col-start-8 self-end text-base md:text-lg text-muted-foreground leading-relaxed"
          >
            O estúdio doméstico, o linho bordado, a carta de cores.
            <br />
            Cada quadro é um manifesto: a lavanda não está na parede — está no gesto de a tentar medir.
          </motion.p>
        </div>
      </div>

      {/* 2. Cinematic Carousel (Breakout of max-w-7xl to bleed edge-to-edge as a continuous film strip) */}
      <div className="relative mt-12 md:mt-16 w-full overflow-hidden select-none py-6">
        {/* Style tag for CSS keyframe marquee animation */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes marquee-continuous {
            0% { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(-50%, 0, 0); }
          }
          .marquee-track {
            display: flex;
            width: max-content;
            animation: marquee-continuous 40s linear infinite;
            gap: 19px;
          }
          .marquee-track:hover {
            animation-play-state: paused;
          }
        `}} />

        {/* The rolling marquee track */}
        <div className="marquee-track">
          {/* Set 1 */}
          <div className="flex gap-[19px] shrink-0">
            {GALLERY.map((item, i) => (
              <div
                key={`set1-${i}`}
                onClick={() => setActive(i)}
                className="relative w-[280px] sm:w-[340px] md:w-[380px] lg:w-[420px] xl:w-[460px] aspect-video cursor-pointer overflow-hidden film-frame group shrink-0 transition-transform duration-500 hover:scale-[1.03] hover:border-lavender/35"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-transparent to-transparent opacity-60 z-10" />
                
                {/* Meta */}
                <div className="absolute top-4 left-4 font-mono text-[9px] uppercase tracking-widest text-white/70 bg-black/45 px-2 py-1 backdrop-blur-sm border border-white/10 rounded z-20">
                  {item.meta}
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-5 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                  <h3 className="font-[family-name:var(--font-display)] italic text-lg md:text-xl text-foreground mb-1">
                    {item.title}
                  </h3>
                  <p className="text-[10px] text-muted-foreground line-clamp-2 mb-2 font-sans">
                    {item.caption}
                  </p>
                  <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-lavender/80">
                    ➔ Clicar para expandir
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Set 2 (Identical duplicate for seamless loop) */}
          <div className="flex gap-[19px] shrink-0">
            {GALLERY.map((item, i) => (
              <div
                key={`set2-${i}`}
                onClick={() => setActive(i)}
                className="relative w-[280px] sm:w-[340px] md:w-[380px] lg:w-[420px] xl:w-[460px] aspect-video cursor-pointer overflow-hidden film-frame group shrink-0 transition-transform duration-500 hover:scale-[1.03] hover:border-lavender/35"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-transparent to-transparent opacity-60 z-10" />
                
                {/* Meta */}
                <div className="absolute top-4 left-4 font-mono text-[9px] uppercase tracking-widest text-white/70 bg-black/45 px-2 py-1 backdrop-blur-sm border border-white/10 rounded z-20">
                  {item.meta}
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-5 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                  <h3 className="font-[family-name:var(--font-display)] italic text-lg md:text-xl text-foreground mb-1">
                    {item.title}
                  </h3>
                  <p className="text-[10px] text-muted-foreground line-clamp-2 mb-2 font-sans">
                    {item.caption}
                  </p>
                  <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-lavender/80">
                    ➔ Clicar para expandir
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Elegant UX Hint */}
        <div className="mt-8 text-center font-mono text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-lavender/40">
          Pairar para pausar · Clicar para expandir em grande
        </div>
      </div>

      {/* 3. Conceptual Maps (inside standard max-w-7xl container) */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-24 md:mt-32">
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
            {conceptualMaps.map((m, i) => (
              <motion.article
                key={m.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 1, delay: i * 0.08 }}
                className="group film-frame overflow-hidden hover:border-lavender/30 transition-colors duration-700 cursor-pointer"
                onClick={() => setActive(i + GALLERY.length)}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-card/40">
                  <img
                    src={m.src}
                    alt={m.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-contain opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1200ms] ease-out"
                  />
                  <div className="absolute inset-0 bg-background/0 group-hover:bg-background/10 transition-colors duration-700" />
                  
                  {/* Expand badge */}
                  <span className="absolute top-4 right-4 w-8 h-8 rounded-full bg-background/50 border border-foreground/30 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    ⤢
                  </span>
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
      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[80] bg-background/95 backdrop-blur-md flex items-center justify-center p-6 md:p-12 select-none"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Header Mute & Close Controls */}
            <div className="absolute top-6 inset-x-6 flex justify-between items-center z-[90]">
              {/* Counter */}
              <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground/80">
                {active + 1} / {allLightboxItems.length}
              </span>

              <button
                onClick={() => setActive(null)}
                className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-lavender transition-colors"
                aria-label="Fechar"
              >
                ✕ Fechar
              </button>
            </div>

            {/* Left navigation arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActive((prev) => (prev !== null ? (prev - 1 + allLightboxItems.length) % allLightboxItems.length : null));
              }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/5 hover:border-white/20 bg-background/40 hover:bg-white/5 flex items-center justify-center text-xl text-muted-foreground hover:text-foreground transition-all focus:outline-none z-[90]"
              aria-label="Anterior"
            >
              ‹
            </button>

            {/* Content Display (with AnimatePresence wait dissolve transition) */}
            <AnimatePresence mode="wait">
              <motion.figure
                key={active}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                className="max-w-5xl w-full flex flex-col items-center"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative max-h-[60vh] w-full flex justify-center items-center">
                  <img
                    src={allLightboxItems[active].src}
                    alt={allLightboxItems[active].title}
                    className={`h-auto max-h-[60vh] object-contain ${
                      allLightboxItems[active].isMap ? "w-auto max-w-full rounded border border-white/10" : "w-full"
                    }`}
                  />
                </div>
                <figcaption className="mt-6 text-center max-w-3xl">
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-lavender/70 mb-2">
                    {allLightboxItems[active].meta}
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] italic text-3xl md:text-4xl mb-3">
                    {allLightboxItems[active].title}
                  </h3>
                  <p className="text-foreground/80 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
                    {allLightboxItems[active].caption}
                  </p>
                </figcaption>
              </motion.figure>
            </AnimatePresence>

            {/* Right navigation arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActive((prev) => (prev !== null ? (prev + 1) % allLightboxItems.length : null));
              }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/5 hover:border-white/20 bg-background/40 hover:bg-white/5 flex items-center justify-center text-xl text-muted-foreground hover:text-foreground transition-all focus:outline-none z-[90]"
              aria-label="Seguinte"
            >
              ›
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

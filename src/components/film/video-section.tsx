"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";

export function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

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
            Veja a ideia{" "}
            <span className="italic text-lavender">morrer no vidro.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.3 }}
            className="lg:col-span-4 lg:col-start-9 self-end text-base md:text-lg text-muted-foreground leading-relaxed"
          >
            A curta-metragem na sua forma final. 120 segundos para
            atravessar a memória, a sombra e a anestesia.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1 }}
          className="relative film-frame group"
        >
          <div className="relative aspect-film bg-black overflow-hidden">
            <video
              ref={videoRef}
              src="/film/lavanda.mp4"
              poster="/film/ref-01.jpg"
              playsInline
              controls={false}
              preload="metadata"
              onClick={toggle}
              onEnded={() => setPlaying(false)}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Play overlay */}
            {!playing && (
              <button
                onClick={toggle}
                className="absolute inset-0 flex items-center justify-center bg-background/40 backdrop-blur-sm group-hover:bg-background/20 transition-colors duration-700"
                aria-label="Reproduzir"
              >
                <motion.span
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="relative w-20 h-20 md:w-28 md:h-28 rounded-full border-2 border-lavender flex items-center justify-center hover:scale-110 transition-transform duration-500"
                  style={{
                    boxShadow: "0 0 60px oklch(0.74 0.09 295 / 0.5)",
                  }}
                >
                  <span className="w-0 h-0 border-y-8 border-y-transparent border-l-[14px] border-l-lavender ml-1" />
                  <span className="absolute inset-0 rounded-full border border-lavender/40 lavender-pulse" />
                </motion.span>
              </button>
            )}

            {/* Corner timecode */}
            <div className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-[0.3em] text-lavender/90 bg-background/40 backdrop-blur-sm px-2 py-1">
              REC · 120s
            </div>
            <div className="absolute top-4 right-4 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/70 bg-background/40 backdrop-blur-sm px-2 py-1">
              2.39:1 · a6500
            </div>
            <div className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/70 bg-background/40 backdrop-blur-sm px-2 py-1">
              A Cor da Lavanda
            </div>
            <div className="absolute bottom-4 right-4 font-mono text-[10px] uppercase tracking-[0.3em] text-lavender/90 bg-background/40 backdrop-blur-sm px-2 py-1">
              ● {playing ? "PLAY" : "PAUSE"}
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground text-center"
        >
          Clique no ecrã para reproduzir · Som recomendado
        </motion.p>
      </div>
    </section>
  );
}

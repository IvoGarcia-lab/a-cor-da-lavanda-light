"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const phasesInfo = [
  { id: 1, name: "Memória", color: "oklch(0.78 0.13 75)", limit: 45 },
  { id: 2, name: "Sombra", color: "oklch(0.30 0.04 285)", limit: 75 },
  { id: 3, name: "Digital", color: "oklch(0.62 0.14 230)", limit: 82 },
  { id: 4, name: "Abismo", color: "oklch(0.45 0.16 295)", limit: 94 },
];

export function VideoSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(94); // Default to 94s
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(true);
  const [hasPlayedOnce, setHasPlayedOnce] = useState<boolean>(false);
  const [isCountingDown, setIsCountingDown] = useState<boolean>(false);

  // Active Phase calculation based on video time
  const getActivePhase = (time: number) => {
    if (time < 45) return phasesInfo[0];
    if (time < 75) return phasesInfo[1];
    if (time < 82) return phasesInfo[2];
    return phasesInfo[3];
  };

  const activePhase = getActivePhase(currentTime);

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
      setHasPlayedOnce(true);
    }
  };

  // Cinematic launch: play immediately (user gesture rule) and request fullscreen
  const handleCinematicPlay = () => {
    if (!containerRef.current || !videoRef.current) return;
    
    // Play video immediately to satisfy browser gesture policies on mobile
    videoRef.current.play().then(() => {
      setIsPlaying(true);
      setHasPlayedOnce(true);
      
      // Request fullscreen after successful play trigger
      if (containerRef.current) {
        if (containerRef.current.requestFullscreen) {
          containerRef.current.requestFullscreen()
            .then(() => setIsFullscreen(true))
            .catch((err) => console.log("Fullscreen blocked:", err));
        }
      }
    }).catch((err) => {
      console.log("Play failed, retrying muted:", err);
      // Fallback: if browser blocks audio play, play muted (always allowed by browsers)
      if (videoRef.current) {
        videoRef.current.muted = true;
        setIsMuted(true);
        videoRef.current.play().then(() => {
          setIsPlaying(true);
          setHasPlayedOnce(true);
        });
      }
    });
  };

  const handleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => console.error(err));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || duration === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = clickX / rect.width;
    const seekTime = pct * duration;
    videoRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 2500);
    }
  };

  useEffect(() => {
    const handleFSChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFSChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFSChange);
      if (autoplayTimerRef.current) clearTimeout(autoplayTimerRef.current);
    };
  }, []);

  // Listen for external trigger events (e.g. from Hero or Navbar)
  useEffect(() => {
    const handleExternalPlay = () => {
      handleCinematicPlay();
    };
    window.addEventListener("play-cinematic-video", handleExternalPlay);
    return () => window.removeEventListener("play-cinematic-video", handleExternalPlay);
  }, []);

  // Keyboard controls listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only trigger if video section is in viewport
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inViewport) return;

      if (e.key === " ") {
        e.preventDefault();
        handlePlayPause();
      } else if (e.key === "f" || e.key === "F") {
        e.preventDefault();
        handleFullscreen();
      } else if (e.key === "m" || e.key === "M") {
        e.preventDefault();
        handleMute();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        if (videoRef.current) videoRef.current.currentTime = Math.min(duration, videoRef.current.currentTime + 5);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (videoRef.current) videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 5);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying, duration, isMuted]);

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <section
      id="video"
      className="relative pt-20 pb-16 md:pt-28 md:pb-20 px-6 md:px-12 overflow-hidden"
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
          O filme · 94 segundos
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
            <span className="italic text-lavender text-glow-lavender">no vidro.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.3 }}
            className="lg:col-span-4 lg:col-start-9 self-end text-base md:text-lg text-muted-foreground leading-relaxed"
          >
            Cento e vinte segundos para atravessar a memória, a sombra e a anestesia.
            <br />
            Quatro planos, um corte para negro, um silêncio absoluto.
          </motion.p>
        </div>

        {/* Custom Cinematic Player Container */}
        <motion.div
          id="video-player"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1 }}
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => isPlaying && setShowControls(false)}
          className="relative film-frame bg-black overflow-hidden group aspect-film w-full"
        >
          {/* HTML5 Video Element */}
          <video
            ref={videoRef}
            playsInline
            preload="metadata"
            poster="/film/frame-1.jpg"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => {
              setIsPlaying(false);
              setHasPlayedOnce(false);
              setCurrentTime(0);
              // Exit fullscreen when film ends
              if (document.fullscreenElement) {
                document.exitFullscreen().catch(() => {});
              }
            }}
            onTimeUpdate={() => {
              if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
            }}
            onLoadedMetadata={() => {
              if (videoRef.current) setDuration(videoRef.current.duration || 94);
            }}
            onClick={handlePlayPause}
            className="absolute inset-0 w-full h-full object-cover cursor-pointer"
          >
            <source src="/film/a-cor-da-lavanda.mp4" type="video/mp4" />
            O seu navegador não suporta a reprodução de vídeo.
          </video>

          {/* First Play Poster Overlay */}
          <AnimatePresence>
            {!hasPlayedOnce && (
              <motion.div
                key="poster-overlay"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                onClick={handleCinematicPlay}
                className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm z-10 text-center p-6 cursor-pointer"
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-24 h-24 rounded-full border border-lavender flex items-center justify-center text-lavender bg-black/60 hover:bg-lavender hover:text-background transition-all duration-500 shadow-[0_0_40px_rgba(158,128,214,0.5)] mb-6 focus:outline-none relative"
                  aria-label="Reproduzir filme"
                >
                  {/* Glowing pulsing outer ring */}
                  <span className="absolute inset-0 rounded-full border border-lavender/50 animate-ping opacity-75" />
                  <span className="text-2xl ml-1 relative z-10">▶</span>
                </motion.button>
                <span className="font-mono text-xs uppercase tracking-[0.4em] text-lavender text-glow-lavender font-semibold animate-pulse">
                  Iniciar Projecção · 94s
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* HUD Overlays (Visible when controls visible or paused) */}
          <div
            className={`absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-4 transition-opacity duration-700 ${
              isPlaying && !showControls ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-lavender/90 bg-background/40 backdrop-blur-sm px-2 py-1">
                FILME · {formatTime(duration)}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/70 bg-background/40 backdrop-blur-sm px-2 py-1">
                2.39:1 · Cinemascope
              </div>
            </div>
            <div className="flex justify-between items-end mb-14">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/70 bg-background/40 backdrop-blur-sm px-2 py-1">
                Sony a6300
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-lavender/90 bg-background/40 backdrop-blur-sm px-2 py-1 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                REC
              </div>
            </div>
          </div>

          {/* Custom Controls Bar */}
          <div
            className={`absolute bottom-0 inset-x-0 z-20 bg-background/85 border-t border-white/5 backdrop-blur-md px-4 py-3 transition-transform duration-500 flex flex-col gap-2 ${
              showControls ? "translate-y-0" : "translate-y-full"
            }`}
          >
            {/* Multiphase progress timeline bar */}
            <div
              onClick={handleSeek}
              className="relative w-full py-2 cursor-pointer group/bar flex items-center"
            >
              <div className="w-full h-1 md:h-1.5 bg-white/10 rounded-full flex overflow-hidden group-hover/bar:h-2 transition-all">
                {phasesInfo.map((p, idx) => {
                  const startPct = idx === 0 ? 0 : (phasesInfo[idx - 1].limit / duration) * 100;
                  const endPct = (p.limit / duration) * 100;
                  const widthPct = endPct - startPct;
                  
                  // Calculate progress inside this specific phase
                  const phaseCurrentProgress = Math.max(0, Math.min(currentTime - (idx === 0 ? 0 : phasesInfo[idx - 1].limit), p.limit - (idx === 0 ? 0 : phasesInfo[idx - 1].limit)));
                  const phaseDuration = p.limit - (idx === 0 ? 0 : phasesInfo[idx - 1].limit);
                  const playedPct = (phaseCurrentProgress / phaseDuration) * 100;

                  return (
                    <div
                      key={p.id}
                      className="h-full relative border-r border-black/20"
                      style={{ width: `${widthPct}%` }}
                    >
                      {/* Fill track */}
                      <div
                        className="absolute left-0 top-0 bottom-0 h-full transition-all duration-100 ease-out"
                        style={{
                          width: `${playedPct}%`,
                          backgroundColor: p.color,
                          boxShadow: `0 0 8px ${p.color}`,
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Controls buttons row */}
            <div className="flex items-center justify-between text-foreground">
              {/* Play / Pause */}
              <div className="flex items-center gap-4">
                <button
                  onClick={handlePlayPause}
                  className="font-mono text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground p-1 transition-colors focus:outline-none"
                  aria-label={isPlaying ? "Pausar" : "Reproduzir"}
                >
                  {isPlaying ? "❚❚ PAUSE" : "▶ PLAY"}
                </button>

                {/* Timecode */}
                <span className="font-mono text-xs text-muted-foreground/80 tracking-wide select-none">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              {/* Active Phase display */}
              <div className="hidden sm:flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: activePhase.color,
                    boxShadow: `0 0 10px ${activePhase.color}`,
                  }}
                />
                <span className="font-mono text-[9px] uppercase tracking-[0.25em]" style={{ color: activePhase.color }}>
                  PLANO 0{activePhase.id} · {activePhase.name}
                </span>
              </div>

              {/* Right tools */}
              <div className="flex items-center gap-4">
                {/* Mute toggle */}
                <button
                  onClick={handleMute}
                  className="font-mono text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground p-1 transition-colors focus:outline-none"
                  aria-label={isMuted ? "Activar som" : "Desactivar som"}
                >
                  {isMuted ? "🔇 MUTE" : "🔊 SOM"}
                </button>

                {/* Fullscreen toggle */}
                <button
                  onClick={handleFullscreen}
                  className="font-mono text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground p-1 transition-colors focus:outline-none"
                  aria-label="Ecrã inteiro"
                >
                  {isFullscreen ? "✕ JANELA" : "⤢ FULL"}
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Phase timecode strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-px bg-border/30 border border-border/30"
        >
          {[
            { t: "0:00 — 0:45", n: "01", c: "oklch(0.78 0.13 75)", label: "Memória" },
            { t: "0:46 — 1:15", n: "02", c: "oklch(0.45 0.05 285)", label: "Sombra" },
            { t: "1:16 — 1:22", n: "03", c: "oklch(0.62 0.14 230)", label: "Digital" },
            { t: "1:23 — 1:34", n: "04", c: "oklch(0.55 0.16 295)", label: "Abismo" },
          ].map((p, idx) => (
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
                  Plano {p.n} · {p.label}
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

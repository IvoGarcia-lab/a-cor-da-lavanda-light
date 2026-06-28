"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export function SoundEngine() {
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{
    osc1: OscillatorNode;
    osc2: OscillatorNode;
    osc2Overtone: OscillatorNode;
    osc3: OscillatorNode;
    noise3: AudioBufferSourceNode;
    osc4: OscillatorNode;
    noise4: AudioBufferSourceNode;
    gain1: GainNode;
    gain2: GainNode;
    gain3: GainNode;
    gain4: GainNode;
    masterGain: GainNode;
  } | null>(null);

  const initAudio = () => {
    if (audioCtxRef.current) return;

    // Create context
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioContextClass();
    audioCtxRef.current = ctx;

    // Create nodes
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0, ctx.currentTime);
    masterGain.connect(ctx.destination);

    // Helper to create noise buffer
    const bufferSize = ctx.sampleRate * 2; // 2 seconds
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    // --- PHASE 1: Sine 60Hz ---
    const osc1 = ctx.createOscillator();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(60, ctx.currentTime);
    const gain1 = ctx.createGain();
    gain1.gain.setValueAtTime(0, ctx.currentTime);
    osc1.connect(gain1);
    gain1.connect(masterGain);
    osc1.start();

    // --- PHASE 2: Sine 40Hz + 120Hz ---
    const osc2 = ctx.createOscillator();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(40, ctx.currentTime);
    
    const osc2Overtone = ctx.createOscillator();
    osc2Overtone.type = "sine";
    osc2Overtone.frequency.setValueAtTime(120, ctx.currentTime);

    const gain2 = ctx.createGain();
    gain2.gain.setValueAtTime(0, ctx.currentTime);
    
    osc2.connect(gain2);
    osc2Overtone.connect(gain2);
    gain2.connect(masterGain);
    
    osc2.start();
    osc2Overtone.start();

    // --- PHASE 3: Square 200Hz + Noise ---
    const osc3 = ctx.createOscillator();
    osc3.type = "square";
    osc3.frequency.setValueAtTime(200, ctx.currentTime);

    const noise3 = ctx.createBufferSource();
    noise3.buffer = noiseBuffer;
    noise3.loop = true;

    const gain3 = ctx.createGain();
    gain3.gain.setValueAtTime(0, ctx.currentTime);

    // Apply highpass filter to noise to make it hiss
    const noiseFilter3 = ctx.createBiquadFilter();
    noiseFilter3.type = "highpass";
    noiseFilter3.frequency.setValueAtTime(1000, ctx.currentTime);

    osc3.connect(gain3);
    noise3.connect(noiseFilter3);
    noiseFilter3.connect(gain3);
    gain3.connect(masterGain);

    osc3.start();
    noise3.start();

    // --- PHASE 4: Sawtooth 80Hz + Loud Noise ---
    const osc4 = ctx.createOscillator();
    osc4.type = "sawtooth";
    osc4.frequency.setValueAtTime(80, ctx.currentTime);

    const noise4 = ctx.createBufferSource();
    noise4.buffer = noiseBuffer;
    noise4.loop = true;

    const gain4 = ctx.createGain();
    gain4.gain.setValueAtTime(0, ctx.currentTime);

    const noiseFilter4 = ctx.createBiquadFilter();
    noiseFilter4.type = "bandpass";
    noiseFilter4.frequency.setValueAtTime(400, ctx.currentTime);
    noiseFilter4.Q.setValueAtTime(2, ctx.currentTime);

    osc4.connect(gain4);
    noise4.connect(noiseFilter4);
    noiseFilter4.connect(gain4);
    gain4.connect(masterGain);

    osc4.start();
    noise4.start();

    nodesRef.current = {
      osc1,
      osc2,
      osc2Overtone,
      osc3,
      noise3,
      osc4,
      noise4,
      gain1,
      gain2,
      gain3,
      gain4,
      masterGain,
    };
  };

  const toggleMute = () => {
    if (!audioCtxRef.current) {
      initAudio();
    }

    const ctx = audioCtxRef.current;
    if (!ctx) return;

    if (ctx.state === "suspended") {
      ctx.resume();
    }

    const nodes = nodesRef.current;
    if (!nodes) return;

    if (isMuted) {
      // Unmuting: Fade in master
      nodes.masterGain.gain.linearRampToValueAtTime(0.6, ctx.currentTime + 0.5);
      setIsMuted(false);
    } else {
      // Muting: Fade out master
      nodes.masterGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3);
      setIsMuted(true);
    }
  };

  useEffect(() => {
    let running = true;
    let raf = 0;

    const tick = () => {
      if (!running) return;

      const ctx = audioCtxRef.current;
      const nodes = nodesRef.current;
      
      if (ctx && nodes && !isMuted) {
        // Read current phase (0..3 float) from document styles
        const phaseStr = document.documentElement.style.getPropertyValue("--phase") || "0";
        const phase = parseFloat(phaseStr);

        // Calculate gains (crossfade)
        let g1 = 0, g2 = 0, g3 = 0, g4 = 0;

        if (phase <= 1) {
          // Fade from Phase 1 to Phase 2
          const t = phase; // 0..1
          g1 = (1 - t) * 0.08;
          g2 = t * 0.12;
        } else if (phase <= 2) {
          // Fade from Phase 2 to Phase 3
          const t = phase - 1; // 0..1
          g2 = (1 - t) * 0.12;
          g3 = t * 0.08;
        } else {
          // Fade from Phase 3 to Phase 4
          const t = phase - 2; // 0..1
          g3 = (1 - t) * 0.08;
          g4 = t * 0.18;
        }

        // Apply gain levels smoothly
        const tNow = ctx.currentTime;
        nodes.gain1.gain.setTargetAtTime(g1, tNow, 0.1);
        nodes.gain2.gain.setTargetAtTime(g2, tNow, 0.1);
        nodes.gain3.gain.setTargetAtTime(g3, tNow, 0.1);
        nodes.gain4.gain.setTargetAtTime(g4, tNow, 0.1);
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, [isMuted]);

  return (
    <button
      onClick={toggleMute}
      className="fixed bottom-6 left-6 z-40 flex items-center gap-2.5 py-2 px-4 bg-background/40 backdrop-blur-md border border-white/5 rounded-full hover:bg-white/10 hover:border-white/20 transition-all group film-frame focus:outline-none"
      aria-label={isMuted ? "Activar som" : "Desactivar som"}
    >
      {isMuted ? (
        <VolumeX className="w-3.5 h-3.5 text-muted-foreground group-hover:text-lavender transition-colors" />
      ) : (
        <Volume2 className="w-3.5 h-3.5 text-lavender animate-pulse" />
      )}
      <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-foreground/80">
        {isMuted ? "MUTE" : "SOM ON"}
      </span>
    </button>
  );
}

import { CinematicBackground } from "@/components/film/cinematic-background";
import { Hero } from "@/components/film/hero";
import { FilmNav } from "@/components/film/nav";
import { Manifesto } from "@/components/film/manifesto";
import { FourPhases } from "@/components/film/four-phases";
import { Filosofia } from "@/components/film/filosofia";
import { MapeamentoTecnico } from "@/components/film/mapeamento-tecnico";
import { GradingSuite } from "@/components/film/grading-suite";
import { Galeria } from "@/components/film/galeria";
import { EvolucaoSonora } from "@/components/film/evolucao-sonora";
import { VideoSection } from "@/components/film/video-section";
import { MakingOf } from "@/components/film/making-of";
import { Equipamento } from "@/components/film/equipamento";
import { Sintese } from "@/components/film/sintese";
import { Creditos } from "@/components/film/creditos";
import { FilmFooter } from "@/components/film/footer";
import { ScrollTimeline } from "@/components/film/scroll-timeline";
import { SoundEngine } from "@/components/film/sound-engine";
import { AutopilotScroll } from "@/components/film/autopilot-scroll";
import { ScrollToFilm } from "@/components/film/scroll-to-film";

export default function Home() {
  return (
    <>
      {/* Fixed cinematic canvas — evolves from warm analog dust to digital
          glitch as the viewer scrolls through the four phases. */}
      <CinematicBackground />
      <div className="film-grain" aria-hidden="true" />
      <div className="film-vignette" aria-hidden="true" />
      
      {/* Immersive interactive utilities */}
      <ScrollTimeline />
      <SoundEngine />
      <AutopilotScroll />
      <ScrollToFilm />

      <main
        id="top"
        className="relative z-10 min-h-screen flex flex-col"
      >
        <FilmNav />
        <Hero />
        <VideoSection />
        <Manifesto />
        <FourPhases />
        <Filosofia />
        <MapeamentoTecnico />
        <GradingSuite />
        <Galeria />
        <EvolucaoSonora />
        <MakingOf />
        <Equipamento />
        <Sintese />
        <Creditos />
        <FilmFooter />
      </main>
    </>
  );
}

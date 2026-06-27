import { CinematicBackground } from "@/components/film/cinematic-background";
import { Hero } from "@/components/film/hero";
import { FilmNav } from "@/components/film/nav";
import { Manifesto } from "@/components/film/manifesto";
import { FourPhases } from "@/components/film/four-phases";
import { Filosofia } from "@/components/film/filosofia";
import { MapeamentoTecnico } from "@/components/film/mapeamento-tecnico";
import { Galeria } from "@/components/film/galeria";
import { EvolucaoSonora } from "@/components/film/evolucao-sonora";
import { VideoSection } from "@/components/film/video-section";
import { Sintese } from "@/components/film/sintese";
import { FilmFooter } from "@/components/film/footer";

export default function Home() {
  return (
    <>
      {/* Fixed cinematic canvas — evolves from warm analog dust to digital
          glitch as the viewer scrolls through the four phases. */}
      <CinematicBackground />
      <main
        id="top"
        className="relative z-10 min-h-screen flex flex-col grain vignette"
      >
        <FilmNav />
        <Hero />
        <Manifesto />
        <FourPhases />
        <Filosofia />
        <MapeamentoTecnico />
        <Galeria />
        <EvolucaoSonora />
        <VideoSection />
        <Sintese />
        <FilmFooter />
      </main>
    </>
  );
}

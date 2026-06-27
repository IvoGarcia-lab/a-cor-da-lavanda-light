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
    <main
      id="top"
      className="relative min-h-screen flex flex-col bg-background grain vignette"
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
  );
}

"use client";

import { motion } from "framer-motion";
import Image from "next/image";

/* ── Equipment Data ─────────────────────────────────────────── */

interface EquipmentItem {
  name: string;
  category: string;
  image: string;
  specs: string[];
  role: string;
}

const EQUIPMENT: EquipmentItem[] = [
  {
    name: "Sony Alpha 6300",
    category: "Corpo de Câmara",
    image: "/film/equipment/sony-a6300.jpg",
    specs: [
      "Sensor APS-C 24.2 MP",
      "4K UHD (Super 35mm)",
      "425 pontos AF fase",
      "S-Log2 / S-Log3",
      "ISO 100–25600",
    ],
    role: "Corpo principal. O sensor Super 35mm com S-Log3 permite capturar o máximo de informação dinâmica para a gradação cromática em pós-produção, essencial para a transição progressiva 2000K→6500K do filme.",
  },
  {
    name: "Sony G 18–105mm f/4 OSS",
    category: "Lente Zoom",
    image: "/film/equipment/sony-g-18-105.png",
    specs: [
      "18–105mm (27–158mm equiv.)",
      "f/4 constante",
      "OSS — estabilização óptica",
      "Servo zoom interno",
      "Motorização silenciosa",
    ],
    role: "Lente de serviço. A abertura constante f/4 ao longo de todo o alcance focal garante exposição consistente durante movimentos de zoom lento, fundamentais nas transições entre fases.",
  },
  {
    name: "Sigma 16mm f/1.4 DC DN",
    category: "Lente Grande Angular",
    image: "/film/equipment/sigma-16mm.png",
    specs: [
      "16mm (24mm equiv.)",
      "f/1.4 máxima",
      "Série Contemporary",
      "Bokeh cremoso circular",
      "Motor AF HSM silencioso",
    ],
    role: "Olho interior. A abertura f/1.4 isola o sujeito do fundo com um desfoque orgânico e quente — a linguagem visual da Fase 1 (Memória), onde a nitidez se dissolve como uma recordação.",
  },
  {
    name: "Helios 44-2 Anamórfica Mod.",
    category: "Lente Vintage Modificada",
    image: "/film/equipment/helios-44-2.png",
    specs: [
      "58mm f/2 (M42)",
      "Mod. anamórfica artesanal",
      "Flares horizontais ovais",
      "Swirl bokeh característico",
      "Construção totalmente manual",
    ],
    role: "A alma do filme. Modificada artesanalmente para produzir flares anamórficos horizontais e o icónico bokeh em espiral — cada imperfeição óptica serve como metáfora da memória distorcida.",
  },
  {
    name: "Zhiyun Weebill-2",
    category: "Gimbal / Estabilização",
    image: "/film/equipment/zhiyun-weebill-2.png",
    specs: [
      "3 eixos de estabilização",
      "Ecrã táctil integrado 2.88\"",
      "Carga máxima 3.2 kg",
      "9h autonomia",
      "Modos: POV, Vortex, GO",
    ],
    role: "Fluidez cinematográfica. A estabilização de 3 eixos transforma movimentos manuais em travellings suaves, permitindo planos-sequência contínuos que sustentam a tensão narrativa sem cortes.",
  },
  {
    name: "Softbox LED",
    category: "Iluminação Principal",
    image: "/film/equipment/softbox-led.png",
    specs: [
      "Painel LED bi-color",
      "2700K–6500K ajustável",
      "CRI 95+ fidelidade",
      "Difusor de seda duplo",
      "Dimmer contínuo 0–100%",
    ],
    role: "Escultura de luz. O espectro bi-color (2700K–6500K) mapeia fisicamente a transição cromática do filme — começando no âmbar quente da memória e terminando no azul clínico do digital.",
  },
  {
    name: "Reflectores 5-em-1",
    category: "Controlo de Luz",
    image: "/film/equipment/reflectors.png",
    specs: [
      "5 superfícies: ouro/prata/branco/preto/difusor",
      "110cm diâmetro colapsável",
      "Preenchimento e recorte de luz",
      "Zero consumo elétrico",
      "Portátil e dobrável",
    ],
    role: "Arquitectura da sombra. Os reflectores dourado e preto são os mais usados — o ouro aquece e preenche as sombras suaves da Fase 1, o negro as aprofunda na Fase 2 (Sombra).",
  },
  {
    name: "Sennheiser MKE 200",
    category: "Microfone Direccional",
    image: "/film/equipment/sennheiser-mke200.png",
    specs: [
      "Cápsula supercardióide",
      "Montagem anti-choque interna",
      "Saída TRS 3.5mm",
      "Corpos de alumínio/aço",
      "Windscreen de espuma incluso",
    ],
    role: "O ouvido do silêncio. Captura a textura acústica do ambiente — respirações, fricção de tecido, o quase-silêncio orgânico — que depois é progressivamente destruído na pós-produção.",
  },
  {
    name: "Monitor de Campo 4K Sony",
    category: "Monitorização",
    image: "/film/equipment/monitor-4k.png",
    specs: [
      "5\" IPS 4K",
      "Resolução 1920×1080",
      "Peaking / Zebra / False Color",
      "Waveform / Histograma",
      "HDMI passthrough",
    ],
    role: "Verdade visual. O monitor externo com ferramentas de exposição (zebra, waveform) garante que cada frame mantém a informação necessária nos extremos — essencial quando se filma em S-Log.",
  },
];

const POSTPRODUCTION = {
  name: "DaVinci Resolve",
  category: "Pós-Produção & Gradação",
  image: "/film/equipment/davinci-resolve.jpg",
  profile: "Cine4 Color PRO",
  details: [
    { label: "Perfil de Filmagem", value: "Cine4 Color PRO" },
    { label: "Espaço de Cor", value: "S-Log3 → Rec.709" },
    { label: "Gradação", value: "DaVinci Resolve — Color Wheels + Curves" },
    { label: "Montagem", value: "DaVinci Resolve — Cut/Edit Page" },
    { label: "Áudio", value: "DaVinci Resolve — Fairlight" },
    { label: "Entrega Final", value: "H.265 4K · 24fps · 2.39:1 Cinemascope" },
  ],
  role: "O único software de pós-produção. Do corte à gradação, do som à exportação final — tudo acontece dentro do DaVinci Resolve. O perfil Cine4 Color PRO capturado na câmara é o ponto de partida para a transformação cromática completa do filme.",
};

/* ── Component ──────────────────────────────────────────────── */

export function Equipamento() {
  return (
    <section
      id="equipamento"
      className="relative py-32 md:py-48 px-6 md:px-12 overflow-hidden border-t border-border/30"
    >
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 -z-10 opacity-20"
        style={{
          background:
            "radial-gradient(ellipse at 30% 40%, oklch(0.62 0.14 230 / 0.3), transparent 60%), radial-gradient(ellipse at 70% 60%, oklch(0.45 0.16 295 / 0.2), transparent 60%)",
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
          Equipamento · Arsenal cinematográfico
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 md:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.1, delay: 0.1 }}
            className="lg:col-span-8 font-[family-name:var(--font-display)] font-light text-5xl md:text-7xl leading-[0.95] tracking-tight"
          >
            As ferramentas que{" "}
            <span className="italic text-lavender text-glow-lavender">
              traduzem o invisível.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.3 }}
            className="lg:col-span-4 self-end text-base md:text-lg text-muted-foreground leading-relaxed"
          >
            Cada peça de equipamento foi escolhida não apenas pela sua capacidade
            técnica, mas pelo seu carácter estético — a forma como cada lente respira,
            como cada microfone escuta o silêncio.
          </motion.p>
        </div>

        {/* ── Equipment Grid ────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-20 md:mb-32">
          {EQUIPMENT.map((item, i) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.07 }}
              className="group film-frame overflow-hidden hover:border-lavender/30 transition-colors duration-700 flex flex-col"
            >
              {/* Header (Always visible, compact) */}
              <div className="p-5 md:p-6 flex items-center justify-between gap-4 cursor-pointer bg-card/5">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-lavender/60">
                    {item.category}
                  </span>
                  <h3 className="font-[family-name:var(--font-display)] text-lg md:text-xl text-foreground group-hover:text-glow-lavender transition-all duration-500">
                    {item.name}
                  </h3>
                </div>
                <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-lavender/40 group-hover:text-lavender transition-colors duration-500 whitespace-nowrap">
                  ➔ ver mais
                </span>
              </div>

              {/* Curtain Drawer (Opens on hover) */}
              <div className="max-h-0 group-hover:max-h-[600px] overflow-hidden transition-all duration-[800ms] ease-in-out border-t border-border/0 group-hover:border-border/20">
                {/* Image */}
                <div className="relative w-full h-48 bg-black/30">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1200ms] ease-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                </div>

                {/* Details Content */}
                <div className="p-6 md:p-8">
                  {/* Specs */}
                  <div className="space-y-1.5 mb-5">
                    {item.specs.map((spec) => (
                      <div
                        key={spec}
                        className="flex items-center gap-2 text-xs text-foreground/70"
                      >
                        <span className="w-1 h-1 rounded-full bg-lavender/50 shrink-0" />
                        <span className="font-mono text-[10px] tracking-wide">
                          {spec}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Role description */}
                  <p className="text-xs text-muted-foreground leading-relaxed border-t border-border/10 pt-4">
                    {item.role}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* ── Post-Production Section ───────────────────────── */}
        <div className="border-t border-border/30 pt-16 md:pt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] text-lavender/70 mb-10 flex items-center gap-4"
          >
            <span className="h-px w-12 bg-lavender/40" />
            Pós-Produção · O laboratório digital
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* DaVinci Resolve Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1, delay: 0.1 }}
              className="lg:col-span-7 relative aspect-[16/9] overflow-hidden film-frame"
            >
              <Image
                src={POSTPRODUCTION.image}
                alt={POSTPRODUCTION.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-white/60 block mb-2">
                  {POSTPRODUCTION.category}
                </span>
                <h3 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-white">
                  {POSTPRODUCTION.name}
                </h3>
              </div>
            </motion.div>

            {/* Specs Grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1, delay: 0.3 }}
              className="lg:col-span-5 flex flex-col justify-between"
            >
              <div className="grid grid-cols-1 gap-px bg-border/20 border border-border/20 mb-6">
                {POSTPRODUCTION.details.map((d) => (
                  <div
                    key={d.label}
                    className="bg-background p-5 hover:bg-card/20 transition-colors"
                  >
                    <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground block mb-1">
                      {d.label}
                    </span>
                    <span className="text-sm text-foreground font-light font-[family-name:var(--font-display)]">
                      {d.value}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {POSTPRODUCTION.role}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

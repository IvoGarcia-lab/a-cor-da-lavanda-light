// Data extracted from the deep VLM analysis of the 5 conceptual maps
// Film: "A Cor da Lavanda" — Anatomia Cinematográfica de 94 Segundos
// Technical and conceptual data for A Cor da Lavanda short film.

export type Phase = {
  id: number;
  index: string;
  timecode: string;
  duration: string;
  name: string;
  subtitle: string;
  theme: string;
  color: "memory" | "shadow" | "digital" | "abyss";
  hex: string;
  temperature: string;
  lens: string;
  camera: string;
  light: string;
  sound: string;
  voice: string;
  quote: string;
  quoteAuthor: string;
  symbol: string;
  movement: string;
  description: string;
};

export const PHASES: Phase[] = [
  {
    id: 1,
    index: "01",
    timecode: "0:00 — 0:45",
    duration: "45s",
    name: "O Despertar Analógico",
    subtitle: "O Amanhecer da Memória",
    theme: "Memória · Tempo · Organicidade",
    color: "memory",
    hex: "#d4a574",
    temperature: "2000K — 3200K · Poente",
    lens: "Anamórfica 80mm",
    camera: "Sony a6300 · Tripé",
    light: "Luz natural quente e dourada (Golden Hour)",
    sound: "Silêncio orgânico · Ambiente sutil",
    voice: "Voz pausada — 20s — verdade analógica",
    quote: "O tempo tinha outra textura.",
    quoteAuthor: "Plano 1",
    symbol: "Mãos sobre papel · Cerâmica · Onda dourada",
    movement: "Estático — textura do tempo",
    description:
      "A luz quente do poente acaricia a textura do papel e da cerâmica. O corpo guarda memórias sensoriais que o intelecto não alcança. Proust dizia que o passado está escondido longe do intelecto, fora do seu império, em algo material que não suspeitávamos. É o despertar da memória involuntária — visceral, analógica.",
  },
  {
    id: 2,
    index: "02",
    timecode: "0:46 — 1:15",
    duration: "30s",
    name: "O Confronto com a Sombra",
    subtitle: "O Crepúsculo do Ego",
    theme: "Sombra · Vazio · Isolamento",
    color: "shadow",
    hex: "#5a4a6b",
    temperature: "3200K — 4500K · Crepúsculo",
    lens: "Anamórfica 80mm · Gimbal",
    camera: "Sony a6300 · Pullback dinâmico",
    light: "Penumbra azulada — luz natural morre",
    sound: "Zumbido grave em crescendo — tensão",
    voice: "Voz de sombra — 18s — inexorável e pesada",
    quote: "Jung avisou-nos: o confronto com a própria sombra é aterrorizador.",
    quoteAuthor: "Carl Jung",
    symbol: "Cadeira vazia · Silhueta · Losango do ego",
    movement: "Pullback — recuo para o abismo",
    description:
      "A luz do sol desvanece. A câmara recua num pullback dinâmico, revelando a cadeira vazia — o terreno preparado para a intrusão. A sombra, arquétipo junguiano, é tudo aquilo que não desejamos ser. Os traços reprimidos começam a projetar-se. A tensão entre opostos — consciência e inconsciente — é a condição da individuação.",
  },
  {
    id: 3,
    index: "03",
    timecode: "1:16 — 1:22",
    duration: "7s",
    name: "A Anestesia Digital",
    subtitle: "A Capitulação do Ego",
    theme: "Digitalização · Anestesia · Fuga",
    color: "digital",
    hex: "#4a7c9a",
    temperature: "6500K · LED estéril",
    lens: "Sigma 16mm · Mini Softbox",
    camera: "Sony a6300 · Plano médio de perfil",
    light: "Luz artificial fria — alto contraste",
    sound: "Choque · Ruído digital invasivo",
    voice: "Voz fria e anestesiada — 8s",
    quote: "Substituímos o abismo pelo ruído.",
    quoteAuthor: "Plano 3",
    symbol: "Smartphone · Circuitos · Reflexo no vidro",
    movement: "Acelerado — ritmo da distração",
    description:
      "A luz azul estéril inunda o ambiente. O smartphone projecta uma sombra subtil que isola. A fuga do ego para a anestesia digital — em vez de descer ao abismo da sombra, sobe-se ao ruído infinito de um ecrã. Aquilo que não desejamos ser é projetado no fluxo digital. O choque de realidades cria um drama de alto contraste.",
  },
  {
    id: 4,
    index: "04",
    timecode: "1:23 — 1:34",
    duration: "12s",
    name: "O Abismo do Vidro",
    subtitle: "O Desfecho Fragmentado",
    theme: "Reflexo · Desconexão · Silêncio",
    color: "abyss",
    hex: "#6b5b8e",
    temperature: "6500K absoluto",
    lens: "Sigma 16mm · Macro grande plano",
    camera: "Sony a6300 · Extremo close-up do olho",
    light: "Reflexo do feed em loop na íris",
    sound: "Frequência digital frenética — corte abrupto para negro",
    voice: "Sussurro final — 3s — antes do silêncio total",
    quote: "A ideia... morreu no vidro.",
    quoteAuthor: "Plano 4",
    symbol: "Olho em loop · Feed · Vidro fragmentado",
    movement: "Estático — então corte para negro",
    description:
      "Grande plano extremo da íris, refletindo o movimento frenético e cocofânico das redes sociais em loop. Aos 94 segundos, luz e som cessam instantaneamente. A integração falhou: a memória não se reconciliou com a sombra, e a idea morreu no vidro. O caminho da individuação exige o silêncio absoluto que o digital recusa.",
  },
];

export type PhilosophyCard = {
  author: string;
  years: string;
  concept: string;
  role: string;
  text: string;
  quote: string;
  color: "memory" | "shadow" | "digital" | "abyss";
};

export const PHILOSOPHY: PhilosophyCard[] = [
  {
    author: "Marcel Proust",
    years: "1871 — 1922",
    concept: "Memória Involuntária",
    role: "Fase 1 · O gatilho sensorial",
    text: "A memória voluntária é a inteligência escrava do esforço consciente. A involuntária é o acaso sensorial — uma textura, um cheiro, um gesto — que revela a realidade viva do passado sem deformação. O passado está escondido fora do império do intelecto, em algo material que não suspeitávamos.",
    quote: "Cessava de me sentir mediocre, contingente, mortal.",
    color: "memory",
  },
  {
    author: "Carl Jung",
    years: "1875 — 1961",
    concept: "Confronto com a Sombra",
    role: "Fase 2 · A descida psicológica",
    text: "A sombra representa o lado obscuro e reprimido da nossa personalidade, mas é também a porta de entrada para a totalidade do si-mesmo. Ninguém se torna iluminado imaginando figuras de luz, mas sim tornando a escuridão consciente. O confronto com o inconsciente é o primeiro passo da individuação.",
    quote: "O confronto com a própria sombra é aterrorizador.",
    color: "shadow",
  },
  {
    author: "Anestesia Digital",
    years: "Século XXI",
    concept: "O Escudo do Vidro",
    role: "Fases 3 & 4 · A capitulação da alma",
    text: "O ecrã tátil (o vidro) serve como uma barreira que anestesia o sofrimento existencial e suspende o confronto com o abismo interior. O indivíduo prefere refugiar-se na distração constante, no feed contínuo e na iluminação estéril de 6500K a encarar a sua própria sombra, resultando no colapso e na morte da ideia.",
    quote: "Substituímos o abismo pelo ruído.",
    color: "abyss",
  },
];

export type TechSpec = {
  label: string;
  phase1: string;
  phase2: string;
  phase3: string;
  phase4: string;
};

export const TECH_SPECS: TechSpec[] = [
  {
    label: "Câmara",
    phase1: "Sony a6300 · Tripé",
    phase2: "Sony a6300 · Gimbal",
    phase3: "Sony a6300 · Plano Médio",
    phase4: "Sony a6300 · Extremo Close-up",
  },
  {
    label: "Lente",
    phase1: "Anamórfica 80mm",
    phase2: "Anamórfica 80mm",
    phase3: "Sigma 16mm (Grande angular)",
    phase4: "Sigma 16mm + Lente Macro",
  },
  {
    label: "Temperatura",
    phase1: "2000K — 3200K (Quente)",
    phase2: "3200K — 4500K (Fria/Neutro)",
    phase3: "6500K (Branco Frio)",
    phase4: "6500K Absoluto (Azulado)",
  },
  {
    label: "Iluminação",
    phase1: "Luz Natural (Golden Hour)",
    phase2: "Penumbra (Luz natural morre)",
    phase3: "Luz Artificial Fria (LED/Ecrã)",
    phase4: "Brilho do Feed na Córnea",
  },
  {
    label: "Movimento",
    phase1: "Estático · Contemplativo",
    phase2: "Pullback Lento · Recuo",
    phase3: "Aceleração · Cortes rápidos",
    phase4: "Estático · Flash/Corte Negro",
  },
  {
    label: "Som",
    phase1: "Silêncio Orgânico · Sons da duna",
    phase2: "Hum / Drone grave em crescendo",
    phase3: "Ruído Digital · Glitch · Choques",
    phase4: "Cofonia frenética → Silêncio",
  },
  {
    label: "Voz Off",
    phase1: "Orgânica · Pausada (20s)",
    phase2: "Ecoada · Pesada (18s)",
    phase3: "Sintetizada · Fria (8s)",
    phase4: "Sussurro final (3s) → Silêncio",
  },
  {
    label: "Paleta OKLCH",
    phase1: "oklch(0.78 0.13 75) · Dourado",
    phase2: "oklch(0.30 0.04 285) · Roxão",
    phase3: "oklch(0.62 0.14 230) · Azul",
    phase4: "oklch(0.45 0.16 295) · Violeta",
  },
];

export type SoundPhase = {
  phase: string;
  label: string;
  color: "memory" | "shadow" | "digital" | "abyss";
  description: string;
};

export const SOUND_EVOLUTION: SoundPhase[] = [
  {
    phase: "1",
    label: "Analógico",
    color: "memory",
    description: "Ondas suaves — silêncio orgânico, ambiente sutil",
  },
  {
    phase: "2",
    label: "Tensão",
    color: "shadow",
    description: "Ondas agitadas — zumbido grave em crescendo",
  },
  {
    phase: "3",
    label: "Digital",
    color: "digital",
    description: "Ondas frias — choque e ruído digital invasivo",
  },
  {
    phase: "4",
    label: "Colapso",
    color: "abyss",
    description: "Ondas fragmentadas — frequência frenética, corte para negro",
  },
];

export type GalleryItem = {
  src: string;
  title: string;
  caption: string;
  meta: string;
};

export const GALLERY: GalleryItem[] = [
  {
    src: "/film/frame-1.jpg",
    title: "A Flor e a Memória",
    caption:
      "A lavanda selvagem cresce na duna sob a luz suave do poente. É a âncora sensorial da primeira fase — a memória involuntária de Proust antes da intrusão digital.",
    meta: "Plano 01 · 0:00 — 0:45 · Memória",
  },
  {
    src: "/film/frame-2.jpg",
    title: "O Despertar da Sombra",
    caption:
      "Grande plano dos olhos fechados com maquilhagem violeta. O crepúsculo do ego, onde a perceção interna se desvia do mundo físico para encarar o inconsciente.",
    meta: "Plano 02 · 0:46 — 1:15 · Sombra",
  },
  {
    src: "/film/frame-3.jpg",
    title: "O Toque Analógico",
    caption:
      "A mão repousa sobre a mesa de linho bordado ao lado de um caderno em branco. A última ligação tátil e orgânica com o tempo e a matéria real antes da transição.",
    meta: "Plano 03 · 0:46 — 1:15 · Transição",
  },
  {
    src: "/film/frame-4.jpg",
    title: "A Anestesia Digital",
    caption:
      "A luz fria do ecrã do telemóvel inunda o rosto e o ambiente em tons de azul elétrico. A capitulação do ego e a fuga da sombra junguiana para o ruído do vidro.",
    meta: "Plano 04 · 1:16 — 1:22 · Digital",
  },
  {
    src: "/film/frame-5.jpg",
    title: "O Abismo do Vidro",
    caption:
      "Grande plano do perfil, absorvido pelo brilho estéril do smartphone. O feed de redes sociais consome a atenção até ao corte abrupto para negro e silêncio aos 94s.",
    meta: "Plano 05 · 1:23 — 1:34 · Abismo",
  },
  {
    src: "/film/frame-6.jpg",
    title: "A Introspeção do Vidro",
    caption:
      "A luz azul do ecrã esculpe o rosto na escuridão. O sujeito é capturado pelo reflexo luminoso, numa perda progressiva de contacto com o real.",
    meta: "Plano 06 · 1:16 — 1:22 · Absorção",
  },
  {
    src: "/film/frame-7.jpg",
    title: "O Abismo na Córnea",
    caption:
      "Grande plano macro do olho. A imagem refletida na córnea é o próprio ecrã — a ideia que morre aprisionada no vidro aos 94 segundos.",
    meta: "Plano 07 · 1:23 — 1:34 · Colapso",
  },
];

export const CONCEPTUAL_MAPS = [
  {
    src: "/film/linha-pensamento.png",
    title: "A Linha de Pensamento",
    subtitle: "Anatomia Cinematográfica de 94 Segundos",
    description:
      "O mapa-mãe. Demonstra a relação técnica e narrativa entre diálogos, iluminação e composição visual em cada plano — do dourado da memória ao abismo do vidro.",
  },
  {
    src: "/film/jung-sombra.png",
    title: "Entre a Memória e a Sombra de Jung",
    subtitle: "Proust × Jung · Quatro Fases",
    description:
      "O cruzamento filosófico. A memória involuntária de Proust como gatilho para a emergência da sombra junguiana, com a tecnologia como antagonista da individuação.",
  },
  {
    src: "/film/mapeamento-tecnico.png",
    title: "Mapeamento Técnico",
    subtitle: "Câmara · Lente · Luz · Som · Montagem",
    description:
      "A engenharia invisível. Cada escolha técnica — da Sony a6300 ao Sigma 16mm, de 2000K a 6500K absoluto — serve a degradação narrativa de orgânico a estéril.",
  },
  {
    src: "/film/sintese.png",
    title: "Síntese",
    subtitle: "Mapa da Evolução Sonora e Narrativa",
    description:
      "A partitura final. Ondas amarelas, laranja, azuis e cianas desenham a degradação: memória → tension → anestesia → colapso. A ideia morre no vidro aos 94s.",
  },
];

export const FINAL_QUOTE = {
  text: "A ideia... morreu no vidro.",
  subtitle: "94 segundos. Corte para negro. Silêncio.",
};

export const NAV_ITEMS = [
  { href: "#video", label: "Filme" },
  { href: "#manifesto", label: "Manifesto" },
  { href: "#fases", label: "4 Fases" },
  { href: "#filosofia", label: "Filosofia" },
  { href: "#tecnico", label: "Técnica" },
  { href: "#grading", label: "Gradação" },
  { href: "#galeria", label: "Galeria" },
  { href: "#som", label: "Som" },
  { href: "#making-of", label: "Bastidores" },
  { href: "#equipamento", label: "Equipamento" },
  { href: "#sintese", label: "Síntese" },
  { href: "#creditos", label: "Créditos" },
];

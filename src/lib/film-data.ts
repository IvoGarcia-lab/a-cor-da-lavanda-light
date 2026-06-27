// Data extracted from the deep VLM analysis of the 5 conceptual maps
// Film: "A Cor da Lavanda" — Anatomia Cinematográfica de 120 Segundos

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
    timecode: "0:00 — 0:40",
    duration: "40s",
    name: "O Despertar Analógico",
    subtitle: "O Amanhecer da Memória",
    theme: "Memória · Tempo · Organicidade",
    color: "memory",
    hex: "#d4a574",
    temperature: "2000K — 3200K · Poente",
    lens: "Anamórfica 80mm",
    camera: "Sony a6500 · Tripé",
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
    timecode: "0:40 — 1:20",
    duration: "40s",
    name: "O Confronto com a Sombra",
    subtitle: "O Crepúsculo do Ego",
    theme: "Sombra · Vazio · Isolamento",
    color: "shadow",
    hex: "#5a4a6b",
    temperature: "3200K — 4500K · Crepúsculo",
    lens: "Anamórfica 80mm · Gimbal",
    camera: "Sony a6500 · Pullback dinâmico",
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
    timecode: "1:20 — 1:55",
    duration: "35s",
    name: "A Anestesia Digital",
    subtitle: "A Capitulação do Ego",
    theme: "Digitalização · Anestesia · Fuga",
    color: "digital",
    hex: "#4a7c9a",
    temperature: "6500K · LED estéril",
    lens: "Sigma 16mm · Mini Softbox",
    camera: "Sony a6500 · Plano médio de perfil",
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
    timecode: "1:55 — 2:00",
    duration: "5s",
    name: "O Abismo do Vidro",
    subtitle: "O Desfecho Fragmentado",
    theme: "Reflexo · Desconexão · Silêncio",
    color: "abyss",
    hex: "#6b5b8e",
    temperature: "6500K absoluto",
    lens: "Sigma 16mm · Macro grande plano",
    camera: "Sony a6500 · Extremo close-up do olho",
    light: "Reflexo do feed em loop na íris",
    sound: "Frequência digital frenética — corte abrupto para negro",
    voice: "Sussurro final — 3s — antes do silêncio total",
    quote: "A ideia... morreu no vidro.",
    quoteAuthor: "Plano 4",
    symbol: "Olho em loop · Feed · Vidro fragmentado",
    movement: "Estático — então corte para negro",
    description:
      "Grande plano extremo da íris, refletindo o movimento frenético e cocofânico das redes sociais em loop. Aos 120 segundos, luz e som cessam instantaneamente. A integração falhou: a memória não se reconciliou com a sombra, e a ideia morreu no vidro. O caminho da individuação exige o silêncio absoluto que o digital recusa.",
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
    author: "Carl G. Jung",
    years: "1875 — 1961",
    concept: "A Sombra como Arquétipo",
    role: "Fase 2 · O confronto",
    text: "A sombra é tudo aquilo que o indivíduo rejeita — mesmo sem reconhecer. Os traços reprimidos projetam-se no outro, no digital, no social. A vida exige a tensão entre consciência e inconsciente; sem ela, não há individuação. O confronto com a própria sombra é aterrorizador, mas inevitável.",
    quote: "Aquilo que não desejamos ser.",
    color: "shadow",
  },
  {
    author: "A Anestesia Digital",
    years: "século XXI",
    concept: "A Sombra no Vidro",
    role: "Fases 3 · 4 · O antagonista",
    text: "A tecnologia não é inimiga da memória — é a sua anestesia. Em vez de descer ao abismo da sombra, o ego sobe ao ruído infinito de um ecrã. O brilho frio do smartphone cria uma sombra subtil que isola e neurotiza. A cocofania das redes substitui o silêncio exigido pela individuação.",
    quote: "Substituímos o abismo pelo ruído.",
    color: "digital",
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
    phase1: "Sony a6500",
    phase2: "Sony a6500",
    phase3: "Sony a6500",
    phase4: "Sony a6500",
  },
  {
    label: "Lente",
    phase1: "Anamórfica 80mm",
    phase2: "Anamórfica 80mm",
    phase3: "Sigma 16mm + Softbox",
    phase4: "Sigma 16mm · Macro",
  },
  {
    label: "Temperatura de cor",
    phase1: "2000K — 3200K",
    phase2: "3200K — 4500K",
    phase3: "6500K",
    phase4: "6500K absoluto",
  },
  {
    label: "Iluminação",
    phase1: "Poente · Natural",
    phase2: "Crepúsculo · Transição",
    phase3: "LED estéril · Alto contraste",
    phase4: "Reflexo do feed",
  },
  {
    label: "Movimento",
    phase1: "Tripé · Estático",
    phase2: "Gimbal · Pullback",
    phase3: "Plano médio de perfil",
    phase4: "Extremo close-up",
  },
  {
    label: "Som",
    phase1: "Silêncio orgânico",
    phase2: "Zumbido grave",
    phase3: "Ruído digital",
    phase4: "Frequência frenética",
  },
  {
    label: "Voz",
    phase1: "20s · Pausada",
    phase2: "18s · Pesada",
    phase3: "8s · Anestesiada",
    phase4: "3s · Sussurro",
  },
  {
    label: "Paleta",
    phase1: "Dourado · Âmbar",
    phase2: "Sombra · Azul-violeta",
    phase3: "Ciano · Estéril",
    phase4: "Violeta · Reflexo",
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
    src: "/film/ref-01.jpg",
    title: "Calibração no Espelho",
    caption:
      "O banheiro como laboratório de luz. O painel de cor mede o que a percepção recusa — a cor da lavanda é fluida, subjectiva, inapreensível.",
    meta: "Referência visual · 01",
  },
  {
    src: "/film/ref-02.jpg",
    title: "O Estúdio Doméstico",
    caption:
      "A sala de estar tornada palco. Luz dual — azul e verde — cria o limbo entre o real e o sonhado. O buquê de flores secas guarda a memória que seca mas não desaparece.",
    meta: "Referência visual · 02",
  },
  {
    src: "/film/ref-03.jpg",
    title: "O Gráfico e o Linho",
    caption:
      "Datacolor sobre linho bordado. A ciência tenta catalogar o que a arte evoca. A caneta pronta, o relógio a contar — o tempo não espera pela ideia.",
    meta: "Referência visual · 03",
  },
  {
    src: "/film/calibracao.png",
    title: "A Carta de Cores",
    caption:
      "O rosto desaparece na luz monocromática. A paleta violeta tinge a pele, o cabelo, o ar. A cor da lavanda deixa de ser imagem — torna-se atmosfera.",
    meta: "Teste de cor · calibração",
  },
];

export const CONCEPTUAL_MAPS = [
  {
    src: "/film/linha-pensamento.png",
    title: "A Linha de Pensamento",
    subtitle: "Anatomia Cinematográfica de 120 Segundos",
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
      "A engenharia invisível. Cada escolha técnica — da Sony a6500 ao Sigma 16mm, de 2000K a 6500K absoluto — serve a degradação narrativa de orgânico a estéril.",
  },
  {
    src: "/film/sintese.png",
    title: "Síntese",
    subtitle: "Mapa da Evolução Sonora e Narrativa",
    description:
      "A partitura final. Ondas amarelas, laranja, azuis e cianas desenham a degradação: memória → tensão → anestesia → colapso. A ideia morre no vidro aos 120s.",
  },
];

export const FINAL_QUOTE = {
  text: "A ideia... morreu no vidro.",
  subtitle: "120 segundos. Corte para negro. Silêncio.",
};

export const NAV_ITEMS = [
  { href: "#manifesto", label: "Manifesto" },
  { href: "#fases", label: "4 Fases" },
  { href: "#filosofia", label: "Filosofia" },
  { href: "#tecnico", label: "Técnica" },
  { href: "#galeria", label: "Galeria" },
  { href: "#som", label: "Som" },
  { href: "#sintese", label: "Síntese" },
];

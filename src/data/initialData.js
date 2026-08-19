export const INITIAL_COURSES = [
  {
    id: "curso-beat-maker",
    title: "Curso de Beat Maker Profissional",
    shortDescription: "Aprenda a criar beats profissionais de Afrobeat, Amapiano, Trap e Kizomba do zero ao nível comercial.",
    description: "Domine a arte da criação de beats do zero ao nível comercial com o mentor Silva Jermane. Você aprenderá seleção de drumkits, afinação de 808s, estruturas de arranjos que prendem a atenção e exportação de stems para venda.",
    thumbnail: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800&auto=format&fit=crop",
    banner: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop",
    instructor: "Silva Jermane (Jayon Tivane)",
    instructorRole: "Produtor Musical & Sound Engineer",
    instructorAvatar: "/jayon-tivane.jpg",
    level: "Iniciante ao Avançado",
    duration: "6 Horas • 3 Aulas",
    rating: 4.9,
    studentsCount: 342,
    price: 1500,
    currency: "MT",
    isFeatured: true,
    modules: [
      {
        id: "mod-bm-1",
        title: "Módulo Principal — Criação de Beats & Bateria",
        lessons: [
          {
            id: "les-bm-1",
            title: "Aula 1: Introdução ao Beat Making & Setup do Estúdio",
            duration: "25:00",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            isFree: true,
            description: "Pilares essenciais da produção de beats, escolha de plugins e configuração da DAW.",
            materials: [{ name: "Guia_Setup_Beatmaker.pdf", size: "2.4 MB", url: "#" }]
          },
          {
            id: "les-bm-2",
            title: "Aula 2: Bateria, Percussão & Groove Afrobeat / Amapiano",
            duration: "35:00",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            isFree: false,
            description: "Programação de kicks potentes, claps, shakers e log drums com swing e dinâmica.",
            materials: [{ name: "Starter_Drumkit_Jayon.zip", size: "45.8 MB", url: "#" }]
          },
          {
            id: "les-bm-3",
            title: "Aula 3: Harmonia, Melodias, 808s e Arranjo Final",
            duration: "40:00",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            isFree: false,
            description: "Criação de progressões de acordes, afinação e slides de 808 e estruturação para venda.",
            materials: [{ name: "Chord_Progressions_Pack.midi", size: "1.8 MB", url: "#" }]
          }
        ]
      }
    ]
  },
  {
    id: "curso-mixagem",
    title: "Curso de Mixagem de Áudio & Voz",
    shortDescription: "Domine as técnicas de equalização, compressão, saturação e espacialidade para vozes e instrumentais.",
    description: "Aprenda a fazer mixagens limpas, com clareza e impacto que soam equilibradas em qualquer sistema de som, desde telemóveis até grandes colunas de discoteca.",
    thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop",
    banner: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop",
    instructor: "Silva Jermane Hlatswayo",
    instructorRole: "Engenheiro de Som & Produtor Sênior",
    instructorAvatar: "/jayon-tivane.jpg",
    level: "Intermediário ao Avançado",
    duration: "5 Horas • 3 Aulas",
    rating: 5.0,
    studentsCount: 284,
    price: 1500,
    currency: "MT",
    isFeatured: true,
    modules: [
      {
        id: "mod-mix-1",
        title: "Módulo Principal — Mixagem Comercial de Voz e Beat",
        lessons: [
          {
            id: "les-mix-1",
            title: "Aula 1: Fundamentos de Mixagem, Ganho & Equilíbrio",
            duration: "20:00",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            isFree: true,
            description: "Gain staging, organização de canais no mixer e equilíbrio de volumes estáticos.",
            materials: [{ name: "Checklist_Gain_Staging.pdf", size: "1.2 MB", url: "#" }]
          },
          {
            id: "les-mix-2",
            title: "Aula 2: Equalização (EQ) e Compressão Vocal e de Bateria",
            duration: "38:00",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
            isFree: false,
            description: "Corte de frequências indesejadas, controle dinâmico com compressores e de-esser.",
            materials: [{ name: "Tabela_Frequencias_EQ.pdf", size: "850 KB", url: "#" }]
          },
          {
            id: "les-mix-3",
            title: "Aula 3: Efeitos Espaciais (Reverb, Delay, Stereo Imaging)",
            duration: "30:00",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
            isFree: false,
            description: "Criação de profundidade, ambiente 3D e largura estéreo sem perda de compatibilidade mono.",
            materials: [{ name: "Presets_Reverb_Delay.zip", size: "3.2 MB", url: "#" }]
          }
        ]
      }
    ]
  },
  {
    id: "curso-masterizacao",
    title: "Curso de Masterização Profissional",
    shortDescription: "Aprenda técnicas de masterização para preparar músicas com volume competitivo para streaming e rádios.",
    description: "Leve as suas faixas ao nível das grandes gravadoras internacionais. Aprenda medição de Loudness (LUFS/True Peak), controle dinâmico multibanda, saturação e limiters comerciais.",
    thumbnail: "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?q=80&w=800&auto=format&fit=crop",
    banner: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop",
    instructor: "Silva Jermane Hlatswayo",
    instructorRole: "Engenheiro de Som & Produtor Sênior",
    instructorAvatar: "/jayon-tivane.jpg",
    level: "Intermediário ao Avançado",
    duration: "5 Horas • 3 Aulas",
    rating: 5.0,
    studentsCount: 218,
    price: 1500,
    currency: "MT",
    isFeatured: true,
    modules: [
      {
        id: "mod-mst-1",
        title: "Módulo Principal — Masterização para Streaming & Rádios",
        lessons: [
          {
            id: "les-mst-1",
            title: "Aula 1: A Filosofia da Masterização & Loudness (LUFS)",
            duration: "22:00",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
            isFree: true,
            description: "Diferença entre Mix e Master, compreensão real de LUFS, Dynamic Range e True Peak.",
            materials: [{ name: "Tabela_Loudness_Streaming_2026.pdf", size: "1.4 MB", url: "#" }]
          },
          {
            id: "les-mst-2",
            title: "Aula 2: Cadeia de Sinal (EQ Mid/Side, Saturação e Clipper)",
            duration: "32:00",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
            isFree: false,
            description: "Tratamento cirúrgico de frequências, cola dinâmica e ganho analógico sem distorção.",
            materials: [{ name: "Mastering_Chain_Preset.zip", size: "2.1 MB", url: "#" }]
          },
          {
            id: "les-mst-3",
            title: "Aula 3: O Limiter Final, Dithering e Exportação Comercial",
            duration: "28:00",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
            isFree: false,
            description: "Como alcançar -8 a -7 LUFS com clareza, dither e exportação de WAV 24-bit e MP3 320kbps.",
            materials: [{ name: "Export_Presets_Master.zip", size: "1.5 MB", url: "#" }]
          }
        ]
      }
    ]
  }
];

export const INITIAL_PLUGINS = [
  {
    id: "plg-1",
    name: "Vital Synth (Spectral Warping Wavetable)",
    category: "Synth",
    operatingSystem: "Windows / macOS",
    type: "Gratuito",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=400&auto=format&fit=crop",
    description: "Sintetizador wavetable visual de alta qualidade com modulação avançada, ideal para criar graves pesados, plucks, leads e sound design moderno.",
    downloadUrl: "https://vital.audio",
    installGuide: "1. Baixe o instalador oficial no site da Vital. 2. Execute o instalador e escolha VST3/AU. 3. Abra sua DAW e faça o rescan de plugins."
  },
  {
    id: "plg-2",
    name: "TDR Nova (Dynamic Equalizer)",
    category: "EQ",
    operatingSystem: "Windows / macOS",
    type: "Gratuito",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=400&auto=format&fit=crop",
    description: "Equalizador dinâmico paralelo de alta precisão. Perfeito para limpeza cirúrgica de frequências ressonantes em vocais e no master.",
    downloadUrl: "https://www.tokyodawn.net/tdr-nova/",
    installGuide: "1. Baixe a versão Free no site oficial da Tokyo Dawn Records. 2. Instale no diretório padrão de VST3. 3. Pronto para usar na DAW."
  },
  {
    id: "plg-3",
    name: "Valhalla Supermassive (Space & Echo)",
    category: "Reverb",
    operatingSystem: "Windows / macOS",
    type: "Gratuito",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=400&auto=format&fit=crop",
    description: "Reverb e delay exuberantes com algoritmos espaciais profundos. Essencial para criar atmosferas cinematográficas e caudas sonoras mágicas.",
    downloadUrl: "https://valhalladsp.com/shop/reverb/valhalla-supermassive/",
    installGuide: "1. Faça download do instalador gratuito no site da Valhalla DSP. 2. Instale as versões VST3 e AU. 3. Não necessita de ativação."
  },
  {
    id: "plg-4",
    name: "Jayon Signature Afrobeat & Trap Drumkit 2026",
    category: "Drumkits",
    operatingSystem: "Windows / macOS / Linux",
    type: "Exclusivo Escola",
    image: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?q=80&w=400&auto=format&fit=crop",
    description: "Kit exclusivo com mais de 350 samples afinados em WAV 24-bit: 808s furiosos, Kicks socados, Snares cristalinos, Percussões orgânicas e FXs.",
    downloadUrl: "#download-kit-jayon",
    installGuide: "1. Extraia o arquivo ZIP para a sua pasta de samples favorita. 2. No FL Studio ou Ableton, adicione a pasta ao Browser lateral."
  },
  {
    id: "plg-5",
    name: "Youlean Loudness Meter 2",
    category: "Mastering",
    operatingSystem: "Windows / macOS",
    type: "Gratuito",
    image: "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?q=80&w=400&auto=format&fit=crop",
    description: "O medidor de LUFS e True Peak padrão da indústria para garantir que a sua música não sofra compressão ou atenuação no Spotify e YouTube.",
    downloadUrl: "https://youlean.co/youlean-loudness-meter/",
    installGuide: "1. Baixe o instalador no Youlean.co. 2. Coloque o plugin no último slot do barramento Master da sua DAW."
  },
  {
    id: "plg-6",
    name: "Klanghelm MJUC jr. (Variable-Tube Compressor)",
    category: "Compressor",
    operatingSystem: "Windows / macOS",
    type: "Gratuito",
    image: "https://images.unsplash.com/photo-1520523839898-50712825e3a7?q=80&w=400&auto=format&fit=crop",
    description: "Emulador de compressor a válvulas analógicas com calor sonoro suave e controle de densidade para baterias e vocais.",
    downloadUrl: "https://klanghelm.com/contents/products/MJUCjr.html",
    installGuide: "1. Faça o download gratuito sem registo no site da Klanghelm. 2. Extraia a DLL/VST3 para a sua pasta de plugins."
  }
];

export const INITIAL_LIVE_CLASSES = [
  {
    id: "live-1",
    title: "Masterclass ao Vivo: Análise de Beats dos Alunos & Feedback em Tempo Real",
    date: "2026-08-25",
    time: "19:00 (Horário de Maputo / GMT+2)",
    instructor: "Silva Jermane Hlatswayo",
    instructorAvatar: "/jayon-tivane.jpg",
    meetingUrl: "https://meet.google.com/epm-live-session",
    platform: "Google Meet",
    status: "Agendada",
    description: "Traga o seu projeto ou beat em formato WAV/MP3 para ser analisado ao vivo na DAW. Dicas de mixagem, arranjo e melhorias imediatas."
  },
  {
    id: "live-2",
    title: "Workshop Especial: Segredos da Masterização Comercial para Streaming",
    date: "2026-09-02",
    time: "20:00 (Horário de Maputo / GMT+2)",
    instructor: "Silva Jermane Hlatswayo",
    instructorAvatar: "/jayon-tivane.jpg",
    meetingUrl: "https://zoom.us/j/98765432100",
    platform: "Zoom",
    status: "Agendada",
    description: "Demonstração passo a passo de como atingir volume comercial sem distorção e como configurar a cadeia de plugins de master."
  }
];

export const INITIAL_USERS = [
  {
    id: "usr-admin",
    name: "Silva Jermane Hlatswayo",
    email: "silvativane.3@gmail.com",
    password: "admin2026",
    phone: "+258 879 817 847",
    role: "admin",
    enrollmentStatus: "approved",
    avatar: "/jayon-tivane.jpg",
    createdAt: "2026-01-10T10:00:00Z"

  },
  {
    id: "usr-student-afonso",
    name: "Afonso Domingos",
    email: "afonsodomingos.prod@gmail.com",
    password: "aluno2026",
    phone: "+258 842 737 924",
    role: "student",
    enrollmentStatus: "approved",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    enrolledAt: "2026-02-14T14:30:00Z",
    completedLessons: ["les-bm-1", "les-bm-2", "les-mix-1"],
    createdAt: "2026-02-14T14:00:00Z"
  },
  {
    id: "usr-student-pending",
    name: "Carlos Tembe",
    email: "carlos@exemplo.com",
    password: "aluno2026",
    phone: "+258 823 456 789",
    role: "student",
    enrollmentStatus: "pending",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    completedLessons: ["les-bm-1"],
    createdAt: "2026-08-15T09:12:00Z"
  }
];


export const INITIAL_PAYMENTS = [
  {
    id: "pay-101",
    userId: "usr-student-afonso",
    userName: "Afonso Domingos",
    userEmail: "afonsodomingos.prod@gmail.com",
    userPhone: "+258 842 737 924",
    amount: 1500,
    currency: "MT",
    method: "M-Pesa",
    transactionCode: "MP2608149812A",
    paymentDate: "2026-02-14",
    proofUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=600&auto=format&fit=crop",
    status: "Aprovada",
    notes: "Inscrição confirmada via M-Pesa 842 737 924. Acesso liberado aos 3 cursos.",
    createdAt: "2026-02-14T14:15:00Z"
  }
];

export const INITIAL_CERTIFICATES = [
  {
    id: "cert-2026-001",
    certificateNumber: "EPM-2026-BM-7841",
    verificationCode: "EPM-7841-VERIF",
    userId: "usr-student-afonso",
    userName: "Afonso Domingos",
    courseId: "curso-beat-maker",
    courseTitle: "Curso de Beat Maker Profissional",
    issueDate: "2026-08-10",
    workload: "6 Horas",
    director: "Silva Jermane Hlatswayo",
    status: "Válido"
  }
];


export const INITIAL_MASTER_REQUESTS = [
  {
    id: "mst-req-1",
    userId: "usr-student-paid",
    clientName: "João Mabunda",
    clientEmail: "joao@exemplo.com",
    whatsapp: "+258 845 123 456",
    songName: "Vibes de Maputo (Feat. Dama do Bling)",
    artistName: "Jay Mab",
    serviceType: "Masterização para Streaming",
    fileUrl: "https://www.dropbox.com/s/sample_track_jaymab.wav",
    notes: "Quero que a música soe com bastante presença nos vocais e graves limpos para tocar nas rádios e Spotify.",
    status: "Em Análise",
    createdAt: "2026-08-16T11:30:00Z"
  }
];

export const INITIAL_BEATS = [
  {
    id: "beat-1",
    title: "Maputo Sunset",
    genre: "Afrobeat",
    bpm: 104,
    key: "F Minor",
    producer: "Silva Jermane (Jayon)",
    cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=400&auto=format&fit=crop",
    audioPreviewUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    priceStandard: 1000,
    priceExclusive: 3000,
    tags: ["Rema Style", "Guitar", "Smooth", "Hits 2026"],
    isFeatured: true
  },
  {
    id: "beat-2",
    title: "Costa do Sol Groove",
    genre: "Amapiano",
    bpm: 113,
    key: "G# Minor",
    producer: "Silva Jermane (Jayon)",
    cover: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=400&auto=format&fit=crop",
    audioPreviewUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    priceStandard: 1200,
    priceExclusive: 3500,
    tags: ["Log Drum", "Kabza Vibe", "Club Banger"],
    isFeatured: true
  },
  {
    id: "beat-3",
    title: "Matola Night Drill",
    genre: "Trap / Drill",
    bpm: 142,
    key: "C# Minor",
    producer: "Silva Jermane (Jayon)",
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=400&auto=format&fit=crop",
    audioPreviewUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    priceStandard: 1000,
    priceExclusive: 2500,
    tags: ["Dark 808", "Hard", "Sliding Bass"],
    isFeatured: false
  },
  {
    id: "beat-4",
    title: "Doce Melodia",
    genre: "Kizomba / Zouk",
    bpm: 98,
    key: "D Minor",
    producer: "Silva Jermane (Jayon)",
    cover: "https://images.unsplash.com/photo-1520523839898-50712825e3a7?q=80&w=400&auto=format&fit=crop",
    audioPreviewUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
    priceStandard: 1000,
    priceExclusive: 2800,
    tags: ["Romantic", "Acoustic Piano", "Love Song"],
    isFeatured: false
  },
  {
    id: "beat-5",
    title: "Raízes de Moçambique",
    genre: "Marrabenta Fusion",
    bpm: 124,
    key: "A Minor",
    producer: "Silva Jermane (Jayon)",
    cover: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?q=80&w=400&auto=format&fit=crop",
    audioPreviewUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    priceStandard: 1500,
    priceExclusive: 4000,
    tags: ["Traditional", "Modern Brass", "Festival"],
    isFeatured: true
  },
  {
    id: "beat-6",
    title: "Deep Soul RnB",
    genre: "R&B / Soul",
    bpm: 90,
    key: "Bb Major",
    producer: "Silva Jermane (Jayon)",
    cover: "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?q=80&w=400&auto=format&fit=crop",
    audioPreviewUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    priceStandard: 1000,
    priceExclusive: 2500,
    tags: ["Rhodes", "Vocal Chops", "Chill"],
    isFeatured: false
  }
];

export const INITIAL_MENTOR_PROFILE = {
  name: "Jayon Tivane",
  realName: "Silva Jermane Hlatswayo",
  title: "Produtor Musical, Beat Maker e Cantor",
  affiliation: "Membro da Euro Boys Mz",
  location: "Euro Boys Mz • Maputo",
  photo: "/jayon-tivane.jpg",
  badge1: "🇲🇿 Membro da Euro Boys Mz",
  badge2: "Afrobeat & Amapiano",
  badge3: "Mix & Master Pro",
  bioParagraph1: "Com uma trajectória sólida na música moçambicana como Produtor Musical, Beat Maker e Cantor, e como membro do conceituado grupo Euro Boys Mz, Jayon Tivane dedica-se a transmitir todo o seu conhecimento prático de estúdio.",
  bioParagraph2: "Nesta escola, o foco não é apenas teoria — vais aprender a produzir batidas que tocam nas rádios, dominar a afinação e mixagem de voz, além de preparar masters competitivos para o Spotify e plataformas mundiais.",
  experienceYears: "+8 Anos",
  totalCoursesCount: "3 Cursos",
  practiceRatio: "100%",
  whatsappNumber: "+258 879 817 847",
  whatsappMessage: "Olá Jayon Tivane, gostaria de tirar uma dúvida sobre os cursos da Escola de Produção Musical."
};



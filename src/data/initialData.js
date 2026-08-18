export const INITIAL_COURSES = [
  {
    id: "curso-beat-maker",
    title: "Curso de Beat Maker Profissional",
    shortDescription: "Aprenda a criar beats profissionais desde o zero, desenvolvendo ritmo, harmonia, arranjos e identidade sonora única.",
    description: "Domine a arte da criação de beats do zero ao nível comercial. Você aprenderá teoria musical aplicada a beat making, seleção e tratamento de drumkits, técnicas de sampling avançadas, estruturas de arranjos que prendem a atenção e exportação profissional com stems limpos para artistas e gravadoras.",
    thumbnail: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800&auto=format&fit=crop",
    banner: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop",
    instructor: "Silva Jermane (Jayon Tivane)",
    instructorRole: "Produtor Musical & Sound Engineer",
    instructorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    level: "Iniciante ao Avançado",
    duration: "18 Horas • 24 Aulas",
    rating: 4.9,
    studentsCount: 342,
    price: 1500,
    currency: "MT",
    isFeatured: true,
    modules: [
      {
        id: "mod-bm-1",
        title: "Módulo 1 — Fundamentos do Beat Making & DAW",
        lessons: [
          {
            id: "les-bm-1",
            title: "Aula 1: Introdução ao Beat Making & Setup do Estúdio",
            duration: "14:20",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            isFree: true, // AULA INTRODUTÓRIA GRATUITA
            description: "Nesta aula introdutória gratuita, você entenderá os pilares essenciais da produção de beats, equipamentos recomendados para começar e como estruturar o seu ambiente de trabalho criativo.",
            materials: [
              { name: "Guia_Setup_Beatmaker_PDF.pdf", size: "2.4 MB", url: "#" },
              { name: "Starter_Drumkit_Jayon.zip", size: "45.8 MB", url: "#" }
            ]
          },
          {
            id: "les-bm-2",
            title: "Aula 2: Drumkits Essenciais & Seleção de Timbres",
            duration: "21:45",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            isFree: false,
            description: "Como escolher os kicks, snares, 808s e percussões certos que combinam no mix sem conflitos de frequência.",
            materials: [{ name: "808_Tuning_Guide.pdf", size: "1.2 MB", url: "#" }]
          },
          {
            id: "les-bm-3",
            title: "Aula 3: Bateria, Percussão & Groove (Ghost Notes e Swing)",
            duration: "26:10",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            isFree: false,
            description: "Técnicas para dar vida e balanço humano às suas baterias através de velocity, swing e micro-timing.",
            materials: [{ name: "Groove_Templates_Midi.zip", size: "5.1 MB", url: "#" }]
          }
        ]
      },
      {
        id: "mod-bm-2",
        title: "Módulo 2 — Harmonia, Melodias & Bass",
        lessons: [
          {
            id: "les-bm-4",
            title: "Aula 4: Melodias Cativantes & Progressão de Acordes (Chords)",
            duration: "28:30",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            isFree: false,
            description: "Aprenda a construir progressões harmônicas emocionais e ganchos melódicos mesmo sem tocar piano avançado.",
            materials: [{ name: "Chord_Progressions_Pack.midi", size: "1.8 MB", url: "#" }]
          },
          {
            id: "les-bm-5",
            title: "Aula 5: 808s e Basslines Impactantes (Slides e Distorção)",
            duration: "24:15",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
            isFree: false,
            description: "Como afinar o 808 no tom da música, criar slides perfeitos e usar saturação harmônica para soar bem em telemóveis.",
            materials: [{ name: "Jayon_Custom_808s.zip", size: "22.3 MB", url: "#" }]
          },
          {
            id: "les-bm-6",
            title: "Aula 6: A Arte do Sampling e Manipulação de Áudio",
            duration: "32:00",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
            isFree: false,
            description: "Chopping, pitch shift, timestretch e reversão de samples para criar beats únicos e livres de plágio.",
            materials: [{ name: "Vintage_Sample_Cuts.zip", size: "64.0 MB", url: "#" }]
          }
        ]
      },
      {
        id: "mod-bm-3",
        title: "Módulo 3 — Arranjos, Estrutura & Exportação Final",
        lessons: [
          {
            id: "les-bm-7",
            title: "Aula 7: Estrutura Musical (Intro, Verso, Hook, Bridge, Outro)",
            duration: "25:40",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
            isFree: false,
            description: "Organize o seu beat com transições fluidas, automações dinâmicas e espaço para a voz do artista.",
            materials: [{ name: "Arrangement_Checklist.pdf", size: "850 KB", url: "#" }]
          },
          {
            id: "les-bm-8",
            title: "Aula 8: Criação de um Beat Completo do Zero ao Vivo",
            duration: "45:10",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
            isFree: false,
            description: "Fluxo de trabalho prático sem cortes: da concepção da ideia até o beat pronto para envio a artistas.",
            materials: [{ name: "Project_Template_FLStudio.flp", size: "18.2 MB", url: "#" }]
          },
          {
            id: "les-bm-9",
            title: "Aula 9: Exportação de Stems e Master para Venda",
            duration: "19:50",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackSeeTheWorld.mp4",
            isFree: false,
            description: "Exportando stems individuais, normalização de ganho e preparação para gravação vocal e venda online.",
            materials: [{ name: "Export_Presets.zip", size: "3.4 MB", url: "#" }]
          }
        ]
      }
    ]
  },
  {
    id: "curso-masterizacao",
    title: "Curso de Masterização Profissional",
    shortDescription: "Aprenda técnicas profissionais de masterização para preparar músicas com volume competitivo para streaming, rádio e distribuição.",
    description: "Leve as suas faixas ao nível das grandes gravadoras internacionais. Aprenda medição de Loudness (LUFS/True Peak), controle dinâmico multibanda, equalização cirúrgica e tonal, saturação analógica simulada, expansão estéreo e exportação sem distorção nos conversores do Spotify e Apple Music.",
    thumbnail: "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?q=80&w=800&auto=format&fit=crop",
    banner: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop",
    instructor: "Silva Jermane Hlatswayo",
    instructorRole: "Engenheiro de Som & Produtor Sênior",
    instructorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    level: "Intermediário ao Avançado",
    duration: "14 Horas • 18 Aulas",
    rating: 5.0,
    studentsCount: 218,
    price: 1500,
    currency: "MT",
    isFeatured: true,
    modules: [
      {
        id: "mod-mst-1",
        title: "Módulo 1 — Fundamentos, Loudness & Cadeia de Sinal",
        lessons: [
          {
            id: "les-mst-1",
            title: "Aula 1: A Filosofia da Masterização & O que é Loudness",
            duration: "18:30",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
            isFree: false,
            description: "Diferença entre Mix e Master, compreensão real de LUFS integrados, Dynamic Range (PLR) e True Peak Ceiling.",
            materials: [{ name: "Tabela_Loudness_Streaming_2026.pdf", size: "1.4 MB", url: "#" }]
          },
          {
            id: "les-mst-2",
            title: "Aula 2: Calibração de Monitores & Tratamento Acústico",
            duration: "22:15",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
            isFree: false,
            description: "Como escutar a verdade nas suas caixas e fones de ouvido mesmo em estúdios caseiros.",
            materials: [{ name: "Test_Tones_and_Noise.wav", size: "12.0 MB", url: "#" }]
          }
        ]
      },
      {
        id: "mod-mst-2",
        title: "Módulo 2 — Ferramentas Críticas de Masterização",
        lessons: [
          {
            id: "les-mst-3",
            title: "Aula 3: Equalização Corretiva vs Tonal (Mid/Side EQ)",
            duration: "30:40",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
            isFree: false,
            description: "Limpeza de sub-graves no Side, controle de ressonâncias agressivas e brilho suave nos agudos (Air Band).",
            materials: [{ name: "FabFilter_ProQ3_MasterPresets.ffp", size: "320 KB", url: "#" }]
          },
          {
            id: "les-mst-4",
            title: "Aula 4: Compressão de Cola (Glue) e Multibanda",
            duration: "27:50",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            isFree: false,
            description: "Unificação dinâmica com compressores VCA/Opto e controle de transientes com tempos de attack e release precisos.",
            materials: [{ name: "Dynamic_Control_Worksheet.pdf", size: "900 KB", url: "#" }]
          },
          {
            id: "les-mst-5",
            title: "Aula 5: Saturação Harmônica e Stereo Imaging",
            duration: "25:10",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            isFree: false,
            description: "Adicione calor analógico com emuladores de fita e amplie o campo estéreo sem perder compatibilidade mono.",
            materials: [{ name: "Correlation_Meter_Guide.pdf", size: "1.1 MB", url: "#" }]
          }
        ]
      },
      {
        id: "mod-mst-3",
        title: "Módulo 3 — Limiting, Referências & Exportação para Streaming",
        lessons: [
          {
            id: "les-mst-6",
            title: "Aula 6: O Limiter Final e Controle de True Peak",
            duration: "34:00",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            isFree: false,
            description: "Como alcançar volumes modernos (-8 a -6 LUFS) com clareza, sem distorção audível nem bombeamento.",
            materials: [{ name: "Ozone_Limiter_Cheatsheet.pdf", size: "1.5 MB", url: "#" }]
          },
          {
            id: "les-mst-7",
            title: "Aula 7: Masterização A/B com Faixas de Referência",
            duration: "29:30",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            isFree: false,
            description: "Uso de ferramentas como Metric AB para garantir que a sua música compita de igual para igual no mercado internacional.",
            materials: [{ name: "Reference_Track_Analysis.pdf", size: "2.1 MB", url: "#" }]
          },
          {
            id: "les-mst-8",
            title: "Aula 8: Dithering, Sample Rate e Exportação Final",
            duration: "18:20",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
            isFree: false,
            description: "Exportando em 24-bit 44.1kHz / 48kHz, conversão MP3 320kbps e verificação de metadados ID3 e ISRC.",
            materials: [{ name: "Streaming_Export_Settings.pdf", size: "890 KB", url: "#" }]
          }
        ]
      }
    ]
  },
  {
    id: "curso-producao-musical",
    title: "Curso Completo de Produção Musical",
    shortDescription: "A formação definitiva de ponta a ponta: DAW, síntese, beat making, arranjos, mixagem avançada e distribuição musical.",
    description: "O curso mais completo da Escola de Produção Musical. Abrange todo o ciclo de vida de uma produção musical moderna: desde a concepção harmônica e rítmica, sound design com sintetizadores, gravação vocal, mixagem profunda com efeitos espaciais até o mastering e distribuição nas plataformas globais.",
    thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop",
    banner: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop",
    instructor: "Silva Jermane Hlatswayo",
    instructorRole: "Produtor Executivo & Mentor Musical",
    instructorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    level: "Todos os Níveis",
    duration: "32 Horas • 36 Aulas",
    rating: 5.0,
    studentsCount: 489,
    price: 1500,
    currency: "MT",
    isFeatured: true,
    modules: [
      {
        id: "mod-pm-1",
        title: "Módulo 1 — DAW, Configuração & Workflow Profissional",
        lessons: [
          {
            id: "les-pm-1",
            title: "Aula 1: Instalação, Otimização de ASIO e Configuração de Interface",
            duration: "20:10",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
            isFree: false,
            description: "Como configurar a DAW para baixa latência e máximo aproveitamento de CPU e memória RAM.",
            materials: [{ name: "DAW_Optimization_Guide.pdf", size: "3.1 MB", url: "#" }]
          },
          {
            id: "les-pm-2",
            title: "Aula 2: Organização de Sessão, Cores, Roteamento e Busses",
            duration: "25:40",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
            isFree: false,
            description: "Crie um template profissional de estúdio que acelera o seu fluxo de produção em 3x.",
            materials: [{ name: "Studio_Pro_Session_Template.zip", size: "15.4 MB", url: "#" }]
          }
        ]
      },
      {
        id: "mod-pm-2",
        title: "Módulo 2 — Síntese & Sound Design",
        lessons: [
          {
            id: "les-pm-3",
            title: "Aula 3: Fundamentos da Síntese Subtrativa & Wavetable (Serum & Vital)",
            duration: "35:15",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
            isFree: false,
            description: "Entenda osciladores, filtros, envelopes (ADSR) e LFOs para criar seus próprios timbres sem depender de presets.",
            materials: [{ name: "Vital_Synth_Soundbanks.vitalbank", size: "38.0 MB", url: "#" }]
          },
          {
            id: "les-pm-4",
            title: "Aula 4: Criação de Plucks, Leads, Pads Atmosféricos e FX",
            duration: "28:50",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackSeeTheWorld.mp4",
            isFree: false,
            description: "Construção de sons modernos para Afrobeat, Amapiano, Trap, R&B, House e Marrabenta Fusion.",
            materials: [{ name: "Jayon_Signature_Presets.zip", size: "19.5 MB", url: "#" }]
          }
        ]
      },
      {
        id: "mod-pm-3",
        title: "Módulo 3 — Mixagem Básica e Avançada",
        lessons: [
          {
            id: "les-pm-5",
            title: "Aula 5: Ganho de Estrutura (Gain Staging) e Balanço Estático",
            duration: "24:30",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
            isFree: false,
            description: "Como criar a base de uma mixagem equilibrada antes de adicionar qualquer plugin de efeito.",
            materials: [{ name: "Gain_Staging_Cheatsheet.pdf", size: "950 KB", url: "#" }]
          },
          {
            id: "les-pm-6",
            title: "Aula 6: Tratamento Vocal Completo (Afinação, De-Esser, Compressores e Reverb)",
            duration: "42:00",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
            isFree: false,
            description: "Como deixar as vozes presentes, brilhantes, afinadas com Auto-Tune/Melodyne e integradas na base musical.",
            materials: [{ name: "Vocal_Chain_Presets.zip", size: "8.7 MB", url: "#" }]
          },
          {
            id: "les-pm-7",
            title: "Aula 7: Efeitos Espaciais, Automações Dinâmicas e Sidechain",
            duration: "31:20",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
            isFree: false,
            description: "Delays rítmicos, reverbs com ducking e automações que trazem movimento e emoção à faixa.",
            materials: [{ name: "Sidechain_Routing_Guide.pdf", size: "1.2 MB", url: "#" }]
          }
        ]
      },
      {
        id: "mod-pm-4",
        title: "Módulo 4 — Masterização & Distribuição Global",
        lessons: [
          {
            id: "les-pm-8",
            title: "Aula 8: Finalização da Master e Controle de Picos",
            duration: "26:40",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            isFree: false,
            description: "Equalização tonal final, compressão do barramento master e limitação sem distorção.",
            materials: [{ name: "Mastering_Checklist.pdf", size: "780 KB", url: "#" }]
          },
          {
            id: "les-pm-9",
            title: "Aula 9: Distribuição no Spotify, Apple Music e Direitos Autorais",
            duration: "22:15",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            isFree: false,
            description: "Como usar agregadoras (DistroKid, TuneCore), cadastrar códigos ISRC e monetizar suas produções musicais.",
            materials: [{ name: "Distribuicao_Monetizacao_Guia.pdf", size: "2.3 MB", url: "#" }]
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
    instructorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
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
    instructorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
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
    phone: "+258 879 817 847",
    role: "admin",
    enrollmentStatus: "approved",
    createdAt: "2026-01-10T10:00:00Z"
  },
  {
    id: "usr-student-paid",
    name: "João Mabunda",
    email: "joao@exemplo.com",
    phone: "+258 845 123 456",
    role: "student",
    enrollmentStatus: "approved",
    enrolledAt: "2026-02-14T14:30:00Z",
    completedLessons: ["les-bm-1", "les-bm-2", "les-bm-3", "les-bm-4"],
    createdAt: "2026-02-14T14:00:00Z"
  },
  {
    id: "usr-student-pending",
    name: "Carlos Tembe",
    email: "carlos@exemplo.com",
    phone: "+258 823 456 789",
    role: "student",
    enrollmentStatus: "pending",
    completedLessons: ["les-bm-1"],
    createdAt: "2026-08-15T09:12:00Z"
  }
];

export const INITIAL_PAYMENTS = [
  {
    id: "pay-101",
    userId: "usr-student-paid",
    userName: "João Mabunda",
    userEmail: "joao@exemplo.com",
    userPhone: "+258 845 123 456",
    amount: 1500,
    currency: "MT",
    method: "M-Pesa",
    transactionCode: "MP2608149812A",
    paymentDate: "2026-02-14",
    proofUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=600&auto=format&fit=crop",
    status: "Aprovada",
    notes: "Pagamento confirmado via M-Pesa 842 737 924. Acesso total liberado.",
    createdAt: "2026-02-14T14:15:00Z"
  },
  {
    id: "pay-102",
    userId: "usr-student-pending",
    userName: "Carlos Tembe",
    userEmail: "carlos@exemplo.com",
    userPhone: "+258 823 456 789",
    amount: 1500,
    currency: "MT",
    method: "e-Mola",
    transactionCode: "EM2608154432T",
    paymentDate: "2026-08-15",
    proofUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=600&auto=format&fit=crop",
    status: "Pendente",
    notes: "Comprovativo enviado via e-Mola 879 817 847. Aguardando validação do administrador.",
    createdAt: "2026-08-15T09:20:00Z"
  }
];

export const INITIAL_CERTIFICATES = [
  {
    id: "cert-2026-001",
    certificateNumber: "EPM-2026-BM-7841",
    verificationCode: "EPM-7841-VERIF",
    userId: "usr-student-paid",
    userName: "João Mabunda",
    courseId: "curso-beat-maker",
    courseTitle: "Curso de Beat Maker Profissional",
    issueDate: "2026-08-10",
    workload: "18 Horas",
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


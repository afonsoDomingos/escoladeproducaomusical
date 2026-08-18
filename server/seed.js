/**
 * SEED SCRIPT — Escola de Produção Musical
 * Popula o MongoDB com os dados iniciais reais da plataforma.
 * Execute: node seed.js
 */
require('dotenv').config();
const mongoose = require('mongoose');

const Beat        = require('./models/Beat');
const Course      = require('./models/Course');
const User        = require('./models/User');
const Plugin      = require('./models/Plugin');
const LiveClass   = require('./models/LiveClass');

// ─── INITIAL DATA ─────────────────────────────────────────────────────────────

const BEATS = [
  { title: 'Maputo Sunset',        genre: 'Afrobeat',          bpm: 104, key: 'F Minor',   priceStandard: 1000, priceExclusive: 3000, isFeatured: true,  cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=400', tags: ['Guitar','Smooth','Rema Style','Hits 2026'] },
  { title: 'Costa do Sol Groove',  genre: 'Amapiano',          bpm: 113, key: 'G# Minor',  priceStandard: 1200, priceExclusive: 3500, isFeatured: true,  cover: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=400', tags: ['Log Drum','Kabza Vibe','Club Banger'] },
  { title: 'Matola Night Drill',   genre: 'Trap / Drill',      bpm: 142, key: 'C# Minor',  priceStandard: 1000, priceExclusive: 2500, isFeatured: false, cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=400', tags: ['Dark 808','Hard','Sliding Bass'] },
  { title: 'Doce Melodia',         genre: 'Kizomba / Zouk',    bpm: 98,  key: 'D Minor',   priceStandard: 1000, priceExclusive: 2800, isFeatured: false, cover: 'https://images.unsplash.com/photo-1520523839898-50712825e3a7?q=80&w=400', tags: ['Romantic','Acoustic Piano','Love Song'] },
  { title: 'Raízes de Moçambique', genre: 'Marrabenta Fusion',  bpm: 124, key: 'A Minor',   priceStandard: 1500, priceExclusive: 4000, isFeatured: true,  cover: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?q=80&w=400', tags: ['Traditional','Modern Brass','Festival'] },
  { title: 'Deep Soul RnB',        genre: 'R&B / Soul',         bpm: 90,  key: 'Bb Major',  priceStandard: 1000, priceExclusive: 2500, isFeatured: false, cover: 'https://images.unsplash.com/photo-1598653222000-6b7b7a552625?q=80&w=400', tags: ['Rhodes','Vocal Chops','Chill'] },
];

const COURSES = [
  {
    title: 'Curso de Beat Maker Profissional',
    shortDescription: 'Aprenda a criar beats profissionais de Afrobeat, Amapiano, Trap e Kizomba do zero ao nível comercial.',
    description: 'Domine a arte da criação de beats do zero ao nível comercial com o mentor Silva Jermane.',
    thumbnail: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800',
    instructor: 'Silva Jermane (Jayon Tivane)',
    instructorRole: 'Produtor Musical & Sound Engineer',
    instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200',
    level: 'Iniciante ao Avançado',
    duration: '6 Horas • 3 Aulas',
    price: 1500,
    modules: [
      {
        id: 'mod-bm-1',
        title: 'Módulo Principal — Criação de Beats & Bateria',
        lessons: [
          { id: 'les-bm-1', title: 'Aula 1: Introdução ao Beat Making & Setup do Estúdio', duration: '25:00', isFree: true, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', description: 'Pilares essenciais da produção de beats, escolha de plugins e configuração da DAW.' },
          { id: 'les-bm-2', title: 'Aula 2: Bateria, Percussão & Groove Afrobeat / Amapiano', duration: '35:00', isFree: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', description: 'Programação de kicks potentes, claps, shakers e log drums com swing e dinâmica.' },
          { id: 'les-bm-3', title: 'Aula 3: Harmonia, Melodias, 808s e Arranjo Final', duration: '40:00', isFree: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', description: 'Criação de progressões de acordes, afinação e slides de 808 e estruturação para venda.' }
        ]
      }
    ]
  },
  {
    title: 'Curso de Mixagem de Áudio & Voz',
    shortDescription: 'Domine as técnicas de equalização, compressão, saturação e espacialidade para vozes e instrumentais.',
    description: 'Aprenda a fazer mixagens limpas, com clareza e impacto que soam equilibradas em qualquer sistema de som.',
    thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800',
    instructor: 'Silva Jermane Hlatswayo',
    instructorRole: 'Engenheiro de Som & Produtor Sênior',
    instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200',
    level: 'Intermediário ao Avançado',
    duration: '5 Horas • 3 Aulas',
    price: 1500,
    modules: [
      {
        id: 'mod-mix-1',
        title: 'Módulo Principal — Mixagem Comercial de Voz e Beat',
        lessons: [
          { id: 'les-mix-1', title: 'Aula 1: Fundamentos de Mixagem, Ganho & Equilíbrio', duration: '20:00', isFree: true, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', description: 'Gain staging, organização de canais no mixer e equilíbrio de volumes estáticos.' },
          { id: 'les-mix-2', title: 'Aula 2: Equalização (EQ) e Compressão Vocal e de Bateria', duration: '38:00', isFree: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', description: 'Corte de frequências indesejadas, controle dinâmico com compressores e de-esser.' },
          { id: 'les-mix-3', title: 'Aula 3: Efeitos Espaciais (Reverb, Delay, Stereo Imaging)', duration: '30:00', isFree: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4', description: 'Criação de profundidade, ambiente 3D e largura estéreo sem perda de compatibilidade mono.' }
        ]
      }
    ]
  },
  {
    title: 'Curso de Masterização Profissional',
    shortDescription: 'Aprenda técnicas de masterização para preparar músicas com volume competitivo para streaming e rádios.',
    description: 'Leve as suas faixas ao nível das grandes gravadoras internacionais. Loudness (LUFS), dynamic range e limiters.',
    thumbnail: 'https://images.unsplash.com/photo-1598653222000-6b7b7a552625?q=80&w=800',
    instructor: 'Silva Jermane Hlatswayo',
    instructorRole: 'Engenheiro de Som & Produtor Sênior',
    instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200',
    level: 'Intermediário ao Avançado',
    duration: '5 Horas • 3 Aulas',
    price: 1500,
    modules: [
      {
        id: 'mod-mst-1',
        title: 'Módulo Principal — Masterização para Streaming & Rádios',
        lessons: [
          { id: 'les-mst-1', title: 'Aula 1: A Filosofia da Masterização & Loudness (LUFS)', duration: '22:00', isFree: true, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4', description: 'Diferença entre Mix e Master, compreensão real de LUFS, Dynamic Range e True Peak.' },
          { id: 'les-mst-2', title: 'Aula 2: Cadeia de Sinal (EQ Mid/Side, Saturação e Clipper)', duration: '32:00', isFree: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4', description: 'Tratamento cirúrgico de frequências, cola dinâmica e ganho analógico sem distorção.' },
          { id: 'les-mst-3', title: 'Aula 3: O Limiter Final, Dithering e Exportação Comercial', duration: '28:00', isFree: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4', description: 'Como alcançar -8 a -7 LUFS com clareza, dither e exportação de WAV 24-bit e MP3 320kbps.' }
        ]
      }
    ]
  }
];


const USERS = [
  {
    name: 'Silva Jermane Hlatswayo',
    email: 'silvativane.3@gmail.com',
    phone: '+258 879 817 847',
    role: 'admin',
    enrollmentStatus: 'approved',
    enrolledCourses: [],
  }
];

const PLUGINS = [
  { name: 'Serum',           description: 'Sintetizador wavetable líder da indústria', category: 'Sintetizador',  version: '1.37b4', isFree: false, downloadUrl: 'https://xferrecords.com/products/serum',   tags: ['Wavetable','Leads','Pads'] },
  { name: 'Vital',           description: 'Sintetizador wavetable gratuito e poderoso',  category: 'Sintetizador',  version: '1.5.5',  isFree: true,  downloadUrl: 'https://vital.audio/',                     tags: ['Wavetable','Free','Synth'] },
  { name: 'OTT',             description: 'Compressor multibanda agressivo pela Xfer',   category: 'Compressor',    version: '1.0',    isFree: true,  downloadUrl: 'https://xferrecords.com/freeware',          tags: ['Compressor','Upward','Free'] },
  { name: 'iZotope Ozone',   description: 'Suite de masterização all-in-one premium',    category: 'Masterização',  version: '11',     isFree: false, downloadUrl: 'https://www.izotope.com/ozone',             tags: ['Mastering','AI','Limiter'] },
  { name: 'Spire Studio',    description: 'Sintetizador polifônico profissional',         category: 'Sintetizador',  version: '1.5.16', isFree: false, downloadUrl: 'https://www.discoDSP.com',                  tags: ['Leads','Bass','EDM'] },
  { name: 'TDR Nova',        description: 'Equalizador paramétrico dinâmico gratuito',   category: 'EQ',            version: '2.2.5',  isFree: true,  downloadUrl: 'https://www.tokyodawn.net/tdr-nova/',       tags: ['EQ','Dynamic','Free'] },
];

const LIVE_CLASSES = [
  { title: 'Masterclass: Como Criar um Beat Afrobeat de Sucesso', instructor: 'Silva Jermane', date: '2026-08-25', time: '19:00', platform: 'Google Meet', meetingUrl: 'https://meet.google.com/epm-live-01', status: 'Agendada', description: 'Sessão ao vivo onde vamos criar um beat Afrobeat completo do zero.' },
  { title: 'Workshop: Mixagem na Prática com Plugins Gratuitos',  instructor: 'Silva Jermane', date: '2026-09-05', time: '20:00', platform: 'Zoom',        meetingUrl: 'https://zoom.us/j/epm001',           status: 'Agendada', description: 'Aprende a mixar usando apenas plugins gratuitos de alta qualidade.' },
];

// ─── SEED FUNCTION ────────────────────────────────────────────────────────────

async function seed() {
  try {
    console.log('\n🔌 Conectando ao MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado com sucesso!\n');

    // Clear existing
    await Beat.deleteMany({});
    await Course.deleteMany({});
    await User.deleteMany({});
    await Plugin.deleteMany({});
    await LiveClass.deleteMany({});
    console.log('🗑️  Colecções limpas.\n');

    // Insert data
    const beats = await Beat.insertMany(BEATS);
    console.log(`🎵  ${beats.length} Beats inseridos`);

    const courses = await Course.insertMany(COURSES);
    console.log(`📚  ${courses.length} Cursos inseridos`);

    const users = await User.insertMany(USERS);
    console.log(`👤  ${users.length} Utilizadores inseridos`);

    const plugins = await Plugin.insertMany(PLUGINS);
    console.log(`🔌  ${plugins.length} Plugins inseridos`);

    const liveClasses = await LiveClass.insertMany(LIVE_CLASSES);
    console.log(`🎥  ${liveClasses.length} Aulas ao Vivo inseridas`);

    console.log('\n✅ Base de dados populada com sucesso!');
    console.log('   MongoDB: escoladeproducaomusicaldb\n');
    process.exit(0);
  } catch (err) {
    console.error('\n❌ Erro no seed:', err.message);
    process.exit(1);
  }
}

seed();

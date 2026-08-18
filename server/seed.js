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
    title: 'Beat Making do Zero ao Avançado',
    shortDescription: 'Aprenda a criar beats profissionais de Afrobeat, Trap, Amapiano e muito mais',
    description: 'Curso completo de produção musical focado em beat making moderno para o mercado africano e internacional.',
    thumbnail: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800',
    instructor: 'Silva Jermane Hlatswayo',
    instructorRole: 'Produtor Musical & Sound Engineer',
    instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200',
    level: 'Iniciante ao Avançado',
    duration: '20 Horas • 24 Aulas',
    price: 1500,
    modules: [
      { id: 'mod-1', title: 'Introdução à Produção Musical', lessons: [
        { id: 'les-1', title: 'Bem-vindo ao Curso', duration: '15 min', isFree: true, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', description: 'Visão geral do que vai aprender neste curso.' },
        { id: 'les-2', title: 'Instalação do FL Studio', duration: '20 min', isFree: true, videoUrl: '', description: 'Como instalar e configurar o FL Studio 21.' },
        { id: 'les-3', title: 'Interface e Navegação', duration: '25 min', isFree: false, videoUrl: '', description: 'Conhece todos os painéis e ferramentas do FL Studio.' },
      ]},
      { id: 'mod-2', title: 'Criação de Batidas (Drums)', lessons: [
        { id: 'les-4', title: 'Programação de Kick e Snare', duration: '30 min', isFree: false, videoUrl: '', description: 'Aprende a programar o padrão rítmico base.' },
        { id: 'les-5', title: 'Hi-Hats e Percussões', duration: '25 min', isFree: false, videoUrl: '', description: 'Variações e fills de percussão.' },
        { id: 'les-6', title: 'Groove e Swing Afrobeat', duration: '35 min', isFree: false, videoUrl: '', description: 'Como dar o groove característico do Afrobeat.' },
      ]},
      { id: 'mod-3', title: 'Melodias e Instrumentação', lessons: [
        { id: 'les-7', title: 'Piano Roll — Criar Melodias', duration: '40 min', isFree: false, videoUrl: '', description: 'Usa o piano roll para criar linhas melódicas.' },
        { id: 'les-8', title: 'Escolha de Sons e VSTs', duration: '30 min', isFree: false, videoUrl: '', description: 'Os melhores VSTs para produção africana.' },
      ]},
    ]
  },
  {
    title: 'Mixagem e Masterização Profissional',
    shortDescription: 'Domine as técnicas de mixagem e masterização para rádio, streaming e lançamentos físicos',
    description: 'Aprende os segredos para fazer as tuas músicas soarem como produções internacionais.',
    thumbnail: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?q=80&w=800',
    instructor: 'Silva Jermane Hlatswayo',
    instructorRole: 'Produtor Musical & Sound Engineer',
    instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200',
    level: 'Intermédio ao Avançado',
    duration: '16 Horas • 20 Aulas',
    price: 1500,
    modules: [
      { id: 'mod-a', title: 'Fundamentos de Mixagem', lessons: [
        { id: 'les-a1', title: 'O que é mixagem?', duration: '20 min', isFree: true, videoUrl: '', description: 'Introdução ao processo de mixagem.' },
        { id: 'les-a2', title: 'EQ e Filtros', duration: '40 min', isFree: false, videoUrl: '', description: 'Como usar o equalizador para separar os elementos da mix.' },
        { id: 'les-a3', title: 'Compressão e Dinâmica', duration: '35 min', isFree: false, videoUrl: '', description: 'Compressores e limitadores para controlar o volume.' },
      ]},
      { id: 'mod-b', title: 'Masterização para Streaming', lessons: [
        { id: 'les-b1', title: 'LUFS e Loudness', duration: '25 min', isFree: false, videoUrl: '', description: 'Padrões de volume do Spotify, Apple Music e YouTube.' },
        { id: 'les-b2', title: 'Limiter e Clipper', duration: '30 min', isFree: false, videoUrl: '', description: 'Como maximizar o volume sem distorção.' },
      ]},
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

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// ─── MIDDLEWARE ───────────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// ─── HEALTH CHECK ─────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    service: 'Escola de Produção Musical — API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', uptime: process.uptime() });
});

// ─── CONTACT / WHATSAPP REDIRECT ─────────────────────────────────────────────
app.get('/api/contact', (req, res) => {
  res.json({
    whatsapp: '+258879817847',
    emola: '879 817 847',
    mpesa: '842 737 924',
    email: 'silvativane.3@gmail.com',
    mentor: 'Silva Jermane Hlatswayo (Jayon Tivane)',
    preco_curso: '1500 MT',
    beat_lease_min: '1000 MT'
  });
});

// ─── BEATS CATALOG (static seed, expandable with DB later) ───────────────────
app.get('/api/beats', (req, res) => {
  const beats = [
    { id: 'beat-1', title: 'Maputo Sunset', genre: 'Afrobeat', bpm: 104, key: 'F Minor', priceStandard: 1000, priceExclusive: 3000, isFeatured: true },
    { id: 'beat-2', title: 'Costa do Sol Groove', genre: 'Amapiano', bpm: 113, key: 'G# Minor', priceStandard: 1200, priceExclusive: 3500, isFeatured: true },
    { id: 'beat-3', title: 'Matola Night Drill', genre: 'Trap / Drill', bpm: 142, key: 'C# Minor', priceStandard: 1000, priceExclusive: 2500, isFeatured: false },
    { id: 'beat-4', title: 'Doce Melodia', genre: 'Kizomba / Zouk', bpm: 98, key: 'D Minor', priceStandard: 1000, priceExclusive: 2800, isFeatured: false },
    { id: 'beat-5', title: 'Raízes de Moçambique', genre: 'Marrabenta Fusion', bpm: 124, key: 'A Minor', priceStandard: 1500, priceExclusive: 4000, isFeatured: true },
    { id: 'beat-6', title: 'Deep Soul RnB', genre: 'R&B / Soul', bpm: 90, key: 'Bb Major', priceStandard: 1000, priceExclusive: 2500, isFeatured: false }
  ];
  res.json({ success: true, data: beats, total: beats.length });
});

// ─── COURSE INQUIRY ──────────────────────────────────────────────────────────
app.post('/api/inquiry', (req, res) => {
  const { name, email, phone, type } = req.body;
  if (!name || !email) {
    return res.status(400).json({ success: false, error: 'Nome e email são obrigatórios.' });
  }
  // In a real deployment, integrate SendGrid / Nodemailer here
  console.log(`[INQUIRY] ${type || 'geral'} - ${name} <${email}> | Tel: ${phone}`);
  res.json({
    success: true,
    message: `Obrigado ${name}! Receberá um contacto de Silva Jermane em breve via WhatsApp (+258 879 817 847).`
  });
});

// ─── 404 ──────────────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Rota não encontrada.' });
});

// ─── START ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🎵 Escola de Produção Musical — API rodando na porta ${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/health`);
  console.log(`   Beats:  http://localhost:${PORT}/api/beats\n`);
});

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');

const app = express();
const PORT = process.env.PORT || 4000;

// ─── CONNECT TO MONGODB ───────────────────────────────────────────────────────
connectDB();

// ─── MIDDLEWARE ───────────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));

// ─── HEALTH CHECK ─────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    service: 'Escola de Produção Musical — API v2.0 (MongoDB)',
    db: 'escoladeproducaomusicaldb',
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', uptime: Math.floor(process.uptime()) + 's' });
});

app.get('/api/contact', (req, res) => {
  res.json({
    whatsapp: '+258879817847',
    emola: '879 817 847',
    mpesa: '842 737 924',
    email: 'silvativane.3@gmail.com',
    mentor: 'Silva Jermane Hlatswayo (Jayon Tivane)',
    preco_curso: '1500 MT'
  });
});

// ─── ROUTES ───────────────────────────────────────────────────────────────────
app.use('/api/beats',          require('./routes/beats'));
app.use('/api/courses',        require('./routes/courses'));
app.use('/api/users',          require('./routes/users'));
app.use('/api/payments',       require('./routes/payments'));
app.use('/api/plugins',        require('./routes/plugins'));
app.use('/api/live-classes',   require('./routes/liveClasses'));
app.use('/api/certificates',   require('./routes/certificates'));
app.use('/api/master-requests',require('./routes/masterRequests'));

// ─── 404 ──────────────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Rota não encontrada.' });
});

// ─── START ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🎵 EPM API rodando na porta ${PORT}`);
  console.log(`   Health:      http://localhost:${PORT}/health`);
  console.log(`   Beats:       http://localhost:${PORT}/api/beats`);
  console.log(`   Cursos:      http://localhost:${PORT}/api/courses`);
  console.log(`   Utilizadores:http://localhost:${PORT}/api/users\n`);
});

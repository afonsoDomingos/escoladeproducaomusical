# 🎵 Escola de Produção Musical

**Plataforma completa de ensino e venda de beats de produção musical moçambicana.**

Mentor: **Silva Jermane Hlatswayo (Jayon Tivane)**

---

## 🚀 Deploy

| Serviço | Plataforma | URL |
|---------|-----------|-----|
| Frontend (React/Vite) | Vercel | https://escoladeproducaomusical.vercel.app |
| Backend (Express.js) | Render | https://escola-de-producao-musical-api.onrender.com |

---

## 📦 Estrutura do Projecto

```
/
├── src/              → App React (Vite)
├── server/           → API Express.js (Render)
├── vercel.json       → Configuração Vercel (SPA routing)
├── render.yaml       → Configuração Render (backend)
└── dist/             → Build estático gerado pelo Vite
```

---

## 🛠️ Desenvolvimento Local

### Frontend (React/Vite)
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # gera dist/
```

### Backend (Express)
```bash
cd server
npm install
cp .env.example .env
npm run dev        # http://localhost:4000
```

---

## 🌐 Deploy — Passo a Passo

### Vercel (Frontend)
1. Vai a [vercel.com](https://vercel.com) → **New Project**
2. Importa o repo `afonsoDomingos/escoladeproducaomusical`
3. Framework: **Vite** | Root Directory: `/` (raiz)
4. Build Command: `npm run build` | Output: `dist`
5. Clica **Deploy** ✅

### Render (Backend)
1. Vai a [render.com](https://render.com) → **New Web Service**
2. Importa o mesmo repo
3. Root Directory: `server`
4. Build: `npm install` | Start: `npm start`
5. Adiciona variável de ambiente: `FRONTEND_URL=https://[teu-domínio].vercel.app`
6. Clica **Deploy** ✅

---

## 📞 Contactos Oficiais

- **WhatsApp**: +258 879 817 847  
- **e-Mola**: 879 817 847  
- **M-Pesa**: 842 737 924  
- **Email**: silvativane.3@gmail.com  

---

## 💰 Preços

| Produto | Preço |
|---------|-------|
| Acesso Total aos Cursos | 1.500 MT |
| Beat Lease (MP3/WAV) | a partir de 1.000 MT |
| Beat Exclusiva (WAV + Stems) | a partir de 2.500 MT |

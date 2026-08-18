const mongoose = require('mongoose');

let isConnected = false;

const DEFAULT_MONGODB_URI = 'mongodb+srv://karinganastudio23:VIbemongodb@cluster0.oe0akin.mongodb.net/escoladeproducaomusicaldb?retryWrites=true&w=majority';

const connectDB = async () => {
  if (isConnected) return;
  const uri = process.env.MONGODB_URI || DEFAULT_MONGODB_URI;

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 8000,
    });
    isConnected = true;
    console.log('✅ MongoDB conectado com sucesso: escoladeproducaomusicaldb');
  } catch (err) {
    console.error('⚠️ Aviso ao conectar ao MongoDB:', err.message);
  }
};

module.exports = connectDB;


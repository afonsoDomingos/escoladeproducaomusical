const mongoose = require('mongoose');

const masterRequestSchema = new mongoose.Schema({
  userId:      String,
  clientName:  { type: String, required: true },
  clientEmail: String,
  whatsapp:    String,
  songName:    String,
  artistName:  String,
  serviceType: String,
  fileUrl:     String,
  notes:       String,
  status:      { type: String, enum: ['Pendente', 'Em Análise', 'Concluído', 'Rejeitado'], default: 'Pendente' },
}, { timestamps: true });

module.exports = mongoose.model('MasterRequest', masterRequestSchema);

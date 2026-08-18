const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  userId:      { type: String, required: true },
  userName:    String,
  userEmail:   String,
  userPhone:   String,
  courseId:    String,
  courseTitle: String,
  amount:      { type: Number, default: 1500 },
  method:      { type: String, enum: ['e-Mola', 'M-Pesa', 'Outro'] },
  reference:   String,
  proofUrl:    String,
  status:      { type: String, enum: ['Pendente', 'Aprovado', 'Rejeitado'], default: 'Pendente' },
  notes:       String,
  processedAt: Date,
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);

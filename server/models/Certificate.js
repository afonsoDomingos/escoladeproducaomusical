const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  certificateNumber: { type: String, unique: true },
  verificationCode:  { type: String, unique: true },
  userId:            String,
  userName:          { type: String, required: true },
  courseId:          String,
  courseTitle:       String,
  issueDate:         String,
  workload:          String,
  director:          { type: String, default: 'Silva Jermane Hlatswayo' },
  status:            { type: String, enum: ['Válido', 'Inválido', 'Expirado'], default: 'Válido' },
}, { timestamps: true });

module.exports = mongoose.model('Certificate', certificateSchema);

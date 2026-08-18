const mongoose = require('mongoose');

const liveClassSchema = new mongoose.Schema({
  title:      { type: String, required: true },
  instructor: { type: String, default: 'Silva Jermane' },
  date:       String,
  time:       String,
  meetingUrl: String,
  platform:   { type: String, enum: ['Google Meet', 'Zoom', 'YouTube Live', 'Outro'], default: 'Google Meet' },
  status:     { type: String, enum: ['Agendada', 'Ao Vivo', 'Concluída', 'Cancelada'], default: 'Agendada' },
  description: String,
}, { timestamps: true });

module.exports = mongoose.model('LiveClass', liveClassSchema);

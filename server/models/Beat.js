const mongoose = require('mongoose');

const beatSchema = new mongoose.Schema({
  title:         { type: String, required: true, trim: true },
  genre:         { type: String, required: true },
  bpm:           { type: Number, required: true },
  key:           { type: String },
  producer:      { type: String, default: 'Silva Jermane (Jayon)' },
  cover:         { type: String },
  audioPreviewUrl: { type: String },
  priceStandard:  { type: Number, required: true, default: 1000 },
  priceExclusive: { type: Number, required: true, default: 2500 },
  tags:          [String],
  isFeatured:    { type: Boolean, default: false },
  isSold:        { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Beat', beatSchema);

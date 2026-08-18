const mongoose = require('mongoose');

const pluginSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  description: String,
  category:    String,
  version:     String,
  downloadUrl: String,
  imageUrl:    String,
  isFree:      { type: Boolean, default: true },
  tags:        [String],
}, { timestamps: true });

module.exports = mongoose.model('Plugin', pluginSchema);

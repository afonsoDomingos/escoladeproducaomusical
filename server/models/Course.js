const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  id:          String,
  title:       String,
  duration:    String,
  videoUrl:    String,
  description: String,
  isFree:      { type: Boolean, default: false },
});

const moduleSchema = new mongoose.Schema({
  id:      String,
  title:   String,
  lessons: [lessonSchema],
});

const courseSchema = new mongoose.Schema({
  title:             { type: String, required: true },
  shortDescription:  String,
  description:       String,
  thumbnail:         String,
  instructor:        { type: String, default: 'Silva Jermane Hlatswayo' },
  instructorRole:    { type: String, default: 'Produtor Musical & Sound Engineer' },
  instructorAvatar:  String,
  level:             String,
  duration:          String,
  price:             { type: Number, default: 1500 },
  modules:           [moduleSchema],
  isPublished:       { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);

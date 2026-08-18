const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name:             { type: String, required: true, trim: true },
  email:            { type: String, required: true, unique: true, lowercase: true, trim: true },
  phone:            { type: String },
  passwordHash:     { type: String },  // bcrypt hash (future auth)
  role:             { type: String, enum: ['admin', 'student', 'guest'], default: 'student' },
  enrollmentStatus: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  enrolledCourses:  [String],
  completedLessons: [String],
  joinedAt:         { type: Date, default: Date.now },
  avatar:           String,
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

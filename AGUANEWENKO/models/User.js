const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  phone: { type: String, unique: true, required: true },
  otp: { type: String },
  otpExpires: { type: Date },
  role: { type: String, default: 'user', enum: ['user', 'admin'] },
  modules: { type: [String], default: [] }
});

module.exports = mongoose.model('User', UserSchema);
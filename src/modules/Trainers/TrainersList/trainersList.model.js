// src/models/trainer.model.js
const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  fee: {
    type: Number,
    required: true
  },
  subscription: {
    type: String,
    enum: ['basic', 'premium', 'vip'],
    default: 'basic'
  },
  // dilediğin diğer alanlar:
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: String,
  specialty: String,
  bio: String,
  // vs...
}, { timestamps: true });

module.exports = mongoose.model('Trainer', trainerSchema);

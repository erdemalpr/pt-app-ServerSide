const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');

const authSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  surname:   { type: String, required: true },
  email:     { type: String, required: true, unique: true, lowercase: true },
  password:  { type: String, required: true },
  token:     { type: String, default: null },      // ← yeni alan
  createdAt: { type: Date,   default: Date.now }
}, {
  collection: 'userData'   // userData koleksiyonunu kullan
});

// Şifreyi hash’ler
authSchema.statics.hashPassword = async function(plain) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(plain, salt);
};

// Şifreyi doğrular
authSchema.statics.comparePassword = async function(plain, hashed) {
  return bcrypt.compare(plain, hashed);
};

module.exports = mongoose.model('Auth', authSchema);

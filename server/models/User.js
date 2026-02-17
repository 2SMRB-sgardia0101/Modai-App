const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String, required: true },
  plan: { type: String, enum: ['free', 'premium', 'business'], default: 'free' },
  stylePreference: { type: String, default: 'casual' },
  theme: { type: String, default: 'light' },
  language: { type: String, default: 'es' },
  favorites: [{ type: String }], // Product IDs
  outfits: [{ type: Object }], // Embedded outfit objects
  consent: { type: Boolean, default: false },
  consentDate: { type: Date },
  billing: {
    accountNumber: String,
    fiscalName: String,
    cif: String,
    fiscalAddress: String,
    legalRep: String
  }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
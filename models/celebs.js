const mongoose = require('mongoose');

const celebSchema = new mongoose.Schema({
  name: String,
  pictureUrl: String,
  dob: Date,
  height: {
    value: Number,
    unit: {type: String, enum: ['cm', 'inch'], default: 'cm'}
  },
  bio: String,
  trivia: String,
  createdAt: { type: Date, default: Date.now},
  modifiedAt: Date
});

const Celeb = mongoose.model('Celeb', celebSchema);

module.exports = Celeb;
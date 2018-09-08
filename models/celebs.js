const mongoose = require('mongoose');

const celebSchema = new mongoose.Schema({
  name: String,
  pic: String,
  dob: String,
  height: String,
  bio: String,
  trivia: String,
  createdAt: Date,
  modifiedAt: Date
});

const Celeb = mongoose.model('Celeb', celebSchema);

module.exports = Celeb;
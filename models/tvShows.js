const mongoose = require('mongoose');

const tvSchema = new mongoose.Schema({
  poster: String,
  trailer: String,
  description: String,
  director : String,
  writer: String,
  stars: String,
  storyline: String,
  keywords: String,
  genres: String,
  createdAt: Date,
  modifiedAt: Date
});

const Tv= mongoose.model('Tv', tvSchema);

module.exports = Tv;
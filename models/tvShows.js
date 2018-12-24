const mongoose = require('mongoose');

const tvSchema = new mongoose.Schema({
  title: { type : String, required: true, /**unique: true**/},
  posterUrl: String,
  trailerUrl: String,
  description: String,
  director: { type: String },
  writer: { type: String },
  stars: [{
    actor: { type: String },
    characterName: String,
  }],
  episode : [{
    season: { type: Number },
    episodeurl: { type: String },
  }],
  photourl: [{
     type: String
  }],
  storyline: String,
  keywords: [String],
  genres: [String],
  createdAt: { type: Date, default: Date.now},
  modifiedAt: { type: Date, default: Date.now},
  status: { type:String, enum: ['Upcoming', 'released', 'banned'], default: 'Upcoming'},
});

const Tv= mongoose.model('Tv', tvSchema);

module.exports = Tv;
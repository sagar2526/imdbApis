const mongoose = require('mongoose');

const tvSchema = new mongoose.Schema({
  title: { type : String, required: true, /**unique: true**/},
  posterUrl: String,
  trailerUrl: String,
  description: String,
  director: { type: mongoose.Schema.Types.ObjectId, ref: 'Celeb' },
  writer: { type: mongoose.Schema.Types.ObjectId, ref: 'Celeb' },
  stars: [{
    actor: { type: mongoose.Schema.Types.ObjectId, ref: 'Celeb' },
    characterName: String,
  }],
  episode : [{
    season: { type: mongoose.Schema.Types.ObjectId, ref: 'Episode' },
    episodeurl: { type: mongoose.Schema.Types.ObjectId, ref: 'Episode' },
  }],
  photourl: [{
     type: mongoose.Schema.Types.ObjectId, ref: 'Photo'
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
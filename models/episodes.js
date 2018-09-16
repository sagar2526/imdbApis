const mongoose = require('mongoose');

const episodeSchema = new mongoose.Schema ({
  seriesName: {type: mongoose.Schema.Types.ObjectId, ref: 'Tv'},
  title: String,
  posterUrl: String,
  season: Number,
  description: String,
  director: { type: mongoose.Schema.Types.ObjectId, ref: 'Celeb' },
  stars: [{
    actor: { type: mongoose.Schema.Types.ObjectId, ref: 'Celeb' },
    characterName: String,
  }],
  storyline: { type: mongoose.Schema.Types.ObjectId, ref: 'Tv' },
  genres: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Tv',
  }],
  createdAt: { type: Date, default: Date.now},
  modifiedAt: { type: Date, default: Date.now}
});

const Episode = mongoose.model('Episode', episodeSchema);

module.exports = Episode;
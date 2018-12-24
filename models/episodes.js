const mongoose = require('mongoose');

const episodeSchema = new mongoose.Schema({
  seriesName: {type: String},
  title: String,
  posterUrl: String,
  season: Number,
  description: String,
  director: {type: String},
  stars: [
    {
      actor: {type: String},
      characterName: String
    }
  ],
  storyline: {type: String},
  genres: [
    {
      type: String
    }
  ],
  createdAt: {type: Date, default: Date.now},
  modifiedAt: {type: Date, default: Date.now}
});

const Episode = mongoose.model('Episode', episodeSchema);

module.exports = Episode;
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {type: String, required: true /**unique: true**/},
  posterUrl: String,
  trailerUrl: String,
  description: String,
  director: {type: String},
  writer: {type: Array},
  stars: [
    {
      actor: {type: String},
      characterName: String
    }
  ],
  photourl: [
    {
      type: String
    }
  ],
  storyline: String,
  keywords: [String],
  genres: [String],
  createdAt: {type: Date, default: Date.now},
  modifiedAt: {type: Date, default: Date.now},
  status: {type: String, enum: ['pre-released', 'released', 'banned'], default: 'pre-released'}
});

movieSchema.pre('save', function(next){
  this.modifiedAt = Date.now()
  next()
})

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
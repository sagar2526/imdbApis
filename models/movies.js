const mongoose = require('mongoose');
// const actorSchema = new mongoose.Schema({
//   actor: { type: mongoose.Schema.Types.ObjectId, ref: 'Celeb' },
//   characterName: String,
// })

const movieSchema = new mongoose.Schema({
  title: { type : String, required: true, /**unique: true**/},
  posterUrl: String,
  trailerUrl: String,
  description: String,
  //director : mongoose.Schema.Types.ObjectId,
  director: { type: mongoose.Schema.Types.ObjectId, ref: 'Celeb' },
  writer: { type: mongoose.Schema.Types.ObjectId, ref: 'Celeb' },
  stars: [{
    actor: { type: mongoose.Schema.Types.ObjectId, ref: 'Celeb' },
    characterName: String,
  }],
//  stars: [actorSchema],
  storyline: String,
  keywords: [String],
  genres: [String],
  createdAt: Date,
  modifiedAt: Date,
  status: { type:String, enum: ['pre-released', 'released', 'banned'], default: 'pre-released'},
});

movieSchema.pre('save', function(next){
  this.modifiedAt = Date.now()
  next()
})

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
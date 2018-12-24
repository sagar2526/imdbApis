const mongoose = require('mongoose');

const showtimeSchema = new mongoose.Schema({
  theaterName: String,
  movie: { type: String },
  address: {
    area: String,
    city: String,
    pincode: Number,
    phone_no: Number,
  },
  rating: Number,
  time: Array,
  createdAt: { type: Date, default: Date.now},
  modifiedAt: { type: Date, default: Date.now}
});

const Showtime = mongoose.model('Showtime', showtimeSchema);

module.exports = Showtime;
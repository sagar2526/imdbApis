const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: { type : String, required: true, unique: true},
  password: String,
  passwordExpiry: String,
  createdAt: { type: Date, default: Date.now},
  modifiedAt: { type: Date, default: Date.now},
  firstName: String,
  lastName: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
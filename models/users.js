const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  passwordExpiry: String,
  createdAt: Date,
  modifiedAt: Date,
  firstName: String,
  lastName: String,
  facebook: String,
  google: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
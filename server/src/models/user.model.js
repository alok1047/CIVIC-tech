const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  // We will define this in the next PR
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
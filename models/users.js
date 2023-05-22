const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  Firstname: {
    type: String,
    required: true,
  },
  Lastname: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true
  },
  Type: {
    type: String,
    required: true
  },
}, { timestamps: true });

const users = new mongoose.model('users', userSchema);
module.exports = users;
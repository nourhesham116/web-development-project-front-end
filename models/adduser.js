const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const adduserSchema = new Schema({
  Firstname: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const addusers = new mongoose.model('addusers', adduserSchema);
module.exports = addusers;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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
  resetToken: String,
  resetTokenExpiration: Date,
}, { timestamps: true });


userSchema.pre('save', async function (next) {
  try {
    // Check if the password is modified or new
    if (!this.isModified('Password')) {
      return next();
    }

    // Generate a salt
    const salt = await bcrypt.genSalt(10);

    // Hash the password with the generated salt
    const hashedPassword = await bcrypt.hash(this.Password, salt);

    // Set the hashed password as the new password value
    this.Password = hashedPassword;

    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model('User', userSchema);
const users = new mongoose.model('users', userSchema);
module.exports = users;













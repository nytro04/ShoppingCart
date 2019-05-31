const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 100,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    minlength: 5,
    maxlength: 100,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  role: {
    type: Number,
    default: 0
  }
});

module.exports = User = mongoose.model("users", UserSchema);

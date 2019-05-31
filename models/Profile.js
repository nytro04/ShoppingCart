const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  title: {
    type: String
  },
  country: {
    type: String
  },
  location: {
    type: String
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  cart: {
    type: Array,
    default: []
  },
  history: {
    type: Array,
    default: []
  }
});

// @todo: add recent orders

module.exports = Profile = mongoose.model("profile", ProfileSchema);

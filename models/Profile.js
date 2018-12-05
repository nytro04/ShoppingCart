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
  // color: {
  //   type: String
  // },
  country: {
    type: String
  },
  // model: {
  //   type: String
  // },
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
  }
});

// @todo: add recent orders

module.exports = Profile = mongoose.model("profile", ProfileSchema);

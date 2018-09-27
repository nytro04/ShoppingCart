const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProductSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Product = mongoose.model("product", ProductSchema);

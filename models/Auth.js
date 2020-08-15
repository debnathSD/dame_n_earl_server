const mongoose = require("mongoose");
const schema = mongoose.Schema;

// Create Schema
const AuthSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Auth = mongoose.model("auth", AuthSchema);

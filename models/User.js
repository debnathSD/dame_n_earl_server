const mongoose = require("mongoose");
const schema = mongoose.Schema;

// Create Schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  addresses: [
    {
      receiverName: { type: String, default: "" },
      receiverContact: { type: Number, default: 0 },
      address: { type: String, default: "" },
      city: { type: String, default: "" },
      state: { type: String, default: "" },
      pin: { type: Number, default: 0 },
      country: { type: String },
    },
  ],

  gender: {
    type: String,
    default: " ",
  },

  contactno: {
    type: Number,
    required: true,
  },

  usertype: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

module.exports = User = mongoose.model("user", UserSchema);

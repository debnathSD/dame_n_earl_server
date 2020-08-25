const mongoose = require("mongoose");
const schema = mongoose.Schema;

// Create Schema
const UserSchema = new mongoose.Schema({
  c_id: {
    type: String,
    required: true,
  },
  c_fname: {
    type: String,
    required: true,
  },
  c_lname: {
    type: String,
    required: true,
  },
  c_email: {
    type: String,
    required: true
  },
  c_addresses: [{
      c_receiverName:       { type: String, required: true },
      c_receiverContact:    { type: String, required: true },
      c_address:            { type: String, required: true },
      c_city:               { type: String, required: true },
      c_state:              { type: String, required: true },
      c_pin:                { type: Number, required: true }
    }],
    
  c_gender: {
      type: String
  },

  c_contactno:{
    type: Number,
    required: true
  },

  c_user:{
    type: String,
    enum: ["admin", "user"],
    required: true
  }
});

module.exports = Cust = mongoose.model("user", UserSchema);

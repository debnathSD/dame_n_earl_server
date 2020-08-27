const mongoose = require("mongoose");
const Auth = require('Auth')
const schema = mongoose.Schema;

// Create Schema
const UserSchema = new mongoose.Schema({
  name: {
    type: { String: schema.Types.ObjectID, ref: 'Auth' },
    required: true,
  },
  
  email: {
    type: { String: schema.Types.ObjectID, ref: 'Auth' },
    required: true
  },
  c_addresses: [{
      c_receiverName:       { type: String },
      c_receiverContact:    { type: String },
      c_address:            { type: String },
      c_city:               { type: String },
      c_state:              { type: String },
      c_pin:                { type: Number }
    }],
    
  c_gender: {
      type: String
  },

  c_contactno:{
    type: Number,
  },

  c_user:{
    type: String,
    enum: ["admin", "user"],
  }
});

module.exports = User = mongoose.model("user", UserSchema);

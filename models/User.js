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
      receiverName:       { type: String },
      receiverContact:    { type: String },
      address:            { type: String },
      city:               { type: String },
      state:              { type: String },
      pin:                { type: Number }
    }],
    
  gender: {
      type: String
  },

  contactno:{
    type: Number,
  },

  usertype:{
    type: String,
    enum: ["admin", "user"],
    default: "user",
  }
});

module.exports = User = mongoose.model("user", UserSchema);

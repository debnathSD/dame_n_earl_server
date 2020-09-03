const mongoose = require("mongoose");
const schema = mongoose.Schema;

// Create Schema
const ProductSchema = new mongoose.Schema({
    p_name: {
      type: String,
    },

    price: {
      type: Number,
    },
  
    p_url: {
      type: String,
    },
  
    category: {
      type: String,
    },

    discount:{
        type: String
    },

    currentprice:{
        type: Number,
    },

    stock:{
        type: Number,
    },

    rating:{
        type: Number,
    },

    currency:{
        type: String
    },

    description:{
        weight:{

        },

        height: {

        },

        color: {
          
        }
    },

    review:{
        type: String
    }

  });
  
  module.exports = Product = mongoose.model("product", UserSchema);
  
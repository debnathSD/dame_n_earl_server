const mongoose = require("mongoose");
const schema = mongoose.Schema;

// Create Schema
const CartSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    p_id: {
        type: String,
    },
    quantity: {
        type: Number,
        
    }

});

module.exports = Cart = mongoose.model("cart", CartSchema);
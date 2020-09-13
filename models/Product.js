const mongoose = require("mongoose");
const schema = mongoose.Schema;

// Create Schema
const ProductSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  items: [
    {
      p_id: { type: String, required: true },
      name: { type: String, required: true },
      url: { type: String, required: true },
      price: { type: Number, required: true },
      discount: { type: Number, default: 0 },
      currentPrice: { type: Number, default: 0 },
      stock: { type: Number, required: true },
      maxQuantity: { type: Number, required: true },
      rating: { type: Number, default: 0 },
      currency: { type: String, default: "₹" },
      description: {
        weight: { type: String, default: "" },
        productDetails: { type: String, required: true },
        material: { type: String, required: true },

        care: { type: String, default: "" },

        stylenote: { type: String, default: "" },
      },
      reviews: [{ type: String }],
    },
  ],
});

module.exports = Product = mongoose.model("product", ProductSchema);

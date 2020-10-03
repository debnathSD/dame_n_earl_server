const mongoose = require("mongoose");
const schema = mongoose.Schema;

// Create Oder Schema
const OrderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
  },
  shiprocketOrderId: {
    type: Number,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  receiverEmail: {
    type: String,
  },
  receiverPhone: {
    type: Number,
    required: true,
  },
  orderDate: {
    type: String,
    required: true,
  },
  paymentStatus: {
    type: String,
    required: true,
  },
  totalAmt: {
    type: Number,
    required: true,
  },
  totalSavings: {
    type: Number,
  },
  tax: {
    type: Number,
  },
  status: {
    type: String,
  },
  products: [
    {
      p_id: { type: String, required: true },
      name: { type: String, required: true },
      url: { type: String, required: true },
      mrp: { type: String, required: true },
      sellingPrice: { type: String, required: true },
      qty: { type: String, required: true },
      productDiscount: { type: Number },
    },
  ],
  transactionId: {
    type: String,
  },
});

module.exports = Order = mongoose.model("order", OrderSchema);

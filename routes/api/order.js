const express = require("express");

const router = express.Router();

// Load User Model
const Order = require("../../models/Order");

/**
 * @route   GET /api/v1/order/getOrderDetails
 * @desc    Get Oder Details
 * @access  Public
 */

router.get("/getOrderDetails", (req, res) => {
  const _id = req.body.shiprocketOrderId;
  // Get order details
  Order.findOne({ shiprocketOrderId: _id }).then((order) => {
    if (order) {
      res.status(200).json({ orderDetails: order });
    } else {
      res.status(404).json({ orderDetails: "Order Not Found" });
    }
  });
});

/**
 * @route   POST /api/v1/order/createOrder
 * @desc    Create new Order
 * @access  Public
 */

router.get("/createOrder", (req, res) => {
  const _id = req.body.shiprocketOrderId;
  // Create Order
  Order.create(
    {
      orderId: req.body.orderId,
      shiprocketOrderId: req.body.shiprocketOrderId,
      userEmail: req.body.userEmail,
      receiverEmail: req.body.receiverEmail,
      receiverPhone: req.body.receiverPhone,
      orderDate: req.body.orderDate,
      paymentStatus: req.body.paymentStatus,
      totalAmt: req.body.totalAmt,
      totalSavings: req.body.totalSavings,
      tax: req.body.tax,
      status: req.body.status,
      products: req.body.products,
      transactionId: req.body.transactionId,
    },
    (err) => {
      if (err) {
        res.json({ db: `Something bad happened with DB operations! ${err}` });
      } else {
        res.json({ isOrderCreated: "New Order Created" });
      }
    }
  );
});
module.exports = router;

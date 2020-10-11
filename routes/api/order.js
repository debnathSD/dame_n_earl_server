const express = require("express");

const router = express.Router();

// Load User Model
const Order = require("../../models/Order");

/**
 * @route   GET /api/v1/order/getOrderDetails
 * @desc    Get Order Details
 * @access  Public
 */

router.get("/getOrderDetails", (req, res) => {
  const email = req.body.userEmail;
  // Get order details
  Order.find({ userEmail: email }).then((order) => {
    if (order) {
      console.log("Orders for the user ", order);
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

router.post("/createOrder", (req, res) => {
  //const _id = req.body.shiprocketOrderId;

  // Create Order
  console.log("Creating Order..");
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
      shippingCharges: req.body.shippingCharges,
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

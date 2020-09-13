const express = require("express");

const router = express.Router();

// Load User Model
const Cart = require("../../models/Cart");
const User = require("../../models/User");
const Product = require("../../models/Product");

/**
 * @route   PUT /api/v1/cart/addToCart
 * @desc    Get Products Detailsz
 * @access  Public
 */
router.put("/addToCart", (req, res) => {
  const _product = req.body.products;

  Cart.findOneAndUpdate(
    { email: req.body.email },
    { $push: { products: _product } },
    (err) => {
      if (err) {
        res.json({
          error: "Something bad happened while adding products to Cart Schema!",
        });
      } else {
        res.json({ isAddedToCart: "true" });
      }
    }
  );
});

/**
 * @route   Get /api/v1/cart/getCartDetails
 * @desc    Get Products Details
 * @access  Public
 */
router.get("/getCartDetails", (req, res) => {
  Cart.findOne({ email: req.body.email }).then((cart) => {
    let products = [];
    const completionStatus = new Promise((resolve, reject) => {
      cart.products.forEach((el, idx) => {
        Product.findOne({ "items.p_id": el.p_id }).then((cartItem) => {
          if (!cartItem) {
            res.status(404).json({ cartDetails: "There is no matching item!" });
            reject();
          } else {
            for (let k = 0; k < cartItem.items.length; k++) {
              if (el.p_id === cartItem.items[k].p_id) {
                products.push({
                  items: cartItem.items[k],
                  quantity: el.quantity,
                });
                break;
              }
            }
            if (idx === cart.products.length - 1) resolve(products); // Track loop completion status
          }
        });
      });
    });

    completionStatus.then((pdt) => {
      res.status(200).json({ cartDetails: pdt });
    });
  });
});

/**
 * @route   POST /api/v1/cart/removeProduct
 * @desc    Remove a product from the cart
 * @access  Public
 */
router.post("/removeProduct", (req, res) => {
  const id = req.body.id;
  Cart.updateOne(
    { email: req.body.email },
    { $pull: { products: { _id: id } } },
    (err) => {
      if (err) {
        res.json({
          error:
            "Something bad happened while removing products to Cart Schema!",
        });
      } else {
        res.json({ isProductRemoved: "true" });
      }
    }
  );
});

module.exports = router;

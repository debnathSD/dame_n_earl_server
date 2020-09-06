const express = require("express");

const router = express.Router();

// Load User Model
const User = require("../../models/Product");

/**
 * @route   GET /api/v1/auth/getProductsDetails
 * @desc    Get Products Details
 * @access  Public
 */

router.get("/getProductsDetails", (req, res) => {
    
  
  // Get all the products
  Product.find({ }).then((product) => {
    // Check for products
    if (!product) {
      return res.status(404).json({ email: "User not found!" });
    }else{
      return res.send(product);
    }
  
   });
   });
  
/**
 * @route   GET /api/v1/auth/addProduct
 * @desc    Get Products Details
 * @access  Public
 */

router.get("/addProduct", (req, res) => {
    _product: req.body.product;
    Product.create({});
     });
    

  module.exports = router;

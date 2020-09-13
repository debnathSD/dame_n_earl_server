const express = require("express");

const router = express.Router();

// Load User Model
const User = require("../../models/Product");

/**
 * @route   GET /api/v1/products/getProductsDetails/:attureType
 * @param {attireType} The Product
 * @desc    Get Products Detailsz
 * @access  Public
 */
router.get("/getProductsDetails/:attireType", (req, res) => {
  const _category = req.params.attireType;
  // Get all the products
  Product.find({ category: _category }).then((category) => {
    // Check if category exists
    if (!category) {
      return res.status(404).json({ attireDetails: "Category not found!" });
    } else {
      return res.status(200).json({ attireDetails: category });
    }
  });
});

/**
 * @route   POST /api/v1/products/addProducts
 * @desc    Get Products Details
 * @access  Public
 */

router.post("/addProducts", (req, res) => {
  const _category = req.body.category;
  const _items = req.body.items;
  Product.create({ category: _category, items: _items }, (err) => {
    if (err) {
      console.log(err);
      res.json({
        error:
          "Something bad happened while storing products in Product Schema!",
      });
    } else {
      res.json({ isProductsAdded: "true" });
    }
  });
});

module.exports = router;

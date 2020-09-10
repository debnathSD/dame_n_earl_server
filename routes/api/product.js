const express = require("express");

const router = express.Router();

// Load User Model
const User = require("../../models/Product");

/**
 * @route   GET /api/v1/products/getProductsDetails/indian_wear
 * @desc    Get Products Detailsz
 * @access  Public
 */

router.get("/getProductsDetails/Indian_Wear", (req, res) => {
    
  //const _category = req.body.category;
  // Get all the products
  Product.find({ category: "Indian_Wear" }).then((category) => {
    // Check if category exists
    if (!category) {
      return res.status(404).json({ category: "Category not found!" });
    }else{
      return res.json(category);
    }
  
   });
   });

/**
 * @route   GET /api/v1/products/getProductsDetails/Earrings
 * @desc    Get all Earings Details
 * @access  Public
 */

router.get("/getProductsDetails/Earrings", (req, res) => {
    
  //const _category = req.body.category;
  // Get all the products
  Product.find({ category: "Earrings" }).then((category) => {
    // Check if category exists
    if (!category) {
      return res.status(404).json({ category: "Category not found!" });
    }else{
      return res.json(category);
    }
  
   });
   });

   /**
 * @route   GET /api/v1/products/getProductsDetails/Nosepins
 * @desc    Get all Nosepins Details
 * @access  Public
 */

router.get("/getProductsDetails/Nosepins", (req, res) => {
    
  //const _category = req.body.category;
  // Get all the products
  Product.find({ category: "Nosepins" }).then((category) => {
    // Check if category exists
    if (!category) {
      return res.status(404).json({ category: "Category not found!" });
    }else{
      return res.json(category);
    }
  
   });
   });

   /**
 * @route   GET /api/v1/products/getProductsDetails/headAccessories
 * @desc    Get all headAccessories Details
 * @access  Public
 */

router.get("/getProductsDetails/headAccessories", (req, res) => {
    
  //const _category = req.body.category;
  // Get all the products
  Product.find({ category: "headAccessories" }).then((category) => {
    // Check if category exists
    if (!category) {
      return res.status(404).json({ category: "Category not found!" });
    }else{
      return res.json(category);
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
    Product.create({ category: _category, items: _items}, (err) => {
      if(err){
        console.log(err);
        res.json({
          error:
            "Something bad happened while storing products in Product Schema!",
        });
      }
      else{
        res.json({isProductsAdded: "true"});
      }
    });
     });
    

  module.exports = router;

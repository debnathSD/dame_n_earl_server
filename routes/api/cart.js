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
    // Check for User
    User.findOne({ email: req.body.email }).then((user) => {
        // Check if user has logged in
        console.log(user);
        if (!user) {
            return res.status(404).json({ email: "User not found! Please Register/Login" });
        } else {
            const _product = req.body.products;

            Cart.findOneAndUpdate({ email: req.body.email }, { "$push": { "products": _product } }, (err) => {
                if (err) {
                    res.json({
                        error:
                            "Something bad happened while adding products to Cart Schema!",
                    });
                }
                else {
                    res.json({ isAddedToCart: "true" });
                }
            });
        }

    });
});

/**
* @route   Get /api/v1/cart/getCartDetails
* @desc    Get Products Detailsz
* @access  Public
*/

router.get("/getCartDetails", (req, res) => {
    Cart.findOne({ email: req.body.email }).then((cart) => {
        const products_list = cart.products;
        const products = [];
        for (let i = 0; i < products_list.length; i++) {
            console.log("Products in Cart", products_list[i]);
            const _id = String(products_list[i].p_id);
            console.log("Id is ", _id);
            Product.findOne({ "items.p_id": _id }, (err, results) => {
                // console.log("Result", results);
                if (err) {
                    res.send(err);
                } else {
                    const result = results.items.filter(res => {
                        return res.p_id === _id
                    });
                    products.push(result);
                    console.log("products array", products);
                    console.log("Result pushed", result);
                }
            });
        }
        console.log("Results-->", products);
        return res.status(200).json({ product: products });
        


    });
});

router.post("/removeProduct", (req, res) => {
    // Check for User
    User.findOne({ email: req.body.email }).then((user) => {
        // Check if user has already logged in
        if (!user) {
            return res.status(404).json({ email: "User not found! Please Register/Login" });
        } else {
            const id = req.body.id;
            Cart.updateOne({ email: req.body.email }, { "$pull": { products: { "_id": id } } }, (err) => {
                if (err) {
                    console.log(err);
                    res.json({
                        error:
                            "Something bad happened while removing products to Cart Schema!",
                    });
                }
                else {
                    res.json({ isProductRemoved: "true" });
                }
            });
        }
    });
});
module.exports = router;
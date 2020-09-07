const express = require("express");

const router = express.Router();

// Load User Model
const Cart = require("../../models/Cart");
const User = require("../../models/User");

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
            Cart.findOneAndUpdate({ email: req.body.email}, { p_id: req.body.p_id, quantity: req.body.quantity }, (err) => {
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

router.get("/getCartDetails", (req,res) => {
    // Check for User
    User.findOne({email: req.body.email}).then((user) => {
        // Check if user has already logged in
        if(!user){
            return res.status(404).json({ email: "User not found! Please Register/Login" });
        }else{
            Cart.findOne({email: req.body.email}).then((cart) => {
                res.json({"email": cart.email, "p_id": cart.p_id, "quantity": cart.quantity});
            });
        }
    });
});

module.exports = router;
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
});


/**
* @route   Get /api/v1/cart/getCartDetails
* @desc    Get Products Details
* @access  Public
*/

router.get("/getCartDetails", (req, res) => {

    Cart.findOne({ email: req.body.email }).then((cart) => {
        const products_list = cart.products;
        let products = [];
        new Promise((resolve, reject) => {
            for (let i = 0; i < products_list.length; i++) {
                console.log("Products in Cart", products_list[i]);
                const _id = String(products_list[i].p_id);
                console.log("Id is ", _id);

                Product.findOne({ "items.p_id": _id }, (err, results) => {
                    // console.log("Result", results);
                    if (err) {
                        res.send(err);
                        reject();
                    } else {
                        const result = results.items.filter(res => {
                            return res.p_id === _id
                        });
                        products.push(result);
                        resolve(products);
                        console.log("products array", products);
                        console.log("Result pushed", result);
                    }
                });
            }
        }).then(products => {
            console.log("Results-->", products);
            res.status(200).json({ product: products });
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

});

module.exports = router;
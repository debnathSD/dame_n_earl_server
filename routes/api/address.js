const express = require("express");

const router = express.Router();

// Load User Model
const User = require("../../models/User");

/**
 * @route   POST /api/v1/user/addAddress
 * @desc    Adds new address to address list
 * @access  Public
 */

 router.post("/addAddress", (req,res) => {
    const _address = req.body.address; 

    User.findOneAndUpdate({ email: req.body.email }, {"$push": { "addresses": _address }} ).then((user) => {
      if (user) {
            res.status(200).json({
              isUpdated: "True"
            });
      } else {
        return res.status(400).json({
          email: "User doesn't exist",
        });
      }
    });
  });

/**
 * @route   POST /api/v1/user/delAddress
 * @desc    Adds new address to address list
 * @access  Public
 */

 router.post("/delAddress", (req,res) => {
   const id = req.body.id;
   User.updateOne({ email: req.body.email }, {"$pull": { addresses: {"_id": id} }} ).then((user) => {
    if (user) {
          res.status(200).json({
            addressDeleted: "True"
          });
    } else {
      return res.status(400).json({
        email: "User doesn't exist",
      });
    }
  });

 });

  
module.exports = router;

const express = require("express");

const router = express.Router();

// Load User Model
const User = require("../../models/User");

/**
 * @route   POST /api/v1/auth/addAddress
 * @desc    Adds new address to address list
 * @access  Public
 */

 router.post("/addAddress", (req,res) => {
    const _address = req.body.address; 

    User.findOneAndUpdate({ email: req.body.email }, {"$push": { "c_addresses": _address }} ).then((user) => {
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
  
module.exports = router;
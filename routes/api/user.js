const express = require("express");

const router = express.Router();

// Load User Model
const User = require("../../models/User");

/**
 * @route   POST /api/v1/auth/updateUser
 * @desc    Update the user details
 * @access  Public
 */

router.post("/updateUser", (req, res) => {
  const _gender = req.body.gender;
  const _contactno = req.body.contactno;
  const _addresses = req.body.addresses;

  User.findOneAndUpdate({ email: req.body.email }, {gender: _gender,
                                                    contactno: _contactno,
                                                    $set: {addresses: _addresses},
                                                    
                                                  }).then((user) => {
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
 * @route   GET /api/v1/auth/getUser
 * @desc    Get the user details
 * @access  Public
 */

 router.get("/getUserDetails", (req, res) => {
  const email = req.body.email;

// Find a User By Email
User.findOne({ email }).then((user) => {
  // Check for user
  if (!user) {
    return res.status(404).json({ email: "User not found!" });
  }else{
    return res.send(user);
  }

 });
 });

module.exports = router;

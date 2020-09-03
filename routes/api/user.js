const express = require("express");

const router = express.Router();

// Load User Model
const User = require("../../models/User");

/**
 * @route   POST /api/v1/auth/userDetails
 * @desc    Update the user details
 * @access  Public
 */

router.post("/updateUser", (req, res) => {
  const _gender = req.body.gender;
  const _contactno = req.body.contactno;
  const _address = req.body.address;

  User.findOneAndUpdate({ email: req.body.email }, {gender: _gender,
                                                    contactno: _contactno,
                                                    $push: {c_addresses: _address}}).then((user) => {
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

const express = require("express");
const keys = require("../../config/keys");

const router = express.Router();

// Load Auth and User Model
const Auth = require("../../models/Auth");
const User = require("../../models/User");

/**
 * @route   POST /api/v1/auth/userDetails
 * @desc    Update the user details
 * @access  Public
 */

router.post("/userDetails", (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      const updateUser = new {
        c_addresses: [
          {
            receiverName: req.body.receiverName,
            receiverContact: req.body.receiverContact,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            pin: req.body.pin,
          },
        ],
        gender: req.body.gender,
        contactno: req.body.contactno,
      }();

      updateUser
        .save()
        .then((user) => res.json({ user }))
        .catch((err) =>
          res.status(502).json({
            db: `Something bad happened with DB operations! ${err}`,
          })
        );
    } else {
      return res.status(400).json({ email: "Please Register/Login!!" });
    }
  });
});

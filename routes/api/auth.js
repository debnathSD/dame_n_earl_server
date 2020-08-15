const express = require("express");
const router = express.Router();

// Load Auth Model
const Auth = require("../../models/Auth");

/**
 * @route   POST /api/v1/auth/register
 * @desc    Register a User
 * @access  Public
 */
router.post("/register", (req, res) => {
  Auth.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists!" });
    } else {
      const newUser = new Auth({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar,
      });
    }
  });
});

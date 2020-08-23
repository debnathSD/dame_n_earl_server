const express = require("express");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

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
      const avatar = gravatar.url(req.body.email, {
        s: "200", //size in px
        r: "pg", // rating to restrict 18+ contents
        d: "mm", // default user icon if 404
      });
      const newUser = new Auth({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar,
      });

      // Password Encryption
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json({ user }))
            .catch((err) =>
              res.status(502).json({
                db: `Something bad happened with DB operations! ${err}`,
              })
            );
        });
      });
    }
  });
});

/**
 * @route   POST /api/v1/auth/login
 * @desc    LOGIN User and Return a JSON WEB TOKEN (JWT)
 * @access  Public
 */
router.post("/login", (req, res) => {
  const email = req.body.email,
    password = req.body.password;

  // Find a User By Email
  User.findOne({ email }).then((user) => {
    // Check for user
    if (!user) {
      return res.status(404).json({ email: "User not found!" });
    }

    // Check Password
    // Compare plain text password with
    // The hashed password stored in DB
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User Matched, Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
        };

        // Sign The Token with a Signature/ SecretKey
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 }, // Expire the JWT in an hour and Logout the User
          (err, token) => {
            res.json({
              success: true,
              token: `Bearer ${token}`, // Use Conventional Bearer Protocol to Pass the Token
            });
          }
        );
      } else {
        return res.status(400).json({ password: "Password incorrect!" });
      }
    });
  });
});

module.exports = router;

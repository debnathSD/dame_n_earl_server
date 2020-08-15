const express = require("express");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

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

module.exports = router;

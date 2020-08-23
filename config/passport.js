// Create a JWT strategy
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

const mongoose = require("mongoose");
const User = mongooseoose.model("auth");
const keys = require("./keys");

const authOptions = {};

// Populate the Options Object
authOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
authOptions.secretOrKey = keys.secretOrKey;

// Take the passport args pased from server.js
module.exports = (passport) => {
  passport.use(
    new JwtStrategy(authOptions, (jwtPayload, done) => {
      // jwtPayload points to the payload defined in auth.js
      User.findById(jwtPayload.id)
        .then((user) => {
          if (user) {
            return done(null, user); // Method Signature: done(error, data)
          }
          return done(null, false);
        })
        .catch((err) => {
          console.log(`Something bad happened: ${err}`);
        });
    })
  );
};

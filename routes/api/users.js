const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// load User model
const User = require("../../models/User");

// @route       GET api/users/test
// @desc        Test users route
// @access      Public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

// @route       POST api/users/register
// @desc        register user
// @access      Public
router.post("/register", (req, res) => {
  // check if email is already been used
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already taken" });
    } else {
      // Handling avatar with gravatar
      const avatar = gravatar.url(req.body.email, {
        s: "200", // Size
        r: "pg", // Rating
        d: "mm" // Default
      });

      // Create new user if email is not on db
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      // Hashing passwords with bcrypt
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;

          // Save with mongoose
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route       POST api/users/login
// @desc        Login user / Returning JWT Token
// @access      Public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Find user by email on db
  User.findOne({ email }).then(user => {
    // check for user
    if (!user) {
      return res.status(404).json({ email: "User not found" });
    }

    // Check and compare password of the user
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched

        // creat JWT Payload
        const payload = { id: user.id, name: user.name, avatar: user.avatar };

        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 36000 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res.status(400).json({ password: "Incorrect password" });
      }
    });
  });
});

// @route       GET api/users/current
// @desc        Returns current authenticated user
// @access      Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

module.exports = router;

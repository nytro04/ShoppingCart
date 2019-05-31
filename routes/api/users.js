const express = require("express");
const router = express.Router();
// const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// load User model
const User = require("../../models/User");

// @route       POST api/users/register
// @desc        register user
// @access      Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  const { name, email, password } = req.body;

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // check if email is already been used
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already taken";
      return res.status(400).json(errors);
    } else {
      // Create new user if email is not on db
      const newUser = new User({
        name,
        email,
        password
      });

      // Hashing passwords with bcrypt
      bcrypt.genSalt(14, (err, salt) => {
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
// @desc        Login user / Returns JWT Token
// @access      Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // const email = req.body.email;
  // const password = req.body.password;

  const { email, password } = req.body;

  // Find user by email on db
  User.findOne({ email }).then(user => {
    // check for user
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
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
          { expiresIn: 25200 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Incorrect password";
        return res.status(400).json(errors);
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
    res.json({
      id: req.user.id,
      email: req.user.email
    });
  }
);

module.exports = router;

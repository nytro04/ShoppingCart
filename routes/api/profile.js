const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Validation
const validateProfileInput = require("../../validation/profile");

// Load Profile model
const Profile = require("../../models/Profile");
// Load User model
const User = require("../../models/User");

// @route       GET api/profile
// @desc        Get Profile of current users
// @access      Private => only admin can view profile of users, will implememnt admin later
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate("user", ["email", "name"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   POST api/profile
// @desc    Create or Edit User profile
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //Desconstruct fields
    const { errors, isValid } = validateProfileInput(req.body);
    const { title, address, location, country, phone } = req.body;

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (title) profileFields.title = title;
    // if (company) profileFields.company = company;
    if (country) profileFields.country = country;
    // if (city) profileFields.city = city;
    if (location) profileFields.location = location;
    if (address) profileFields.address = address;
    if (phone) profileFields.phone = phone;

    //Find profile and update or create
    Profile.findOne({ user: req.user.id }).then(profile => {
      // if profile exist update
      if (profile) {
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // Create new profile

        // Check if phone number exists
        Profile.findOne({ phonenNumber: profileFields.phone }).then(profile => {
          if (profile) {
            errors.phonenNumber = "This phone number already exist";
            res.status(400).json(errors);
          }

          // Save Profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

// @route  DELETE api/profile
// desc    Delete user and profile
// access   Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

// @todo: all get all profiles for admins

module.exports = router;

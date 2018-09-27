const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Product Model
const Product = require("../../models/Product");
// Load Profile model
const Profile = require("../../models/Profile");

// Validation
const validateProductInput = require("../../validation/product");

// @route       GET api/products/test
// @desc        Test products route
// @access      Public
router.get("/test", (req, res) => res.json({ msg: "Products works" }));

// @route       GET api/products
// @desc        Get all products
// @access      Public
router.get("/", (req, res) => {
  Product.find()
    .sort({ date: -1 })
    .then(products => res.json(products))
    .catch(err =>
      res.status(404).json({ noproductsfound: "No products found" })
    );
});

// @route       GET api/products/:id
// @desc        Get product by id
// @access      Public
router.get("/:id", (req, res) => {
  Product.findById(req.params.id)
    .then(product => res.json(product))
    .catch(err =>
      res.status(404).json({ noproductfound: "No product with that id found" })
    );
});

// @route       POST api/products
// @desc        Create products
// @access      Private // TODO... for admins only
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Destructuring
    const { name, description, price, image } = req.body;
    const { errors, isValid } = validateProductInput(req.body);

    // Check validation
    if (!isValid) {
      // if any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    // Create new Product
    const newProduct = new Product({
      name,
      description,
      price,
      image,
      user: req.user.id
    });

    // save new product to db
    newProduct.save().then(product => res.json(product));
    // console.log(req.user.id);
  }
);

// @route       DELETE api/products/:id
// @desc        Delete products
// @access      Private // TODO... for admins only
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Only allow delete by user who created the product
    Profile.findOne({ user: req.user.id }).then(profile => {
      Product.findById(req.params.id).then(product => {
        // Check for product owner ...
        // TODO: Admin only
        // if (product.user !== req.user.id) {
        //   return res.status(401).json({ notauthorized: "User not authorized" });
        // }

        // Delete
        product
          .remove()
          .then(() => res.json({ success: true }))
          .catch(err =>
            res.status(404).json({ productnotfound: "No product found" })
          );
      });
    });
  }
);

module.exports = router;

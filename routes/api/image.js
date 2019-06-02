const express = require("express");
const router = express.Router();
// const passport = require("passport");
const fileUpload = require("express-fileupload");

// app.use();

// Validation
const validateImageUpload = require("../../validation/imageUpload");

// @route       UPLOAD IMAGE api/image/
// @desc        Upload Image
// @access      Private // TODO... for admins only
router.post("/upload", fileUpload(), (req, res) => {
  // destructuring
  const { errors, isValid } = validateImageUpload(req.files);

  if (!isValid) {
    // if any errors, send 400 with errors object
    return res.status(400).json(errors);
  }

  const file = req.files.file;

  file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});

module.exports = router;

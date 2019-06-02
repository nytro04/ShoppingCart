const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
// const fileUpload = require("express-fileupload");

// Routes
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const products = require("./routes/api/products");
const image = require("./routes/api/image");

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(fileUpload());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB through mongoose
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// Use Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/products", products);
app.use("/api/image", image);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}... 🚀`));

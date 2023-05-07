const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const database = process.env.MONGOLAB_URI;
const PORT = process.env.PORT || 4111;
const session = require("express-session");
const crypto = require("crypto");
const passport = require("passport");
const { loginCheck } = require("./auth/passport");
loginCheck(passport);

// Connect to database
mongoose
  .connect(database)
  .then(() => console.log("connection to database successful"))
  .catch((err) => console.log(err));

// Set templating engine
app.set("view engine", "ejs");

// set Middleware
// app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: crypto.randomBytes(32).toString("hex"),
    saveUninitialized: true,
    resave: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/", require("./routes/login"));

// Start server
app.listen(PORT, () => {
  console.log("Server started at port: " + PORT);
});

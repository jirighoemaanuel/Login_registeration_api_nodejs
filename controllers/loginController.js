const User = require("../models/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");
// For Register Page
const registerView = (req, res) => {
  res.render("register", {});
};

// For View
const loginView = (req, res) => {
  res.render("login", {});
};

const registerUser = (req, res) => {
  const { name, email, location, password, confirm } = req.body;
  // Confirm Passwords
  if (!name || !email || !password || !confirm) {
    console.log("Fill empty fields");
  } else {
    // Validation
    User.findOne({ email: email }).then((user) => {
      if (user) {
        console.log("Email exists");
        res.render("register", {
          name,
          email,
          password,
          confirm,
        });
      } else {
        // Validation
        const newUser = new User({
          name,
          email,
          location,
          password,
        });
        // Password Hashsing
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
              throw err;
            }
            newUser.password = hash;
            newUser
              .save()
              .then(res.redirect("./login"))
              .catch((err) => console.log(err));
          });
        });
      }
    });
  }
};

const loginUser = (req, res, next) => {
  const { email, password } = req.body;
  // Required
  if (!email || !password) {
    console.log("Please fill in all the fields");
    res.render("login", {
      email,
      password,
    });
  } else {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        console.log(info.message);
        return res.render("login", {
          email,
          password,
        });
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.redirect("/dashboard");
      });
    })(req, res, next);
  }
};

// const loginUser = (req, res) => {
//   const { email, password } = req.body;
//   // Required
//   if (!email || !password) {
//     console.log("Please fill in all the fields");
//     res.render("login", {
//       email,
//       password,
//     });
//   } else {
//     passport.authenticate("local", {
//       successRedirect: "/dashboard",
//       failureRedirect: "/login",
//       failureFlash: true,
//     })(req, res);
//   }
// };

module.exports = {
  registerView,
  loginView,
  registerUser,
  loginUser,
};

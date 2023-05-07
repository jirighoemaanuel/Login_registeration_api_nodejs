const protectRoute = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    console.log("Please log in to continue");
    res.redirect("/login");
  }
};
const allowIf = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/dashboard");
  }
};

module.exports = {
  protectRoute,
  allowIf,
};

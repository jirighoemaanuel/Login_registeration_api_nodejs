const express = require("express")
const {registerView, loginView, registerUser, loginUser} = require('../controllers/loginController')
const { dashboardView } = require('../controllers/dashboardController')
const router = express.Router()
const {protectRoute} = require("../auth/protect")

// routes verbs
router.route('/register')
.get(registerView)
.post(registerUser)
router.route('/login')
.get(loginView)
.post(loginUser)
router.get("/dashboard", protectRoute, dashboardView)

module.exports = router
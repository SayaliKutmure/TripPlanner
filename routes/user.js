
const express = require("express");
const router = express.Router();
const User = require("../model/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport"); 
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/users.js");
const { renderSignupForm } = require("../controllers/users.js");

router.get("/signup", userController.renderSignupForm);

router.post("/signup",  wrapAsync(userController.signup));

 //login route
 router.get("/login",userController.renderLoginForm);
router.post("/login",
    saveRedirectUrl, // This runs first
    passport.authenticate("local", { failureRedirect: '/login', failureFlash: true}), 
    userController.login);

router.get("/logout", userController.logout);

module.exports = router;

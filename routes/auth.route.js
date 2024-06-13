const { registerUser, loginUser } = require("../controllers/auth.controller");
const { validateSignUp, validateLogin } = require("../validators/auth.validator");
const express = require("express");
const router = express.Router();

router.post("/register", validateSignUp, registerUser);
router.post("/login", validateLogin, loginUser);

module.exports = router;

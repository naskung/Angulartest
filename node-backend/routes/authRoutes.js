const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/authControllers");
const {auth} = require("../middleware/auth");


// Register a new user
router.post("/register");

// Login an existing user
router.post("/login", login);

module.exports = router;

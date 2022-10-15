const express = require("express");
const router = express.Router();

const {
    registerUser,
    loginUser,
    getProfile,
} = require("../controllers/userController");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/profile", getProfile);

module.exports = router;
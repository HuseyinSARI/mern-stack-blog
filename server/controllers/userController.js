const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const colors = require("colors");

// @route   POST api/users/register
// @desc    Register a user
// @access  Pubic
const registerUser = async (req, res) => {
    res.send("Register a user");
}

// @route   POST api/users/login
// @desc    Login a user
// @access  Pubic
const loginUser = asycn = (req, res) => {
    res.send("Login a user");
}

// @route   GET api/users/profile
// @desc    Get user profile
// @access  Private

const getProfile = async (req, res) => {
    res.send("Get user profile");
}

module.export = {
    registerUser,
    loginUser,
    getProfile,
}
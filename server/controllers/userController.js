const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const colors = require("colors");

// @route   POST api/users/register
// @desc    Register a user
// @access  Pubic
const registerUser = async (req, res) => {
    try {
        // Take the data from request's body
        const { firstName, lastName, email, password } = req.body;

        // The array for holding the error messages
        let toasts = [];

        if (!firstName) toasts.push({ message: "First name is required", type: "error" });
        if (!lastName) toasts.push({ message: "Last name is required", type: "error" });
        if (!password) toasts.push({ message: "Valid password required", type: "error" });
        if (password && password.length < 6) toasts.push({ message: "Password must be at least 6 characters", type: "error" });
        if (!email || !validatedEmail(email)) toasts.push({ message: "Valid e-mail is required", type: "error" });

        // return error array if there is any error occurs
        if (toasts.length > 0) return res.status(400).json(toasts);

        // return error if user already exists
        let newUser = await User.findOne({ email });
        if (newUser) return res.status(400).json({ message: "User already exists", type: "error" });

        // The reason we can use it as "req.body". The user is defined in the model file and because of that, it is no way to save any other type of data in the database
        newUser = new User(req.body);

        // Hash password before saving in database
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);

        // Save user to DB
        await newUser.save();

        // payload for making jwt(json web token)
        const payload = {
            user: {
                id: newUser._id
            }
        }

        // Produce token if there isn't error.
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1d"
        }, (error, token) => {
            if (error) throw error;

            // Return JWT as a response.
            res.json(token);
        });

    } catch (error) {
        console.error(`ERROR : ${error.message}`.red);
        res.status(500).send("Server Error");
    }
}

// @route   POST api/users/login
// @desc    Login a user
// @access  Pubic
const loginUser = async (req, res) => {
    try {
        // Take the data from request's body
        const { email, password } = req.body;

        // The array for holding the error messages
        let toasts = [];

        // Check values for validate
        if (!password) toasts.push({ message: "Valid password required", type: "error" });
        if (password && password.length < 6) toasts.push({ message: "Password must be at least 6 characters", type: "error" });
        if (!email || !validatedEmail(email)) toasts.push({ message: "Valid e-mail is required", type: "error" });

        // return error array if there is any error occurs
        if (toasts.length > 0) return res.status(400).json(toasts);

        // Get user from DB
        let user = await User.findOne({ email });

        // return error if user doesn't exist
        if (!user) return res.status(400).json([{ message: "User does not exist", type: "error" }]);

        // Compare password in db to password in received
        const isMatch = await bcrypt.compare(password , user.password);

        // return error if password isn't match
        if(!isMatch) return res.status(400).json([{message:"Invalid credentials" , type: "error"}]);

        const payload = {
            user: {
                id: user._id
            }
        }

        // Produce token if there isn't error.
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1d"
        }, (error, token) => {
            if (error) throw error;

            // Return JWT as a response.
            res.json(token);
        });       

    } catch (error) {
        console.error(`ERROR : ${error.message}`.red);
        res.status(500).send("Server Error");
    }
}

// @route   GET api/users/profile
// @desc    Get user profile
// @access  Private
const getProfile = async (req, res) => {
    try {
        res.send("User Profile");
    } catch (error) {
        console.error(`ERROR : ${error.message}`.red);
        res.status(500).send("Server Error");
    }
}

const validatedEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    // validemail@mail.com returns true
    return regex.test(email);
}

module.exports = {
    registerUser,
    loginUser,
    getProfile,
}
const express = require('express');
const router = express.Router();

const {
    registerUser,
    loginUser,
    getProfile,
} = require('../controllers/userController')

console.log(typeof registerUser);
router.post('/register', registerUser)

router.post('/login', loginUser);

router.get('/profile', getProfile)


module.exports = router;

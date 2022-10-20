const express = require('express');
const auth = require("../middleware/authMiddleware");
const router = express.Router();

const {
    registerUser,
    loginUser,
    getProfile,
    updateUser
} = require('../controllers/userController')

router.post('/register', registerUser)

router.post('/login', loginUser);

router.get('/profile',[auth], getProfile)

router.put('/:id',[auth], updateUser)



module.exports = router;

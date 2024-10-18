const express = require('express')
const router = express.Router();
const {registerUser, authUser} = require('../Controller/userController')

// Directly define POST routes
router.post('/', registerUser);
router.post('/login', authUser);

module.exports = router;

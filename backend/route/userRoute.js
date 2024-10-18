const express = require('express')
const router = express.Router();
const {registerUser, authUser,searchUsers} = require('../Controller/userController')
const {verfiyJWT} = require('../middleware/authenticationMiddleware')

// Directly define POST routes
router.post('/', registerUser);
router.post('/login', authUser);
router.get('/',searchUsers)

module.exports = router;

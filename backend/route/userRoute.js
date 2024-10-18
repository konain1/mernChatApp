const express = require('express')
const router = express.Router();
const {registerUser, authUser,searchUsers} = require('../Controller/userController')
const { verifyJWT} = require('../middleware/authenticationMiddleware')


router.post('/register', registerUser);
router.post('/login', authUser);
router.get('/search', verifyJWT, searchUsers); 

module.exports = router;

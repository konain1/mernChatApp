const express = require('express')
const router = express.Router();
const {registerUser, authUser,searchUsers} = require('../Controller/userController')
const { verifyJWT} = require('../middleware/authenticationMiddleware')

// Directly define POST routes
// router.post('/', registerUser);
// router.post('/login', authUser);
// router.get('/',searchUsers)
router.post('/register', registerUser);
router.post('/login', authUser);
router.get('/search', verifyJWT, searchUsers); 

module.exports = router;

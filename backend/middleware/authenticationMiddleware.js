const jwt = require('jsonwebtoken');
const User = require('../model/userModel');
const asyncHandler = require('express-async-handler');

const verifyJWT = asyncHandler(async (req, res, next) => {
    // Check if Authorization header exists and starts with 'Bearer'
    if (!req.headers.authorization?.startsWith('Bearer')) {
        res.status(401);
        throw new Error('No token provided');
    }

    try {
        // Extract token from Authorization header
        const token = req.headers.authorization.split(' ')[1];
        
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Find user and attach to request object (excluding password)
        req.user = await User.findById(decoded.id).select('-password')
        
        if (!req.user) {
            res.status(401);
            throw new Error('User not found');
        }

        next();
    } catch (error) {
        res.status(401);
        throw new Error(error.message === 'User not found' ? error.message : 'Not authorized');
    }
});

module.exports = { verifyJWT };
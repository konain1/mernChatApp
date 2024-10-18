const asyncHandler = require('express-async-handler');
const User = require('../model/userModel');
const GenerateToken = require('../config/Jwt');


const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please enter all the fields!");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({
            message: "User already exists with this email"
        });
    }

    const user = await User.create({
        name,
        email,
        password,
        pic,
    });

    if (user) {
        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: GenerateToken(user._id)
        });
    } else {
        res.status(400);
        throw new Error('Failed to create the user');
    }
});





// authentication
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: GenerateToken(user._id)  
        });
    } else {
        res.status(401);  // Changed to 401 for unauthorized
        throw new Error('Invalid email or password');
    }
});

module.exports = { registerUser, authUser };
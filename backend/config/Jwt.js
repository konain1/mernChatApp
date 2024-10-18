const jwt = require('jsonwebtoken');

const GenerateToken = (id) => {
    return jwt.sign(
        { id },  // Pass an object with the id
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    );
};

module.exports = GenerateToken;
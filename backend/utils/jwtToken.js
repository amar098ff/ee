const jwt = require('jsonwebtoken');

const sendToken = (user, statusCode, res) => {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });

    res.status(statusCode).json({
        success: true,
        user,
        token
    });
};

module.exports = sendToken;

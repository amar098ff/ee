const User = require('../models/User');
const sendToken = require('../utils/jwtToken');

// Register a User
exports.registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.create({
            name,
            email,
            password
        });
        sendToken(user, 201, res);
    } catch (error) {
        next(error);
    }
};

// Login User
exports.loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Please Enter Email & Password' });
        }

        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isPasswordMatched = await user.matchPassword(password);

        if (!isPasswordMatched) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        sendToken(user, 200, res);
    } catch (error) {
        next(error);
    }
};

// Logout User
exports.logout = async (req, res, next) => {
    res.status(200).json({
        success: true,
        message: 'Logged Out'
    });
};

// Get User Detail
exports.getUserDetails = async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user
    });
};

const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protected Routes Middleware
exports.isAuthenticatedUser = async (req, res, next) => {
    const { token } = req.headers;

    if (!token) {
        return res.status(401).json({ message: 'Please Login to access this resource' });
    }

    try {
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decodedData.id);

        if (!req.user) {
            return res.status(401).json({ message: 'User not found. Please Login again.' });
        }

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

// Admin Protection Middleware
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: `Role: ${req.user.role} is not allowed to access this resource`
            });
        }
        next();
    };
};

const Order = require('../models/Order');
const Product = require('../models/Product');

// Create New Order
exports.newOrder = async (req, res, next) => {
    try {
        const {
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        } = req.body;

        const order = await Order.create({
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paidAt: Date.now(),
            user: req.user._id
        });

        res.status(201).json({
            success: true,
            order
        });
    } catch (error) {
        next(error);
    }
};

// Get Single Order
exports.getSingleOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'name email');

        if (!order) {
            return res.status(404).json({ message: 'Order not found with this Id' });
        }

        res.status(200).json({
            success: true,
            order
        });
    } catch (error) {
        next(error);
    }
};

// Get Logged In User Orders
exports.myOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ user: req.user._id });
        res.status(200).json({
            success: true,
            orders
        });
    } catch (error) {
        next(error);
    }
};

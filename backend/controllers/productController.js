const Product = require('../models/Product');

// Create Product -- Admin
exports.createProduct = async (req, res, next) => {
    try {
        req.body.user = req.user.id;
        const product = await Product.create(req.body);
        res.status(201).json({
            success: true,
            product
        });
    } catch (error) {
        next(error);
    }
};

// Get All Product
exports.getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            success: true,
            products
        });
    } catch (error) {
        next(error);
    }
};

// Get Product Details
exports.getProductDetails = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        next(error);
    }
};

// Update Product -- Admin
exports.updateProduct = async (req, res, next) => {
    try {
        let product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });

        res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        next(error);
    }
};

// Delete Product -- Admin
exports.deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await product.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Product Delete Successfully'
        });
    } catch (error) {
        next(error);
    }
};

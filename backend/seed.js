const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const path = require('path');

dotenv.config({ path: path.join(__dirname, 'config/config.env') });

const products = [
    {
        name: 'Pro Wireless Headphones',
        description: 'High-quality wireless headphones with noise cancellation and 40-hour battery life.',
        price: 299.99,
        category: 'Electronics',
        stock: 50,
        images: [{ public_id: '1', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500' }],
        user: '65dbf4e5a9c3b8e4f1a2b3c4' // Placeholder ID, will need adjustment or dynamic user creation
    },
    {
        name: 'Sleek Smartwatch Elite',
        description: 'Track your health and stay connected with this premium smartwatch with AMOLED display.',
        price: 199.50,
        category: 'Electronics',
        stock: 30,
        images: [{ public_id: '2', url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500' }],
        user: '65dbf4e5a9c3b8e4f1a2b3c4'
    },
    {
        name: 'Minimalist Leather Backpack',
        description: 'Handcrafted premium leather backpack for the modern professional.',
        price: 145.00,
        category: 'Clothing',
        stock: 20,
        images: [{ public_id: '3', url: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=500' }],
        user: '65dbf4e5a9c3b8e4f1a2b3c4'
    },
    {
        name: 'Ergonomic Mechanical Keyboard',
        description: 'Customizable RGB mechanical keyboard with blue switches for peak performance.',
        price: 129.00,
        category: 'Electronics',
        stock: 15,
        images: [{ public_id: '4', url: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500' }],
        user: '65dbf4e5a9c3b8e4f1a2b3c4'
    }
];

const seedProducts = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log('Connected to DB for seeding...');

        await Product.deleteMany();
        console.log('Existing products deleted.');

        // Note: In a real scenario, you'd want to create a dummy admin user first or use an existing ID
        // For this seed, we'll assume a specific ID or you can update after creating your first user
        await Product.insertMany(products);
        console.log('All products added successfully!');

        process.exit();
    } catch (error) {
        console.log('Seeding error:', error.message);
        process.exit(1);
    }
};

seedProducts();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const errorMiddleware = require('./middleware/error');

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// Route Imports
const product = require('./routes/productRoutes');
const user = require('./routes/userRoutes');
const order = require('./routes/orderRoutes');
const payment = require('./routes/paymentRoutes');

app.use('/api/v1', product);
app.use('/api/v1', user);
app.use('/api/v1', order);
app.use('/api/v1', payment);

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;

const dotenv = require('dotenv');
const path = require('path');

// Config
dotenv.config({ path: path.join(__dirname, 'config/config.env') });

const app = require('./app');
const connectDatabase = require('./config/database');

// Connecting to database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

// Unhandled Promise Rejection
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(() => {
        process.exit(1);
    });
});

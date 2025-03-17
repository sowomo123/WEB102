const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const compression = require('compression'); // Optimize response size
const rateLimit = require('express-rate-limit'); // Limit requests
const hpp = require('hpp'); // Prevent HTTP parameter pollution

// Custom middleware
const asyncHandler = require('./middleware/async');
const formatResponse = require('./middleware/formatResponse');
const ErrorResponse = require('./utils/errorResponse');
const errorHandler = require('./middleware/errorHandler');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());  // Parse JSON request body
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded payloads
app.use(morgan('dev'));   // HTTP request logging
app.use(helmet());        // Security middleware
app.use(cors());          // Enable CORS
app.use(compression());   // Optimize responses
app.use(hpp());           // Prevent HTTP parameter pollution
app.use(rateLimit({       // Rate limiting
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // Limit each IP to 100 requests per windowMs
}));

// Custom middleware
app.use(formatResponse);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Serve API documentation
app.get('/api-docs', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'docs.html'));
});

// Routes
app.use('/users', require('./routes/users'));
app.use('/posts', require('./routes/posts'));
app.use('/comments', require('./routes/comments'));
app.use('/likes', require('./routes/likes'));
app.use('/followers', require('./routes/followers'));

// Example route to demonstrate error handling
app.get('/example', asyncHandler(async (req, res, next) => {
    // Simulating an error
    if (!req.user) {
        return next(new ErrorResponse('Not authorized to access this route', 401));
    }
    res.status(200).json({ success: true, data: 'Example Data' });
}));

// Basic route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Social Media API' });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Set server port
const PORT = process.env.PORT || 3000;

// Start the server
const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running in development mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error(`Unhandled Rejection: ${err.message}`);
    server.close(() => process.exit(1)); // Graceful shutdown
});

// Handle SIGINT and SIGTERM for cleanup
process.on('SIGINT', () => {
    console.log('Shutting down server...');
    server.close(() => process.exit(0));
});
process.on('SIGTERM', () => {
    console.log('Server terminated.');
    server.close(() => process.exit(0));
});
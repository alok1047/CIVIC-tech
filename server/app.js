const express = require('express');
const cors = require('cors');

// Initialize the express app
const app = express();

// Middlewares
// Enable CORS for all routes
app.use(cors());

// Express middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple health check route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Server is up and running!' });
});

// We will add the main API routes here in a future PR
// Example: app.use('/api/v1', mainRouter);

module.exports = app;
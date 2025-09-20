const express = require('express');
const cors = require('cors');

// --- IMPORT YOUR ROUTES ---
const authRoutes = require('./src/api/auth.routes');
const issueRoutes = require('./src/api/issue.routes');
const userRoutes = require('./src/api/user.routes'); // <-- IMPORT

const app = express();

// --- CORE MIDDLEWARES ---
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// --- API ROUTES ---
app.use('/api/auth', authRoutes);
app.use('/api/issues', issueRoutes);
app.use('/api/users', userRoutes); // <-- ADD THIS LINE

// --- HEALTH CHECK ROUTE ---
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', message: 'Server is healthy' });
});

module.exports = app;
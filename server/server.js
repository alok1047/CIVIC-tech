const dotenv = require('dotenv');
const app = require('./app');
const connectDB = require('./src/config/database');

// Load environment variables from .env file
dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
const dotenv = require('dotenv');
const app = require('./app');
const connectDB = require('./src/config/database');

// Load environment variables from .env file
dotenv.config({ path: require('path').join(__dirname, '.env') });

const PORT = process.env.PORT || 3000;

// Connect to the database
connectDB();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
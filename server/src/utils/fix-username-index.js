const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: require('path').join(__dirname, '../../.env') });

const fixUsernameIndex = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected Successfully.');

    const db = mongoose.connection.db;

    // Check if the username index exists
    const indexes = await db.collection('users').indexes();
    console.log('Current indexes on users collection:', indexes);

    // Find the username index
    const usernameIndex = indexes.find(index => index.name === 'username_1');

    if (usernameIndex) {
      console.log('Found username_1 index. Dropping it...');
      await db.collection('users').dropIndex('username_1');
      console.log('Successfully dropped username_1 index.');
    } else {
      console.log('username_1 index not found. It may have already been dropped.');
    }

    // Verify the fix by listing indexes again
    const updatedIndexes = await db.collection('users').indexes();
    console.log('Updated indexes on users collection:', updatedIndexes);

    console.log('Database fix completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error fixing database:', error);
    process.exit(1);
  }
};

// Run the fix
fixUsernameIndex();

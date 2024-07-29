const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const mongoURI = process.env.MONGO_URI;

// Function to connect to MongoDB
const connectMongoDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);  // Exit process with failure
  }
};

// Export the connection function
module.exports = connectMongoDB;

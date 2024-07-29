require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const connectMongoDB = require('./config/mongo');  // Change this line to properly call the function

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const shopRoutes = require('./routes/shopRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectMongoDB();  // Add this line to call the MongoDB connection function

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/shops', shopRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

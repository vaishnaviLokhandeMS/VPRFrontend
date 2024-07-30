require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectMongoDB = require('./config/mongo');  // Function to connect to MongoDB

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const shopRoutes = require('./routes/shopRoutes');
const itemRoutes = require('./routes/itemRoutes');  // Import item routes

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectMongoDB();  // Call the function to connect to MongoDB

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/shops', shopRoutes);
app.use('/api/items', itemRoutes);  // Use item routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

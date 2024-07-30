const express = require('express');
const router = express.Router();

// Import the controller functions
const { addItem } = require('../controllers/items/addItemController.js');
const { viewItem } = require('../controllers/items/viewItemController.js');
const { updateItem } = require('../controllers/items/updateItemController.js');
const { deleteItem } = require('../controllers/items/deleteItemController.js');

// Import the authentication middleware
const { authenticateToken, authenticateShopToken, verifyTokensMatch } = require('../middlewares/addItemAuthenticator');

// Define the routes and map them to controller functions
router.post('/addItem', authenticateToken, authenticateShopToken, verifyTokensMatch, addItem); // Route to add a new item with authentication
//router.get('/viewItem/:id', authenticateToken, authenticateShopToken, verifyTokensMatch, viewItem); // Route to view an item by ID with authentication
//router.put('/updateItem/:id', authenticateToken, authenticateShopToken, verifyTokensMatch, updateItem); // Route to update an item by ID with authentication
//router.delete('/deleteItem/:id', authenticateToken, authenticateShopToken, verifyTokensMatch, deleteItem); // Route to delete an item by ID with authentication

module.exports = router;

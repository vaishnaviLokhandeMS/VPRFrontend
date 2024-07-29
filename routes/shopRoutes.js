const express = require('express');
const { createShop } = require('../controllers/shopController');
const { validateShopID, getUserShops } = require('../controllers/shopAssociationController');
const { selectShop } = require('../controllers/shopAuthenticator'); // Import the new controller

const router = express.Router();

router.post('/create', createShop);
router.post('/validate', validateShopID);
router.get('/user-shops', getUserShops);
router.post('/select-shop', selectShop); // Add the new route

module.exports = router;

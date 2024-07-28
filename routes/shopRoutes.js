const express = require('express');
const { createShop } = require('../controllers/shopController');
const { validateShopID, getUserShops } = require('../controllers/shopAssociationController');

const router = express.Router();

router.post('/create', createShop);
router.post('/validate', validateShopID);
router.get('/user-shops', getUserShops);

module.exports = router;

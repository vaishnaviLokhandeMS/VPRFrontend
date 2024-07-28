const express = require('express');
const router = express.Router();
const { createUser } = require('../controllers/userController.js');
const { loginUser, getUser } = require('../controllers/authController.js');

router.post('/createUser', createUser);
router.post('/login', loginUser);
router.get('/user', getUser); // Ensure this is correctly referenced

module.exports = router;

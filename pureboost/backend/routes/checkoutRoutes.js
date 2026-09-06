// routes/checkoutRoutes.js
const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/', authenticateToken, checkoutController.checkoutCart);

module.exports = router;

const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const {
  getProfile,
  updateProfile,
  getOrders,
  requestRefund
} = require('../controllers/profileController');

router.get('/', authenticateToken, getProfile);       // GET /profile
router.put('/update', authenticateToken, updateProfile); // PUT /profile/update
router.get('/orders', authenticateToken, getOrders);  // GET /profile/orders
router.post('/refund', authenticateToken, requestRefund); // POST /profile/refund

module.exports = router;

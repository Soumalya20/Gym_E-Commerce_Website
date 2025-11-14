const express = require('express');
const { createPaymentOrder, verifyPayment } = require('../controllers/paymentController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/orders', authMiddleware, createPaymentOrder);
router.post('/verify', authMiddleware, verifyPayment);

module.exports = router;

const express = require('express');
const { getMyOrders, getOrderById, getOrders, updateOrderToDelivered } = require('../controllers/orderController');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');

const router = express.Router();

router.use(authMiddleware);

router.get('/mine', getMyOrders);
router.get('/', adminMiddleware, getOrders);
router.get('/:id', getOrderById);
router.put('/:id/deliver', adminMiddleware, updateOrderToDelivered);

module.exports = router;

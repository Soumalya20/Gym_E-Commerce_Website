const express = require('express');
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  reviewProduct,
} = require('../controllers/productController');
const adminMiddleware = require('../middleware/admin');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.route('/').get(getProducts).post(adminMiddleware, createProduct);

router.post('/:id/reviews', authMiddleware, reviewProduct);

router
  .route('/:id')
  .get(getProductById)
  .put(adminMiddleware, updateProduct)
  .delete(adminMiddleware, deleteProduct);

module.exports = router;

import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
} from '../controllers/productController.js';
const router = express.Router();

// @desc    Fetch all products | Create a product
// @route   GET /api/products | POST /api/products
// @access  Public | Private/Admin
router.route('/').get(getProducts).post(protect, admin, createProduct);

// @desc    Fetch single product | Delete a product | Upate a product
// @route   GET /api/products/:id | DELETE /api/products/:id | PUT /api/products/:id
// @access  Public | Private/Admin | Private/Admin
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default router;

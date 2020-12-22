import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import {
  getProducts,
  getProductById,
  deleteProduct,
} from '../controllers/productController.js';
const router = express.Router();

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
router.route('/').get(getProducts);

// @desc    Fetch single product | Delete a product
// @route   GET /api/products/:id | DELETE /api/products/:id
// @access  Public | Private/Admin
router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct);

export default router;

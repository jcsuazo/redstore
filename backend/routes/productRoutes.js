import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
  getFeaturedProducts,
  getLatestProducts,
  getRelatedProducts,
} from '../controllers/productController.js';
const router = express.Router();

// @desc    Fetch all products | Create a product
// @route   GET /api/products | POST /api/products
// @access  Public | Private/Admin
router.route('/').get(getProducts).post(protect, admin, createProduct);

// @desc    Get top rated products
// @route   POST /api/products/top
// @access  Public
router.route('/top').get(getTopProducts);

// @desc    Get latest 4 feature products
// @route   POST /api/products/featured
// @access  Public
router.route('/featured').get(getFeaturedProducts);

// @desc    Get latest products
// @route   GET /api/products/latest
// @access  Public
router.route('/latest').get(getLatestProducts);

// @desc    Get top 4 related products
// @route   GET /api/products/:id/related
// @access  Public
router.route('/:id/related').get(getRelatedProducts);

// @desc    Fetch single product | Delete a product | Upate a product
// @route   GET /api/products/:id | DELETE /api/products/:id | PUT /api/products/:id
// @access  Public | Private/Admin | Private/Admin
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
router.route('/:id/reviews').post(protect, createProductReview);

export default router;

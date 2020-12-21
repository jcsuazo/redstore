import express from 'express';
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
} from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

// @desc    Create new order
// @route   POST /api/orders
// @access  private
router.route('/').post(protect, addOrderItems);

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
router.route('/:id').get(protect, getOrderById);

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
router.route('/:id/pay').put(protect, updateOrderToPaid);

export default router;

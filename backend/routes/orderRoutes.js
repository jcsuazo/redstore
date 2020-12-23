import express from 'express';
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
const router = express.Router();

// @desc    Create new order | Get all orders
// @route   POST /api/orders | GET /api/orders
// @access  private | Private Admin
router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
router.route('/myorders').get(protect, getMyOrders);

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
router.route('/:id').get(protect, getOrderById);

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
router.route('/:id/pay').put(protect, updateOrderToPaid);

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private / Admin
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

export default router;

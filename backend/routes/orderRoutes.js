import express from 'express';
import { addOrderItems } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

// @desc    Create new order
// @route   POST /api/orders
// @access  private
router.route('/').post(protect, addOrderItems);

export default router;
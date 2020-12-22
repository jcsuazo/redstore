import express from 'express';
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
const router = express.Router();

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
router.route('/').post(registerUser).get(protect, admin, getUsers);

// @desc    Auth user & get token
// @route   POST /api/user/login
// @access  Public
router.post('/login', authUser);

// @desc    Get user profile
// @route   GET /api/user/profile
// @access  Private
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
router.route('/:id').delete(protect, admin, deleteUser);

export default router;

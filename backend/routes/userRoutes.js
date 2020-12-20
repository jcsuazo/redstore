import express from 'express';
import { authUser } from '../controllers/userController.js';
const router = express.Router();

// @desc    Auth user & get token
// @route   POST /api/user/login
// @access  Public
router.post('/login', authUser);

export default router;

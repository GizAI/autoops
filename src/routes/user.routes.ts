import express from 'express';
import * as userController from '../controllers/user.controller';
import { authenticate } from '../middleware/auth.middleware';
import { asyncHandler } from '../utils/asyncHandler';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Get all users (admin only)
router.get('/', asyncHandler(userController.getAllUsers));

// Get user by ID (admin or own user)
router.get('/:id', asyncHandler(userController.getUserById));

// Create user (admin only)
router.post('/', asyncHandler(userController.createUser));

// Update user (admin or own user)
router.put('/:id', asyncHandler(userController.updateUser));

// Delete user (admin only)
router.delete('/:id', asyncHandler(userController.deleteUser));

export default router;

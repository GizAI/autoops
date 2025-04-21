import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { asyncHandler } from '../middleware/error.middleware';
import { authenticate } from '../middleware/auth.middleware';
import { isAdmin } from '../middleware/rbac.middleware';

const router = Router();

// Public auth routes
router.post('/login', asyncHandler(authController.login));
router.get('/gmail/callback', asyncHandler(authController.gmailCallback));

// Admin-only routes
router.post('/register', authenticate, isAdmin, asyncHandler(authController.register));
router.get('/gmail/auth', authenticate, isAdmin, asyncHandler(authController.gmailAuth));

export default router;

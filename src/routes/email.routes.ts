import { Router } from 'express';
import * as emailController from '../controllers/email.controller';
import { authenticate } from '../middleware/auth.middleware';
import { asyncHandler } from '../middleware/error.middleware';
import { isAdmin, checkRole } from '../middleware/rbac.middleware';

const router = Router();

// Email routes - require user or admin role
router.get('/sync', authenticate, checkRole(['user', 'admin']), asyncHandler(emailController.syncEmails));
router.get('/processed', authenticate, checkRole(['user', 'admin']), asyncHandler(emailController.getProcessedEmails));
router.get('/processed/:id', authenticate, checkRole(['user', 'admin']), asyncHandler(emailController.getProcessedEmailById));
router.get('/thread/:threadId', authenticate, checkRole(['user', 'admin']), asyncHandler(emailController.getEmailsByThreadId));

// Gmail webhook routes - no authentication for webhooks
router.post('/webhook', asyncHandler(emailController.handleGmailPushNotification));
router.post('/setup-webhook', authenticate, isAdmin, asyncHandler(emailController.setupGmailPushNotifications));

export default router;

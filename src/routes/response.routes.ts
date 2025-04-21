import { Router } from 'express';
import * as responseController from '../controllers/response.controller';
import { authenticate } from '../middleware/auth.middleware';
import { asyncHandler } from '../middleware/error.middleware';
import { isAdmin, checkRole } from '../middleware/rbac.middleware';

const router = Router();

// Response routes - require user or admin role
router.get('/', authenticate, checkRole(['user', 'admin']), asyncHandler(responseController.getAllResponses));
router.get('/drafts', authenticate, checkRole(['user', 'admin']), asyncHandler(responseController.getDraftResponses));
router.get('/:id', authenticate, checkRole(['user', 'admin']), asyncHandler(responseController.getResponseById));
router.post('/generate', authenticate, checkRole(['user', 'admin']), asyncHandler(responseController.generateResponse));
router.put('/:id', authenticate, checkRole(['user', 'admin']), asyncHandler(responseController.updateResponse));
router.put('/:id/status', authenticate, checkRole(['user', 'admin']), asyncHandler(responseController.updateResponseStatus));
router.post('/:id/send', authenticate, checkRole(['user', 'admin']), asyncHandler(responseController.sendResponse));

export default router;

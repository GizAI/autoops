import { Router } from 'express';
import * as knowledgeController from '../controllers/knowledge.controller';
import { authenticate } from '../middleware/auth.middleware';
import { asyncHandler } from '../middleware/error.middleware';
import { isAdmin, checkRole } from '../middleware/rbac.middleware';

const router = Router();

// Knowledge routes - read operations for user and admin
router.get('/', authenticate, checkRole(['user', 'admin']), asyncHandler(knowledgeController.getAllKnowledge));
router.get('/:id', authenticate, checkRole(['user', 'admin']), asyncHandler(knowledgeController.getKnowledgeById));
router.post('/search', authenticate, checkRole(['user', 'admin']), asyncHandler(knowledgeController.searchKnowledge));

// Knowledge routes - write operations for admin only
router.post('/', authenticate, isAdmin, asyncHandler(knowledgeController.createKnowledge));
router.put('/:id', authenticate, isAdmin, asyncHandler(knowledgeController.updateKnowledge));
router.delete('/:id', authenticate, isAdmin, asyncHandler(knowledgeController.deleteKnowledge));
router.post('/build-from-emails', authenticate, isAdmin, asyncHandler(knowledgeController.buildKnowledgeFromEmails));

export default router;

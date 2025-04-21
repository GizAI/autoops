import { Router } from 'express';
import * as knowledgeController from '../controllers/knowledge.controller';
import { authenticate } from '../middleware/auth.middleware';
import { asyncHandler } from '../middleware/error.middleware';
import { isAdmin, checkRole } from '../middleware/rbac.middleware';
import * as KnowledgeBaseUtil from '../utils/knowledge-base';

const router = Router();

// Knowledge routes - read operations for user and admin
router.get('/', authenticate, checkRole(['user', 'admin']), asyncHandler(knowledgeController.getAllKnowledge));
router.get('/:id', authenticate, checkRole(['user', 'admin']), asyncHandler(knowledgeController.getKnowledgeById));
router.post('/search', authenticate, checkRole(['user', 'admin']), asyncHandler(knowledgeController.searchKnowledge));

// Knowledge routes - write operations for admin only
router.post('/', authenticate, isAdmin, asyncHandler(knowledgeController.createKnowledge));
router.put('/:id', authenticate, isAdmin, asyncHandler(knowledgeController.updateKnowledge));
router.delete('/:id', authenticate, isAdmin, asyncHandler(knowledgeController.deleteKnowledge));

// Knowledge base building routes
router.post('/build-from-emails', authenticate, isAdmin, asyncHandler(knowledgeController.buildKnowledgeFromEmails));

// Import and export routes
router.post('/import-document', authenticate, isAdmin, asyncHandler(async (req, res) => {
  try {
    const { document, source, sourceId, category, language } = req.body;

    // Validate required fields
    if (!document || !source) {
      return res.status(400).json({ message: 'Document content and source are required' });
    }

    // Import document
    const results = await KnowledgeBaseUtil.importFromDocument(
      document,
      source,
      sourceId,
      category,
      language
    );

    res.status(201).json({
      message: `Created ${results.length} knowledge entries from document`,
      entries: results
    });
  } catch (error) {
    console.error('Import document error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}));

router.get('/export', authenticate, isAdmin, asyncHandler(async (req, res) => {
  try {
    const { category, language, source } = req.query;

    // Export document
    const document = await KnowledgeBaseUtil.exportToDocument({
      category: category as string,
      language: language as string,
      source: source as string
    });

    res.json({
      document
    });
  } catch (error) {
    console.error('Export document error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}));

export default router;

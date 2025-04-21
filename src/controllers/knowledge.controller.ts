import { Request, Response } from 'express';
import { google } from 'googleapis';
import { prisma } from '../index';
import { logger } from '../utils/logger';
import { generateEmbedding } from '../services/openai.service';
import { detectLanguage } from '../utils/language';
import * as KnowledgeBaseUtil from '../utils/knowledge-base';
import { parseGmailMessage } from '../utils/email-parser';

// Gmail API setup
const gmail = google.gmail('v1');

// Set up OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  process.env.GMAIL_REDIRECT_URI
);

// Set credentials from environment variables
if (process.env.GMAIL_REFRESH_TOKEN) {
  oauth2Client.setCredentials({
    refresh_token: process.env.GMAIL_REFRESH_TOKEN
  });
}

// Get all knowledge entries
export const getAllKnowledge = async (req: Request, res: Response) => {
  try {
    const { category, language, source, page = 1, limit = 20 } = req.query;

    // Build query conditions
    const where: any = {};
    if (category) where.category = category;
    if (language) where.language = language;
    if (source) where.source = source;

    // Calculate pagination
    const skip = (Number(page) - 1) * Number(limit);

    // Get knowledge entries with pagination
    const [knowledge, total] = await Promise.all([
      prisma.knowledgeBase.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: Number(limit)
      }),
      prisma.knowledgeBase.count({ where })
    ]);

    // Return with pagination metadata
    res.json({
      data: knowledge,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    logger.error('Get all knowledge error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get knowledge entry by ID
export const getKnowledgeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const knowledge = await prisma.knowledgeBase.findUnique({
      where: { id: parseInt(id) }
    });

    if (!knowledge) {
      return res.status(404).json({ message: 'Knowledge entry not found' });
    }

    res.json(knowledge);
  } catch (error) {
    logger.error('Get knowledge by ID error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new knowledge entry
export const createKnowledge = async (req: Request, res: Response) => {
  try {
    const { content, source, sourceId, category, language } = req.body;

    // Validate required fields
    if (!content || !source) {
      return res.status(400).json({ message: 'Content and source are required' });
    }

    // Create knowledge entry using utility
    const knowledge = await KnowledgeBaseUtil.createKnowledgeEntry({
      content,
      source,
      sourceId,
      category,
      language
    });

    res.status(201).json(knowledge);
  } catch (error) {
    logger.error('Create knowledge error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a knowledge entry
export const updateKnowledge = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { content, source, sourceId, category, language } = req.body;

    // Update knowledge entry using utility
    try {
      const knowledge = await KnowledgeBaseUtil.updateKnowledgeEntry(parseInt(id), {
        content,
        source,
        sourceId,
        category,
        language
      });

      res.json(knowledge);
    } catch (error: any) {
      if (error.message?.includes('not found')) {
        return res.status(404).json({ message: 'Knowledge entry not found' });
      }
      throw error;
    }
  } catch (error) {
    logger.error('Update knowledge error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a knowledge entry
export const deleteKnowledge = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Delete knowledge entry using utility
    try {
      await KnowledgeBaseUtil.deleteKnowledgeEntry(parseInt(id));
      res.json({ message: 'Knowledge entry deleted' });
    } catch (error: any) {
      if (error.message?.includes('not found')) {
        return res.status(404).json({ message: 'Knowledge entry not found' });
      }
      throw error;
    }
  } catch (error) {
    logger.error('Delete knowledge error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Search knowledge base
export const searchKnowledge = async (req: Request, res: Response) => {
  try {
    const { query, language, category, limit = 5, threshold = 0.7, useHybridSearch = true } = req.body;

    // Validate required fields
    if (!query) {
      return res.status(400).json({ message: 'Query is required' });
    }

    // Search knowledge base using utility
    const results = await KnowledgeBaseUtil.searchKnowledgeBase({
      query,
      language,
      category,
      limit: Number(limit),
      threshold: Number(threshold),
      useHybridSearch
    });

    res.json(results);
  } catch (error) {
    logger.error('Search knowledge error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Build knowledge base from emails
export const buildKnowledgeFromEmails = async (req: Request, res: Response) => {
  try {
    // Check if we have a refresh token
    if (!process.env.GMAIL_REFRESH_TOKEN) {
      return res.status(400).json({ message: 'Gmail authentication required' });
    }

    const { query = 'from:me to:support@giz.ai', maxResults = 50, category = 'Email Responses' } = req.body;

    // Get emails from Gmail
    const response = await gmail.users.messages.list({
      auth: oauth2Client,
      userId: 'me',
      q: query,
      maxResults
    });

    const messages = response.data.messages || [];
    const knowledgeEntries = [];

    for (const message of messages) {
      if (!message.id) continue;

      // Get email details
      const emailData = await gmail.users.messages.get({
        auth: oauth2Client,
        userId: 'me',
        id: message.id
      });

      if (!emailData.data || !emailData.data.payload) continue;

      // Parse email using the email parser utility
      const parsedEmail = parseGmailMessage(emailData.data);

      // Skip if not from support email
      if (!parsedEmail.fromEmail.includes(process.env.SUPPORT_EMAIL || '')) {
        continue;
      }

      // Skip if body is too short
      if (!parsedEmail.textBody || parsedEmail.textBody.length < 50) continue;

      // Split content into chunks for better search performance
      const chunks = KnowledgeBaseUtil.splitContentIntoChunks(parsedEmail.textBody);

      // Create knowledge entries for each chunk
      for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];
        const chunkId = `${message.id}-${i + 1}`;

        // Create knowledge entry
        const knowledge = await KnowledgeBaseUtil.createKnowledgeEntry({
          content: chunk,
          source: 'email',
          sourceId: chunkId,
          category,
          language: parsedEmail.language
        });

        knowledgeEntries.push(knowledge);
      }
    }

    res.json({
      message: `Created ${knowledgeEntries.length} knowledge entries from emails`,
      entries: knowledgeEntries
    });
  } catch (error) {
    logger.error('Build knowledge from emails error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

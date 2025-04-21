import { Request, Response } from 'express';
import { google } from 'googleapis';
import { prisma } from '../index';
import { logger } from '../utils/logger';
import { generateEmbedding } from '../services/openai.service';
import { detectLanguage } from '../utils/language';

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
    const knowledge = await prisma.knowledgeBase.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    res.json(knowledge);
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
    
    // Generate embedding for the content
    const embedding = await generateEmbedding(content);
    
    // Create knowledge entry
    const knowledge = await prisma.$queryRaw`
      INSERT INTO "knowledge_base" (content, embedding, source, source_id, category, language, created_at, updated_at)
      VALUES (${content}, ${embedding}::vector, ${source}, ${sourceId}, ${category}, ${language}, NOW(), NOW())
      RETURNING *
    `;
    
    res.status(201).json(knowledge[0]);
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
    
    // Check if knowledge entry exists
    const existingKnowledge = await prisma.knowledgeBase.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!existingKnowledge) {
      return res.status(404).json({ message: 'Knowledge entry not found' });
    }
    
    // Generate new embedding if content changed
    let embedding = null;
    if (content !== existingKnowledge.content) {
      embedding = await generateEmbedding(content);
    }
    
    // Update knowledge entry
    if (embedding) {
      const knowledge = await prisma.$queryRaw`
        UPDATE "knowledge_base"
        SET content = ${content},
            embedding = ${embedding}::vector,
            source = ${source},
            source_id = ${sourceId},
            category = ${category},
            language = ${language},
            updated_at = NOW()
        WHERE id = ${parseInt(id)}
        RETURNING *
      `;
      
      res.json(knowledge[0]);
    } else {
      const knowledge = await prisma.knowledgeBase.update({
        where: { id: parseInt(id) },
        data: {
          content,
          source,
          sourceId,
          category,
          language,
          updatedAt: new Date()
        }
      });
      
      res.json(knowledge);
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
    
    // Check if knowledge entry exists
    const existingKnowledge = await prisma.knowledgeBase.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!existingKnowledge) {
      return res.status(404).json({ message: 'Knowledge entry not found' });
    }
    
    // Delete knowledge entry
    await prisma.knowledgeBase.delete({
      where: { id: parseInt(id) }
    });
    
    res.json({ message: 'Knowledge entry deleted' });
  } catch (error) {
    logger.error('Delete knowledge error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Search knowledge base
export const searchKnowledge = async (req: Request, res: Response) => {
  try {
    const { query, language, limit = 5 } = req.body;
    
    // Generate embedding for the query
    const embedding = await generateEmbedding(query);
    
    // Search knowledge base
    let knowledge;
    if (language) {
      knowledge = await prisma.$queryRaw`
        SELECT *, (embedding <=> ${embedding}::vector) AS distance
        FROM "knowledge_base"
        WHERE language = ${language}
        ORDER BY distance
        LIMIT ${limit}
      `;
    } else {
      knowledge = await prisma.$queryRaw`
        SELECT *, (embedding <=> ${embedding}::vector) AS distance
        FROM "knowledge_base"
        ORDER BY distance
        LIMIT ${limit}
      `;
    }
    
    res.json(knowledge);
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
    
    const { query = 'from:me to:support@giz.ai', maxResults = 50 } = req.body;
    
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
      
      // Extract email data
      const headers = emailData.data.payload.headers || [];
      const subject = headers.find(h => h.name === 'Subject')?.value || 'No Subject';
      const from = headers.find(h => h.name === 'From')?.value || '';
      const fromEmail = from.match(/<(.+)>/) ? from.match(/<(.+)>/)![1] : from;
      const threadId = emailData.data.threadId || '';
      
      // Skip if not from support email
      if (!fromEmail.includes(process.env.SUPPORT_EMAIL || '')) {
        continue;
      }
      
      // Get email body
      let body = '';
      if (emailData.data.payload.parts) {
        for (const part of emailData.data.payload.parts) {
          if (part.mimeType === 'text/plain' && part.body && part.body.data) {
            body = Buffer.from(part.body.data, 'base64').toString('utf-8');
            break;
          }
        }
      } else if (emailData.data.payload.body && emailData.data.payload.body.data) {
        body = Buffer.from(emailData.data.payload.body.data, 'base64').toString('utf-8');
      }
      
      // Skip if body is too short
      if (body.length < 50) continue;
      
      // Detect language
      const language = detectLanguage(body);
      
      // Generate embedding
      const embedding = await generateEmbedding(body);
      
      // Create knowledge entry
      const knowledge = await prisma.$queryRaw`
        INSERT INTO "knowledge_base" (content, embedding, source, source_id, category, language, created_at, updated_at)
        VALUES (${body}, ${embedding}::vector, 'email', ${message.id}, ${subject}, ${language}, NOW(), NOW())
        RETURNING *
      `;
      
      knowledgeEntries.push(knowledge[0]);
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

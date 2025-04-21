import { Request, Response } from 'express';
import { google } from 'googleapis';
import { prisma } from '../index';
import { logger } from '../utils/logger';
import { generateEmailResponse } from '../services/openai.service';

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

// Get all responses
export const getAllResponses = async (req: Request, res: Response) => {
  try {
    logger.info('Retrieving all responses', {
      userId: req.user?.id,
      timestamp: new Date().toISOString()
    });
    const responses = await prisma.response.findMany({
      orderBy: { createdAt: 'desc' },
      include: { processedEmails: true }
    });

    res.json(responses);
  } catch (error) {
    logger.error('Get all responses error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get draft responses
export const getDraftResponses = async (req: Request, res: Response) => {
  try {
    const responses = await prisma.response.findMany({
      where: { status: 'draft' },
      orderBy: { createdAt: 'desc' },
      include: { processedEmails: true }
    });

    res.json(responses);
  } catch (error) {
    logger.error('Get draft responses error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get response by ID
export const getResponseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const response = await prisma.response.findUnique({
      where: { id: parseInt(id) },
      include: { processedEmails: true }
    });

    if (!response) {
      return res.status(404).json({ message: 'Response not found' });
    }

    res.json(response);
  } catch (error) {
    logger.error('Get response by ID error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Generate a response for an email
export const generateResponse = async (req: Request, res: Response) => {
  try {
    const { emailId } = req.body;

    logger.info(`Generating response for email ID: ${emailId}`, {
      userId: req.user?.id,
      emailId,
      timestamp: new Date().toISOString()
    });

    // Get the processed email
    const email = await prisma.processedEmail.findUnique({
      where: { id: parseInt(emailId) }
    });

    if (!email) {
      return res.status(404).json({ message: 'Email not found' });
    }

    // Check if we have a refresh token
    if (!process.env.GMAIL_REFRESH_TOKEN) {
      return res.status(400).json({ message: 'Gmail authentication required' });
    }

    // Get email content from Gmail
    const emailData = await gmail.users.messages.get({
      auth: oauth2Client,
      userId: 'me',
      id: email.messageId
    });

    if (!emailData.data || !emailData.data.payload) {
      return res.status(404).json({ message: 'Email content not found' });
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

    // Search knowledge base for relevant entries
    const language = email.language || 'en';
    const embedding = await prisma.$queryRaw`
      SELECT embedding::text FROM "knowledge_base" LIMIT 1
    `;

    // If we have embeddings in the database, use them for search
    let knowledgeBase = [];
    if (embedding && embedding.length > 0) {
      knowledgeBase = await prisma.$queryRaw`
        SELECT *, (embedding <=> (
          SELECT embedding FROM "knowledge_base"
          ORDER BY (content <-> ${body})
          LIMIT 1
        )) AS distance
        FROM "knowledge_base"
        WHERE language = ${language} OR language IS NULL
        ORDER BY distance
        LIMIT 5
      `;
    } else {
      // Fallback to simple search if no embeddings
      knowledgeBase = await prisma.knowledgeBase.findMany({
        where: {
          OR: [
            { language },
            { language: null }
          ]
        },
        take: 5
      });
    }

    // Generate response
    const generatedResponse = await generateEmailResponse(
      body,
      knowledgeBase,
      language
    );

    // Create response in database
    const response = await prisma.response.create({
      data: {
        threadId: email.threadId,
        subject: generatedResponse.subject,
        body: generatedResponse.body,
        language,
        knowledgeSources: knowledgeBase.map(k => ({ id: k.id, content: k.content.substring(0, 100) + '...' })),
        processedEmails: {
          connect: { id: email.id }
        }
      }
    });

    // Update email status
    await prisma.processedEmail.update({
      where: { id: email.id },
      data: {
        status: 'processed',
        responseId: response.id
      }
    });

    res.json(response);
  } catch (error) {
    logger.error('Generate response error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a response
export const updateResponse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { subject, body, htmlBody } = req.body;

    // Check if response exists
    const existingResponse = await prisma.response.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existingResponse) {
      return res.status(404).json({ message: 'Response not found' });
    }

    // Update response
    const response = await prisma.response.update({
      where: { id: parseInt(id) },
      data: {
        subject,
        body,
        htmlBody,
        updatedAt: new Date()
      }
    });

    res.json(response);
  } catch (error) {
    logger.error('Update response error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update response status
export const updateResponseStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Check if response exists
    const existingResponse = await prisma.response.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existingResponse) {
      return res.status(404).json({ message: 'Response not found' });
    }

    // Update response status
    const response = await prisma.response.update({
      where: { id: parseInt(id) },
      data: {
        status,
        updatedAt: new Date()
      }
    });

    res.json(response);
  } catch (error) {
    logger.error('Update response status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Send a response
export const sendResponse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    logger.info(`Sending response ID: ${id}`, {
      userId: req.user?.id,
      responseId: id,
      timestamp: new Date().toISOString()
    });

    // Get the response
    const response = await prisma.response.findUnique({
      where: { id: parseInt(id) },
      include: { processedEmails: true }
    });

    if (!response) {
      return res.status(404).json({ message: 'Response not found' });
    }

    // Check if we have a refresh token
    if (!process.env.GMAIL_REFRESH_TOKEN) {
      return res.status(400).json({ message: 'Gmail authentication required' });
    }

    // Get the original email to reply to
    const originalEmail = response.processedEmails[0];
    if (!originalEmail) {
      return res.status(400).json({ message: 'No original email found to reply to' });
    }

    // Get email details from Gmail
    const emailData = await gmail.users.messages.get({
      auth: oauth2Client,
      userId: 'me',
      id: originalEmail.messageId
    });

    if (!emailData.data || !emailData.data.payload) {
      return res.status(404).json({ message: 'Original email not found' });
    }

    // Extract headers
    const headers = emailData.data.payload.headers || [];
    const from = headers.find(h => h.name === 'From')?.value || '';
    const messageId = headers.find(h => h.name === 'Message-ID')?.value || '';
    const references = headers.find(h => h.name === 'References')?.value || '';

    // Prepare email content
    const emailContent = [
      `From: ${process.env.SUPPORT_EMAIL}`,
      `To: ${originalEmail.fromEmail}`,
      `Subject: ${response.subject}`,
      `In-Reply-To: ${messageId}`,
      `References: ${references ? references + ' ' : ''}${messageId}`,
      'Content-Type: text/plain; charset=UTF-8',
      '',
      response.body
    ].join('\r\n');

    // Encode email content
    const encodedEmail = Buffer.from(emailContent).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

    // Send email
    await gmail.users.messages.send({
      auth: oauth2Client,
      userId: 'me',
      requestBody: {
        raw: encodedEmail,
        threadId: response.threadId
      }
    });

    // Update response status
    const updatedResponse = await prisma.response.update({
      where: { id: parseInt(id) },
      data: {
        status: 'sent',
        sentAt: new Date(),
        updatedAt: new Date()
      }
    });

    logger.info(`Response ID: ${id} sent successfully`, {
      userId: req.user?.id,
      responseId: id,
      emailTo: originalEmail.fromEmail,
      threadId: response.threadId,
      timestamp: new Date().toISOString()
    });

    res.json(updatedResponse);
  } catch (error) {
    logger.error('Send response error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

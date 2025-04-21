import { Request, Response } from 'express';
import { google } from 'googleapis';
import { prisma } from '../index';
import { logger } from '../utils/logger';
import crypto from 'crypto';
import { notificationService } from '../services/notification.service';
import { parseGmailMessage, downloadAttachment, ParsedEmail } from '../utils/email-parser';
import * as EmailModel from '../models/email.model';

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

// Sync emails from Gmail
export const syncEmails = async (req: Request, res: Response) => {
  try {
    logger.info('Starting email synchronization from Gmail', {
      userId: req.user?.id,
      timestamp: new Date().toISOString()
    });
    // Check if we have a refresh token
    if (!process.env.GMAIL_REFRESH_TOKEN) {
      return res.status(400).json({ message: 'Gmail authentication required' });
    }

    // Get emails from Gmail
    const response = await gmail.users.messages.list({
      auth: oauth2Client,
      userId: 'me',
      q: `to:${process.env.SUPPORT_EMAIL} is:unread`,
      maxResults: 10
    });

    const messages = response.data.messages || [];
    const processedEmails: any[] = [];

    for (const message of messages) {
      if (!message.id) continue;

      // Check if email is already processed
      const existingEmail = await EmailModel.getProcessedEmailByMessageId(message.id, false);
      if (existingEmail) continue;

      // Get email details
      const emailData = await gmail.users.messages.get({
        auth: oauth2Client,
        userId: 'me',
        id: message.id
      });

      if (!emailData.data || !emailData.data.payload) continue;

      // Parse email using the new utility
      const parsedEmail = parseGmailMessage(emailData.data);

      // Download attachments if any
      for (let i = 0; i < parsedEmail.attachments.length; i++) {
        const attachment = parsedEmail.attachments[i];
        if (attachment.attachmentId) {
          try {
            const attachmentData = await downloadAttachment(
              gmail,
              oauth2Client,
              parsedEmail.messageId,
              attachment.attachmentId
            );
            parsedEmail.attachments[i].data = attachmentData;
          } catch (attachmentError) {
            logger.error(`Failed to download attachment ${attachment.filename}:`, attachmentError);
          }
        }
      }

      // Track the email in our database
      const processedEmail = await EmailModel.createProcessedEmail(parsedEmail);
      processedEmails.push(processedEmail);

      // Send notification to admin about new email
      await notificationService.notifyAdminOfNewEmail(
        processedEmail.id,
        parsedEmail.fromEmail,
        parsedEmail.subject,
        parsedEmail.receivedAt
      );

      // Mark the email as read in Gmail
      await gmail.users.messages.modify({
        auth: oauth2Client,
        userId: 'me',
        id: message.id,
        requestBody: {
          removeLabelIds: ['UNREAD']
        }
      });
    }

    // Log completion
    logger.info('Email synchronization completed successfully', {
      userId: req.user?.id,
      emailCount: processedEmails.length,
      timestamp: new Date().toISOString()
    });

    res.json({
      message: `Synced ${processedEmails.length} new emails`,
      emails: processedEmails
    });
  } catch (error) {
    logger.error('Email sync error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all processed emails
export const getProcessedEmails = async (req: Request, res: Response) => {
  try {
    logger.info('Retrieving all processed emails', {
      userId: req.user?.id,
      timestamp: new Date().toISOString()
    });

    const emails = await EmailModel.getAllProcessedEmails();
    res.json(emails);
  } catch (error) {
    logger.error('Get processed emails error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get processed email by ID
export const getProcessedEmailById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    logger.info(`Retrieving processed email by ID: ${id}`, {
      userId: req.user?.id,
      emailId: id,
      timestamp: new Date().toISOString()
    });

    const email = await EmailModel.getProcessedEmailById(parseInt(id));

    if (!email) {
      return res.status(404).json({ message: 'Email not found' });
    }

    res.json(email);
  } catch (error) {
    logger.error('Get processed email error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get emails by thread ID
export const getEmailsByThreadId = async (req: Request, res: Response) => {
  try {
    const { threadId } = req.params;

    logger.info(`Retrieving emails by thread ID: ${threadId}`, {
      userId: req.user?.id,
      threadId,
      timestamp: new Date().toISOString()
    });

    // Check if we have a refresh token
    if (!process.env.GMAIL_REFRESH_TOKEN) {
      return res.status(400).json({ message: 'Gmail authentication required' });
    }

    // Get thread from Gmail
    const response = await gmail.users.threads.get({
      auth: oauth2Client,
      userId: 'me',
      id: threadId
    });

    if (!response.data || !response.data.messages) {
      return res.status(404).json({ message: 'Thread not found' });
    }

    // Process messages in the thread
    const messages = response.data.messages.map(message => {
      // Parse email using the new utility
      try {
        const parsedEmail = parseGmailMessage(message);
        return {
          id: parsedEmail.messageId,
          threadId: parsedEmail.threadId,
          snippet: message.snippet,
          subject: parsedEmail.subject,
          from: parsedEmail.headers.from,
          to: parsedEmail.headers.to,
          date: parsedEmail.headers.date,
          body: parsedEmail.textBody,
          htmlBody: parsedEmail.htmlBody,
          fromEmail: parsedEmail.fromEmail,
          fromName: parsedEmail.fromName,
          receivedAt: parsedEmail.receivedAt,
          language: parsedEmail.language,
          hasAttachments: parsedEmail.attachments.length > 0,
          attachmentCount: parsedEmail.attachments.length
        };
      } catch (parseError) {
        logger.error(`Error parsing message ${message.id}:`, parseError);
        // Fallback to basic extraction if parsing fails
        const headers = message.payload?.headers || [];
        const subject = headers.find(h => h.name === 'Subject')?.value || 'No Subject';
        const from = headers.find(h => h.name === 'From')?.value || '';
        const to = headers.find(h => h.name === 'To')?.value || '';
        const date = headers.find(h => h.name === 'Date')?.value || '';

        return {
          id: message.id,
          threadId: message.threadId,
          snippet: message.snippet,
          subject,
          from,
          to,
          date
        };
      }
    });

    // Get processed emails from database for this thread
    const processedEmails = await EmailModel.getProcessedEmailsByThreadId(threadId);

    res.json({
      threadId,
      messages,
      processedEmails
    });
  } catch (error) {
    logger.error('Get emails by thread error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Process Gmail push notification webhook
export const handleGmailPushNotification = async (req: Request, res: Response) => {
  try {
    logger.info('Received Gmail push notification');

    // Verify the request is from Google
    const googlePubSubToken = process.env.GOOGLE_PUBSUB_VERIFICATION_TOKEN;
    if (googlePubSubToken) {
      const requestToken = req.query.token || req.headers['x-goog-pubsub-verification-token'];
      if (requestToken !== googlePubSubToken) {
        logger.warn('Invalid verification token in Gmail push notification');
        return res.status(403).json({ message: 'Invalid verification token' });
      }
    }

    // Extract the message data
    if (!req.body || !req.body.message || !req.body.message.data) {
      logger.warn('Invalid push notification format');
      return res.status(400).json({ message: 'Invalid push notification format' });
    }

    // Decode the base64 data
    const data = JSON.parse(
      Buffer.from(req.body.message.data, 'base64').toString('utf-8')
    );

    // Check if this is an email notification
    if (data.emailAddress && data.historyId) {
      logger.info(`Processing email notification for ${data.emailAddress} with historyId ${data.historyId}`);

      // Check if we have a refresh token
      if (!process.env.GMAIL_REFRESH_TOKEN) {
        logger.error('Gmail authentication required for webhook processing');
        return res.status(400).json({ message: 'Gmail authentication required' });
      }

      // Get history from Gmail
      const historyResponse = await gmail.users.history.list({
        auth: oauth2Client,
        userId: 'me',
        startHistoryId: data.historyId,
        historyTypes: ['messageAdded']
      });

      if (historyResponse.data.history && historyResponse.data.history.length > 0) {
        // Process each history record
        for (const history of historyResponse.data.history) {
          if (history.messagesAdded) {
            for (const messageAdded of history.messagesAdded) {
              const message = messageAdded.message;
              if (message && message.id) {
                // Check if this is an incoming email to our support address
                const emailData = await gmail.users.messages.get({
                  auth: oauth2Client,
                  userId: 'me',
                  id: message.id
                });

                if (!emailData.data || !emailData.data.payload) continue;

                const headers = emailData.data.payload.headers || [];
                const to = headers.find(h => h.name === 'To')?.value || '';

                // Only process emails sent to our support email
                if (to.includes(process.env.SUPPORT_EMAIL || '')) {
                  try {
                    // Parse email using the new utility
                    const parsedEmail = parseGmailMessage(emailData.data);

                    // Check if email is already processed
                    const existingEmail = await EmailModel.getProcessedEmailByMessageId(message.id, false);

                    if (!existingEmail) {
                      // Track the email in our database
                      const processedEmail = await EmailModel.createProcessedEmail(parsedEmail);

                      // Send notification to admin about new email
                      await notificationService.notifyAdminOfNewEmail(
                        processedEmail.id,
                        parsedEmail.fromEmail,
                        parsedEmail.subject,
                        parsedEmail.receivedAt
                      );

                      logger.info(`Processed new email from webhook: ${parsedEmail.subject}`);
                    }
                  } catch (parseError) {
                    logger.error(`Error processing email ${message.id} from webhook:`, parseError);
                  }
                }
              }
            }
          }
        }
      }
    }

    // Acknowledge the webhook
    res.status(200).json({ status: 'success' });
  } catch (error) {
    logger.error('Gmail webhook error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Set up Gmail push notifications
export const setupGmailPushNotifications = async (req: Request, res: Response) => {
  try {
    logger.info('Setting up Gmail push notifications', {
      userId: req.user?.id,
      timestamp: new Date().toISOString()
    });
    // Check if we have a refresh token
    if (!process.env.GMAIL_REFRESH_TOKEN) {
      return res.status(400).json({ message: 'Gmail authentication required' });
    }

    // Generate a verification token if not provided
    let verificationToken = process.env.GOOGLE_PUBSUB_VERIFICATION_TOKEN;
    if (!verificationToken) {
      verificationToken = crypto.randomBytes(32).toString('hex');
      logger.info(`Generated new verification token: ${verificationToken}`);
      logger.info('Please add this token to your environment variables as GOOGLE_PUBSUB_VERIFICATION_TOKEN');
    }

    // Set up push notifications
    const response = await gmail.users.watch({
      auth: oauth2Client,
      userId: 'me',
      requestBody: {
        topicName: process.env.GOOGLE_PUBSUB_TOPIC || 'projects/your-project-id/topics/gmail-notifications',
        labelIds: ['INBOX'],
        labelFilterAction: 'include'
      }
    });

    res.json({
      message: 'Gmail push notifications set up successfully',
      historyId: response.data.historyId,
      expiration: response.data.expiration,
      verificationToken
    });
  } catch (error) {
    logger.error('Setup Gmail push notifications error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


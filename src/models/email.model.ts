import { prisma } from '../index';
import { logger } from '../utils/logger';
import { ParsedEmail } from '../utils/email-parser';

/**
 * Create a new processed email record
 * @param emailData Parsed email data
 * @returns Created processed email record
 */
export async function createProcessedEmail(emailData: ParsedEmail) {
  try {
    const {
      messageId,
      threadId,
      fromEmail,
      subject,
      receivedAt,
      language,
    } = emailData;

    // Check if email already exists
    const existingEmail = await prisma.processedEmail.findUnique({
      where: { messageId }
    });

    if (existingEmail) {
      logger.info(`Email with message ID ${messageId} already processed`);
      return existingEmail;
    }

    // Create new processed email record
    const processedEmail = await prisma.processedEmail.create({
      data: {
        messageId,
        threadId,
        fromEmail,
        subject,
        receivedAt,
        language,
        status: 'pending'
      }
    });

    logger.info(`Created processed email record for message ID ${messageId}`);
    return processedEmail;
  } catch (error) {
    logger.error('Error creating processed email record:', error);
    throw error;
  }
}

/**
 * Get all processed emails
 * @param includeResponse Whether to include response data
 * @returns Array of processed emails
 */
export async function getAllProcessedEmails(includeResponse = true) {
  try {
    const emails = await prisma.processedEmail.findMany({
      orderBy: { receivedAt: 'desc' },
      include: includeResponse ? { response: true } : undefined
    });

    return emails;
  } catch (error) {
    logger.error('Error getting all processed emails:', error);
    throw error;
  }
}

/**
 * Get processed email by ID
 * @param id Email ID
 * @param includeResponse Whether to include response data
 * @returns Processed email record
 */
export async function getProcessedEmailById(id: number, includeResponse = true) {
  try {
    const email = await prisma.processedEmail.findUnique({
      where: { id },
      include: includeResponse ? { response: true } : undefined
    });

    return email;
  } catch (error) {
    logger.error(`Error getting processed email with ID ${id}:`, error);
    throw error;
  }
}

/**
 * Get processed email by message ID
 * @param messageId Gmail message ID
 * @param includeResponse Whether to include response data
 * @returns Processed email record
 */
export async function getProcessedEmailByMessageId(messageId: string, includeResponse = true) {
  try {
    const email = await prisma.processedEmail.findUnique({
      where: { messageId },
      include: includeResponse ? { response: true } : undefined
    });

    return email;
  } catch (error) {
    logger.error(`Error getting processed email with message ID ${messageId}:`, error);
    throw error;
  }
}

/**
 * Update processed email status
 * @param id Email ID
 * @param status New status
 * @param responseId Optional response ID
 * @returns Updated processed email record
 */
export async function updateProcessedEmailStatus(id: number, status: string, responseId?: number) {
  try {
    const updateData: any = {
      status,
      updatedAt: new Date()
    };

    if (responseId) {
      updateData.responseId = responseId;
    }

    const email = await prisma.processedEmail.update({
      where: { id },
      data: updateData
    });

    logger.info(`Updated processed email ${id} status to ${status}`);
    return email;
  } catch (error) {
    logger.error(`Error updating processed email status for ID ${id}:`, error);
    throw error;
  }
}

/**
 * Get processed emails by thread ID
 * @param threadId Gmail thread ID
 * @param includeResponse Whether to include response data
 * @returns Array of processed emails
 */
export async function getProcessedEmailsByThreadId(threadId: string, includeResponse = true) {
  try {
    const emails = await prisma.processedEmail.findMany({
      where: { threadId },
      orderBy: { receivedAt: 'asc' },
      include: includeResponse ? { response: true } : undefined
    });

    return emails;
  } catch (error) {
    logger.error(`Error getting processed emails for thread ID ${threadId}:`, error);
    throw error;
  }
}

/**
 * Get pending emails
 * @param includeResponse Whether to include response data
 * @returns Array of pending emails
 */
export async function getPendingEmails(includeResponse = true) {
  try {
    const emails = await prisma.processedEmail.findMany({
      where: { status: 'pending' },
      orderBy: { receivedAt: 'asc' },
      include: includeResponse ? { response: true } : undefined
    });

    return emails;
  } catch (error) {
    logger.error('Error getting pending emails:', error);
    throw error;
  }
}

/**
 * Get emails by status
 * @param status Email status
 * @param includeResponse Whether to include response data
 * @returns Array of emails with the specified status
 */
export async function getEmailsByStatus(status: string, includeResponse = true) {
  try {
    const emails = await prisma.processedEmail.findMany({
      where: { status },
      orderBy: { receivedAt: 'asc' },
      include: includeResponse ? { response: true } : undefined
    });

    return emails;
  } catch (error) {
    logger.error(`Error getting emails with status ${status}:`, error);
    throw error;
  }
}

// Export all functions as a module
export default {
  createProcessedEmail,
  getAllProcessedEmails,
  getProcessedEmailById,
  getProcessedEmailByMessageId,
  updateProcessedEmailStatus,
  getProcessedEmailsByThreadId,
  getPendingEmails,
  getEmailsByStatus
};

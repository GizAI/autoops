const db = require('../config/database');
const logger = require('../utils/logger');

// Create processed_emails table if it doesn't exist
async function createTable() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS processed_emails (
        id SERIAL PRIMARY KEY,
        message_id VARCHAR(255) UNIQUE NOT NULL,
        thread_id VARCHAR(255) NOT NULL,
        from_email VARCHAR(255) NOT NULL,
        subject TEXT NOT NULL,
        received_at TIMESTAMP NOT NULL,
        language VARCHAR(50),
        status VARCHAR(50) DEFAULT 'pending', -- pending, processed, failed
        response_id INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    logger.info('Processed emails table created or already exists');
  } catch (error) {
    logger.error('Error creating processed emails table:', error);
    throw error;
  }
}

// Get all processed emails
async function getAllProcessedEmails() {
  try {
    const result = await db.query('SELECT * FROM processed_emails ORDER BY received_at DESC');
    return result.rows;
  } catch (error) {
    logger.error('Error getting all processed emails:', error);
    throw error;
  }
}

// Get processed email by ID
async function getProcessedEmailById(id) {
  try {
    const result = await db.query('SELECT * FROM processed_emails WHERE id = $1', [id]);
    return result.rows[0];
  } catch (error) {
    logger.error(`Error getting processed email with ID ${id}:`, error);
    throw error;
  }
}

// Get processed email by message ID
async function getProcessedEmailByMessageId(messageId) {
  try {
    const result = await db.query('SELECT * FROM processed_emails WHERE message_id = $1', [messageId]);
    return result.rows[0];
  } catch (error) {
    logger.error(`Error getting processed email with message ID ${messageId}:`, error);
    throw error;
  }
}

// Track a processed email
async function trackProcessedEmail(email) {
  try {
    const {
      message_id,
      thread_id,
      from_email,
      subject,
      received_at,
      language,
      status = 'pending'
    } = email;

    const result = await db.query(
      `INSERT INTO processed_emails (
        message_id, thread_id, from_email, subject, received_at, language, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [message_id, thread_id, from_email, subject, received_at, language, status]
    );

    return result.rows[0];
  } catch (error) {
    logger.error('Error tracking processed email:', error);
    throw error;
  }
}

// Update processed email status
async function updateProcessedEmailStatus(id, status, responseId = null) {
  try {
    let query = 'UPDATE processed_emails SET status = $1, updated_at = CURRENT_TIMESTAMP';
    const params = [status];

    if (responseId) {
      query += ', response_id = $2 WHERE id = $3 RETURNING *';
      params.push(responseId, id);
    } else {
      query += ' WHERE id = $2 RETURNING *';
      params.push(id);
    }

    const result = await db.query(query, params);
    return result.rows[0];
  } catch (error) {
    logger.error(`Error updating processed email status for ID ${id}:`, error);
    throw error;
  }
}

// Get processed emails by thread ID
async function getProcessedEmailsByThreadId(threadId) {
  try {
    const result = await db.query(
      'SELECT * FROM processed_emails WHERE thread_id = $1 ORDER BY received_at ASC',
      [threadId]
    );
    return result.rows;
  } catch (error) {
    logger.error(`Error getting processed emails for thread ID ${threadId}:`, error);
    throw error;
  }
}

// Get pending emails
async function getPendingEmails() {
  try {
    const result = await db.query("SELECT * FROM processed_emails WHERE status = 'pending' ORDER BY received_at ASC");
    return result.rows;
  } catch (error) {
    logger.error('Error getting pending emails:', error);
    throw error;
  }
}

module.exports = {
  createTable,
  getAllProcessedEmails,
  getProcessedEmailById,
  getProcessedEmailByMessageId,
  trackProcessedEmail,
  updateProcessedEmailStatus,
  getProcessedEmailsByThreadId,
  getPendingEmails
};

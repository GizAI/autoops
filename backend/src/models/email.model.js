const db = require('../config/database');
const logger = require('../utils/logger');

// Create emails table if it doesn't exist
async function createTable() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS emails (
        id SERIAL PRIMARY KEY,
        message_id VARCHAR(255) UNIQUE NOT NULL,
        thread_id VARCHAR(255) NOT NULL,
        from_email VARCHAR(255) NOT NULL,
        to_email VARCHAR(255) NOT NULL,
        subject TEXT NOT NULL,
        body TEXT NOT NULL,
        html_body TEXT,
        received_at TIMESTAMP NOT NULL,
        language VARCHAR(50),
        processed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    logger.info('Emails table created or already exists');
  } catch (error) {
    logger.error('Error creating emails table:', error);
    throw error;
  }
}

// Get all emails
async function getAllEmails() {
  try {
    const result = await db.query('SELECT * FROM emails ORDER BY received_at DESC');
    return result.rows;
  } catch (error) {
    logger.error('Error getting all emails:', error);
    throw error;
  }
}

// Get email by ID
async function getEmailById(id) {
  try {
    const result = await db.query('SELECT * FROM emails WHERE id = $1', [id]);
    return result.rows[0];
  } catch (error) {
    logger.error(`Error getting email with ID ${id}:`, error);
    throw error;
  }
}

// Get email by message ID
async function getEmailByMessageId(messageId) {
  try {
    const result = await db.query('SELECT * FROM emails WHERE message_id = $1', [messageId]);
    return result.rows[0];
  } catch (error) {
    logger.error(`Error getting email with message ID ${messageId}:`, error);
    throw error;
  }
}

// Create a new email
async function createEmail(email) {
  try {
    const {
      message_id,
      thread_id,
      from_email,
      to_email,
      subject,
      body,
      html_body,
      received_at,
      language
    } = email;

    const result = await db.query(
      `INSERT INTO emails (
        message_id, thread_id, from_email, to_email, subject, body, html_body, received_at, language
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [message_id, thread_id, from_email, to_email, subject, body, html_body, received_at, language]
    );

    return result.rows[0];
  } catch (error) {
    logger.error('Error creating email:', error);
    throw error;
  }
}

// Update email processed status
async function updateEmailProcessed(id, processed) {
  try {
    const result = await db.query(
      'UPDATE emails SET processed = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [processed, id]
    );
    return result.rows[0];
  } catch (error) {
    logger.error(`Error updating email processed status for ID ${id}:`, error);
    throw error;
  }
}

// Get emails by thread ID
async function getEmailsByThreadId(threadId) {
  try {
    const result = await db.query(
      'SELECT * FROM emails WHERE thread_id = $1 ORDER BY received_at ASC',
      [threadId]
    );
    return result.rows;
  } catch (error) {
    logger.error(`Error getting emails for thread ID ${threadId}:`, error);
    throw error;
  }
}

// Get unprocessed emails
async function getUnprocessedEmails() {
  try {
    const result = await db.query('SELECT * FROM emails WHERE processed = FALSE ORDER BY received_at ASC');
    return result.rows;
  } catch (error) {
    logger.error('Error getting unprocessed emails:', error);
    throw error;
  }
}

module.exports = {
  createTable,
  getAllEmails,
  getEmailById,
  getEmailByMessageId,
  createEmail,
  updateEmailProcessed,
  getEmailsByThreadId,
  getUnprocessedEmails
};

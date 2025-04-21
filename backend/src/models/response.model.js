const db = require('../config/database');
const logger = require('../utils/logger');

// Create responses table if it doesn't exist
async function createTable() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS responses (
        id SERIAL PRIMARY KEY,
        email_id INTEGER NOT NULL REFERENCES emails(id) ON DELETE CASCADE,
        thread_id VARCHAR(255) NOT NULL,
        subject TEXT NOT NULL,
        body TEXT NOT NULL,
        html_body TEXT,
        language VARCHAR(50) NOT NULL,
        status VARCHAR(50) NOT NULL DEFAULT 'draft', -- draft, sent, discarded
        sent_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        knowledge_sources JSONB
      )
    `);
    logger.info('Responses table created or already exists');
  } catch (error) {
    logger.error('Error creating responses table:', error);
    throw error;
  }
}

// Create a new response
async function createResponse(response) {
  try {
    const {
      email_id,
      thread_id,
      subject,
      body,
      html_body,
      language,
      knowledge_sources
    } = response;

    const result = await db.query(
      `INSERT INTO responses (
        email_id, thread_id, subject, body, html_body, language, knowledge_sources
      ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [email_id, thread_id, subject, body, html_body, language, knowledge_sources]
    );

    return result.rows[0];
  } catch (error) {
    logger.error('Error creating response:', error);
    throw error;
  }
}

// Get response by ID
async function getResponseById(id) {
  try {
    const result = await db.query('SELECT * FROM responses WHERE id = $1', [id]);
    return result.rows[0];
  } catch (error) {
    logger.error(`Error getting response with ID ${id}:`, error);
    throw error;
  }
}

// Get all responses
async function getAllResponses() {
  try {
    const result = await db.query('SELECT * FROM responses ORDER BY created_at DESC');
    return result.rows;
  } catch (error) {
    logger.error('Error getting all responses:', error);
    throw error;
  }
}

// Get responses by email ID
async function getResponsesByEmailId(emailId) {
  try {
    const result = await db.query(
      'SELECT * FROM responses WHERE email_id = $1 ORDER BY created_at DESC',
      [emailId]
    );
    return result.rows;
  } catch (error) {
    logger.error(`Error getting responses for email ID ${emailId}:`, error);
    throw error;
  }
}

// Get responses by thread ID
async function getResponsesByThreadId(threadId) {
  try {
    const result = await db.query(
      'SELECT * FROM responses WHERE thread_id = $1 ORDER BY created_at DESC',
      [threadId]
    );
    return result.rows;
  } catch (error) {
    logger.error(`Error getting responses for thread ID ${threadId}:`, error);
    throw error;
  }
}

// Update response status
async function updateResponseStatus(id, status, sentAt = null) {
  try {
    let query = 'UPDATE responses SET status = $1, updated_at = CURRENT_TIMESTAMP';
    const params = [status];
    
    if (status === 'sent' && sentAt) {
      query += ', sent_at = $2 WHERE id = $3 RETURNING *';
      params.push(sentAt, id);
    } else {
      query += ' WHERE id = $2 RETURNING *';
      params.push(id);
    }
    
    const result = await db.query(query, params);
    return result.rows[0];
  } catch (error) {
    logger.error(`Error updating response status for ID ${id}:`, error);
    throw error;
  }
}

// Update response content
async function updateResponseContent(id, content) {
  try {
    const { subject, body, html_body } = content;
    
    const result = await db.query(
      `UPDATE responses SET 
        subject = $1, 
        body = $2, 
        html_body = $3,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $4 RETURNING *`,
      [subject, body, html_body, id]
    );
    
    return result.rows[0];
  } catch (error) {
    logger.error(`Error updating response content for ID ${id}:`, error);
    throw error;
  }
}

// Get draft responses
async function getDraftResponses() {
  try {
    const result = await db.query(
      "SELECT * FROM responses WHERE status = 'draft' ORDER BY created_at ASC"
    );
    return result.rows;
  } catch (error) {
    logger.error('Error getting draft responses:', error);
    throw error;
  }
}

module.exports = {
  createTable,
  createResponse,
  getResponseById,
  getAllResponses,
  getResponsesByEmailId,
  getResponsesByThreadId,
  updateResponseStatus,
  updateResponseContent,
  getDraftResponses
};

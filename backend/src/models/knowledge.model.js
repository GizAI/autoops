const db = require('../config/database');
const logger = require('../utils/logger');

// Create knowledge_base table if it doesn't exist
async function createTable() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS knowledge_base (
        id SERIAL PRIMARY KEY,
        content TEXT NOT NULL,
        embedding VECTOR(1536),
        source VARCHAR(255) NOT NULL,
        source_id VARCHAR(255),
        category VARCHAR(100),
        language VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    logger.info('Knowledge base table created or already exists');
    
    // Create index for vector similarity search
    await db.query(`
      CREATE INDEX IF NOT EXISTS knowledge_embedding_idx ON knowledge_base USING ivfflat (embedding vector_cosine_ops)
    `);
    logger.info('Knowledge base vector index created or already exists');
  } catch (error) {
    logger.error('Error creating knowledge base table:', error);
    throw error;
  }
}

// Add a new knowledge entry
async function addKnowledge(knowledge) {
  try {
    const {
      content,
      embedding,
      source,
      source_id,
      category,
      language
    } = knowledge;

    const result = await db.query(
      `INSERT INTO knowledge_base (
        content, embedding, source, source_id, category, language
      ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [content, embedding, source, source_id, category, language]
    );

    return result.rows[0];
  } catch (error) {
    logger.error('Error adding knowledge entry:', error);
    throw error;
  }
}

// Get knowledge by ID
async function getKnowledgeById(id) {
  try {
    const result = await db.query('SELECT * FROM knowledge_base WHERE id = $1', [id]);
    return result.rows[0];
  } catch (error) {
    logger.error(`Error getting knowledge with ID ${id}:`, error);
    throw error;
  }
}

// Get all knowledge entries
async function getAllKnowledge() {
  try {
    const result = await db.query('SELECT * FROM knowledge_base ORDER BY created_at DESC');
    return result.rows;
  } catch (error) {
    logger.error('Error getting all knowledge entries:', error);
    throw error;
  }
}

// Search knowledge by vector similarity
async function searchKnowledgeByVector(embedding, limit = 5) {
  try {
    const result = await db.query(
      'SELECT *, (embedding <=> $1) AS distance FROM knowledge_base ORDER BY distance LIMIT $2',
      [embedding, limit]
    );
    return result.rows;
  } catch (error) {
    logger.error('Error searching knowledge by vector:', error);
    throw error;
  }
}

// Search knowledge by language and vector similarity
async function searchKnowledgeByLanguageAndVector(embedding, language, limit = 5) {
  try {
    const result = await db.query(
      'SELECT *, (embedding <=> $1) AS distance FROM knowledge_base WHERE language = $2 ORDER BY distance LIMIT $3',
      [embedding, language, limit]
    );
    return result.rows;
  } catch (error) {
    logger.error(`Error searching knowledge by language ${language} and vector:`, error);
    throw error;
  }
}

// Delete knowledge entry
async function deleteKnowledge(id) {
  try {
    const result = await db.query('DELETE FROM knowledge_base WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  } catch (error) {
    logger.error(`Error deleting knowledge with ID ${id}:`, error);
    throw error;
  }
}

// Update knowledge entry
async function updateKnowledge(id, knowledge) {
  try {
    const {
      content,
      embedding,
      source,
      source_id,
      category,
      language
    } = knowledge;

    const result = await db.query(
      `UPDATE knowledge_base SET 
        content = $1, 
        embedding = $2, 
        source = $3, 
        source_id = $4, 
        category = $5, 
        language = $6,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $7 RETURNING *`,
      [content, embedding, source, source_id, category, language, id]
    );

    return result.rows[0];
  } catch (error) {
    logger.error(`Error updating knowledge with ID ${id}:`, error);
    throw error;
  }
}

module.exports = {
  createTable,
  addKnowledge,
  getKnowledgeById,
  getAllKnowledge,
  searchKnowledgeByVector,
  searchKnowledgeByLanguageAndVector,
  deleteKnowledge,
  updateKnowledge
};

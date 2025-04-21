const { Pool } = require('pg');
const pgvector = require('pgvector/pg');
const logger = require('../utils/logger');

// Load environment variables
require('dotenv').config();

// Register pgvector with pg
pgvector.registerType({ pg: Pool });

// Create a new database pool
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Test the connection
pool.connect()
  .then(() => {
    logger.info('Connected to PostgreSQL database');
    setupVectorExtension();
  })
  .catch((err) => {
    logger.error('Error connecting to PostgreSQL database:', err);
  });

// Setup pgvector extension if not already installed
async function setupVectorExtension() {
  const client = await pool.connect();
  try {
    // Check if pgvector extension exists
    const extensionExists = await client.query(
      "SELECT EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'vector')"
    );
    
    if (!extensionExists.rows[0].exists) {
      logger.info('Installing pgvector extension...');
      await client.query('CREATE EXTENSION IF NOT EXISTS vector');
      logger.info('pgvector extension installed successfully');
    } else {
      logger.info('pgvector extension already installed');
    }
  } catch (err) {
    logger.error('Error setting up pgvector extension:', err);
  } finally {
    client.release();
  }
}

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};

require('dotenv').config(); // Carrega as variáveis de ambiente 
const { Pool } = require('pg');
const logger = require('../utils/logger');


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? {rejectUnauthorized: false } : undefined,
});


pool.connect()
  .then(client => {
    logger.info('Successfully connected to the database via DATABASE_URL!!');
    client.release();
  })
  .catch(err => {
    logger.error('Error connecting to the database via DATABASE_URL:', err.stack);
  });

module.exports = {
  query: (text, params) => pool.query(text, params),
  getClient: () => pool.connect(),
};
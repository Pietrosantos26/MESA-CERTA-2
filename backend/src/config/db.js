const { Pool } = require('pg');
const logger = require('../utils/logger');

// Create a connection pool
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

// Test database connection
pool.connect()
  .then(client => {
    logger.info('Successfully connected to PostgreSQL database');
    client.release();
  })
  .catch(err => {
    logger.error('Error connecting to database:', err);
  });

module.exports = {
  query: (text, params) => pool.query(text, params),
  getClient: () => pool.connect(),
};
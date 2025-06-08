require('dotenv').config();
const { Pool } = require('pg');
const logger = require('../utils/logger');

// Configuração da conexão com o banco de dados.
// A principal mudança é a adição da configuração de SSL.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    // Exige SSL, mas não rejeita conexões de servidores com certificados autoassinados.
    // Isso é padrão e necessário para se conectar a serviços como Neon e Heroku.
    rejectUnauthorized: false,
  },
});

// Testa a conexão ao iniciar
pool.connect()
  .then(client => {
    logger.info('Successfully connected to the database via DATABASE_URL!');
    client.release();
  })
  .catch(err => {
    logger.error('Error connecting to the database via DATABASE_URL:', err.stack);
  });

module.exports = {
  query: (text, params) => pool.query(text, params),
  getClient: () => pool.connect(),
};

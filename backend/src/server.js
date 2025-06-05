require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { setupSwagger } = require('./config/swagger');
const logger = require('./utils/logger');
const { notFoundHandler, errorHandler } = require('./middleware/errorMiddleware');
const routes = require('./routes');
const { Pool } = require('pg');

// Initialize express app
const app = express();

app.use(cors());

// Set port
const PORT = process.env.PORT || 3001;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // Necessário para Supabase
});

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(morgan('dev', { stream: { write: message => logger.info(message.trim()) } })); // Logging

// Setup Swagger
setupSwagger(app);

// API Routes
app.use('/api', routes);

// Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

pool.connect()
  .then(() => console.log("✅ Conectado ao banco de dados Supabase!"))
  .catch(err => console.error("❌ Erro ao conectar ao banco:", err));

// Start server
app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

module.exports = pool;

module.exports = app; // For testing
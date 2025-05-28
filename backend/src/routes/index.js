const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const itemRoutes = require('./itemRoutes');

// Welcome route
router.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to the Express MVP API',
    version: '1.0.0'
  });
});

// Routes
router.use('/users', userRoutes);
router.use('/items', itemRoutes);

module.exports = router;
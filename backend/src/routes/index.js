const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const itemRoutes = require('./itemRoutes');
const restaurantRoutes = require('./restaurantRoutes'); // Adicione esta linha
const reservationRoutes = require('./reservationRoutes');

router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Express MVP API',
    version: '1.0.0'
  });
});

// Routes
router.use('/users', userRoutes);
router.use('/items', itemRoutes);
router.use('/restaurants', restaurantRoutes); // Adicione esta linha
router.use('/reservations', reservationRoutes); // Adicione esta linha

module.exports = router;
const express = require('express');
const router = express.Router();
const restaurantPresenter = require('../presenters/restaurantPresenter');

/**
 * 
 * /api/restaurants:
 * get:
 * summary: Get all restaurants
 * tags: [Restaurants]
 * responses:
 * 200:
 * description: List of all restaurants
 */
router.get('/', async (req, res) => {
  const result = await restaurantPresenter.getAllRestaurants();
  res.status(result.success ? 200 : (result.status || 500)).json(result);
});

/**
 * 
 * /api/restaurants/{id}:
 * get:
 * summary: Get a restaurant by ID
 * tags: [Restaurants]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: integer
 * responses:
 * 200:
 * description: Restaurant details
 * 404:
 * description: Restaurant not found
 */
router.get('/:id', async (req, res) => {
  const result = await restaurantPresenter.getRestaurantById(parseInt(req.params.id));
  res.status(result.success ? 200 : (result.status || 500)).json(result);
});

module.exports = router;

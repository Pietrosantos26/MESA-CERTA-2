const restaurantModel = require('../models/restaurantModel');
const { formatSuccess, formatError } = require('../utils/responseFormatter');

class RestaurantPresenter {
  /**
   * Obter todos os restaurantes
   */
  async getAllRestaurants() {
    try {
      const restaurants = await restaurantModel.findAll();
      return formatSuccess({ restaurants }, 'Restaurants retrieved successfully');
    } catch (error) {
      return formatError('Error getting restaurants: ' + error.message);
    }
  }

  /**
   * Obter um restaurante por ID
   * @param {Number} id - ID do restaurante
   */
  async getRestaurantById(id) {
    try {
      const restaurant = await restaurantModel.findById(id);
      if (!restaurant) {
        return formatError('Restaurant not found', 404);
      }
      return formatSuccess({ restaurant }, 'Restaurant retrieved successfully');
    } catch (error) {
      return formatError('Error getting restaurant: ' + error.message);
    }
  }
}

module.exports = new RestaurantPresenter();

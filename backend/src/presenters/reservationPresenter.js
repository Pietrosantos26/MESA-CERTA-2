const db = require('../config/db');

class RestaurantModel {
  /**
   * Encontrar todos os restaurantes
   */
  async findAll() {
    const query = 'SELECT * FROM restaurants ORDER BY rating DESC';
    const result = await db.query(query);
    return result.rows;
  }

  /**
   * Encontrar restaurante por ID
   * @param {Number} id - ID do restaurante
   */
  async findById(id) {
    const query = 'SELECT * FROM restaurants WHERE id = $1';
    const result = await db.query(query, [id]);
    return result.rows[0];
  }
}

module.exports = new RestaurantModel();

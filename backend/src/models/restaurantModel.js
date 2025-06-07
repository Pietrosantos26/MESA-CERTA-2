const db = require('../config/db');

class RestaurantModel {
  /**
   * Encontrar todos os restaurantes com colunas em camelCase
   */
  async findAll() {
    const query = `
      SELECT
        id,
        name,
        description,
        address,
        image_url AS "imageUrl",
        cover_image_url AS "coverImageUrl",
        cuisine,
        price_range AS "priceRange",
        rating,
        total_reviews AS "totalReviews",
        opening_hours AS "openingHours",
        features
      FROM restaurants
      ORDER BY rating DESC
    `;
    const result = await db.query(query);
    return result.rows;
  }

  /**
   * Encontrar restaurante por ID com colunas em camelCase
   * @param {Number} id - ID do restaurante
   */
  async findById(id) {
    const query = `
      SELECT
        id,
        name,
        description,
        address,
        image_url AS "imageUrl",
        cover_image_url AS "coverImageUrl",
        cuisine,
        price_range AS "priceRange",
        rating,
        total_reviews AS "totalReviews",
        opening_hours AS "openingHours",
        features
      FROM restaurants
      WHERE id = $1
    `;
    const result = await db.query(query, [id]);
    return result.rows[0];
  }
}

module.exports = new RestaurantModel();

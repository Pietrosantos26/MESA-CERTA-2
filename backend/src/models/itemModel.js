const db = require('../config/db');

class ItemModel {
  /**
   * Create a new item
   * @param {Object} itemData - Item data (title, description, user_id)
   * @returns {Promise<Object>} Created item
   */
  async create(itemData) {
    const { title, description, user_id } = itemData;
    
    const query = `
      INSERT INTO items (title, description, user_id)
      VALUES ($1, $2, $3)
      RETURNING id, title, description, user_id, created_at
    `;
    
    const result = await db.query(query, [title, description, user_id]);
    return result.rows[0];
  }
  
  /**
   * Find item by ID
   * @param {Number} id - Item ID
   * @returns {Promise<Object>} Item object
   */
  async findById(id) {
    const query = `
      SELECT id, title, description, user_id, created_at, updated_at
      FROM items
      WHERE id = $1
    `;
    
    const result = await db.query(query, [id]);
    return result.rows[0];
  }
  
  /**
   * Get all items by user ID
   * @param {Number} userId - User ID
   * @returns {Promise<Array>} Array of items
   */
  async findByUserId(userId) {
    const query = `
      SELECT id, title, description, created_at, updated_at
      FROM items
      WHERE user_id = $1
      ORDER BY created_at DESC
    `;
    
    const result = await db.query(query, [userId]);
    return result.rows;
  }
  
  /**
   * Update item
   * @param {Number} id - Item ID
   * @param {Object} itemData - Item data to update
   * @returns {Promise<Object>} Updated item
   */
  async update(id, userId, itemData) {
    const { title, description } = itemData;
    
    const query = `
      UPDATE items
      SET title = $1, description = $2, updated_at = NOW()
      WHERE id = $3 AND user_id = $4
      RETURNING id, title, description, user_id, created_at, updated_at
    `;
    
    const result = await db.query(query, [title, description, id, userId]);
    return result.rows[0];
  }
  
  /**
   * Delete item
   * @param {Number} id - Item ID
   * @param {Number} userId - User ID (for authorization)
   * @returns {Promise<Boolean>} Success status
   */
  async delete(id, userId) {
    const query = `
      DELETE FROM items
      WHERE id = $1 AND user_id = $2
    `;
    
    const result = await db.query(query, [id, userId]);
    return result.rowCount > 0;
  }
}

module.exports = new ItemModel();
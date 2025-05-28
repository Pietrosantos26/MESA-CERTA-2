const db = require('../config/db');
const bcrypt = require('bcrypt');

class UserModel {
  /**
   * Create a new user
   * @param {Object} userData - User data (username, email, password)
   * @returns {Promise<Object>} Created user
   */
  async create(userData) {
    const { username, email, password } = userData;
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const query = `
      INSERT INTO users (username, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, username, email, created_at
    `;
    
    const result = await db.query(query, [username, email, hashedPassword]);
    return result.rows[0];
  }
  
  /**
   * Find user by ID
   * @param {Number} id - User ID
   * @returns {Promise<Object>} User object
   */
  async findById(id) {
    const query = `
      SELECT id, username, email, created_at
      FROM users
      WHERE id = $1
    `;
    
    const result = await db.query(query, [id]);
    return result.rows[0];
  }
  
  /**
   * Find user by email
   * @param {String} email - User email
   * @returns {Promise<Object>} User object with password
   */
  async findByEmail(email) {
    const query = `
      SELECT id, username, email, password, created_at
      FROM users
      WHERE email = $1
    `;
    
    const result = await db.query(query, [email]);
    return result.rows[0];
  }
  
  /**
   * Get all users
   * @returns {Promise<Array>} Array of users
   */
  async findAll() {
    const query = `
      SELECT id, username, email, created_at
      FROM users
      ORDER BY created_at DESC
    `;
    
    const result = await db.query(query);
    return result.rows;
  }
  
  /**
   * Update user
   * @param {Number} id - User ID
   * @param {Object} userData - User data to update
   * @returns {Promise<Object>} Updated user
   */
  async update(id, userData) {
    const { username, email } = userData;
    
    const query = `
      UPDATE users
      SET username = $1, email = $2, updated_at = NOW()
      WHERE id = $3
      RETURNING id, username, email, created_at, updated_at
    `;
    
    const result = await db.query(query, [username, email, id]);
    return result.rows[0];
  }
  
  /**
   * Delete user
   * @param {Number} id - User ID
   * @returns {Promise<Boolean>} Success status
   */
  async delete(id) {
    const query = `
      DELETE FROM users
      WHERE id = $1
    `;
    
    const result = await db.query(query, [id]);
    return result.rowCount > 0;
  }
}

module.exports = new UserModel();
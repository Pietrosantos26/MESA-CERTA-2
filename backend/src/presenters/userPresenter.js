const userModel = require('../models/userModel');
const { formatSuccess, formatError } = require('../utils/responseFormatter');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class UserPresenter {
  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @returns {Promise<Object>} Response with user data and token
   */
  async register(userData) {
    try {
      // Check if user already exists
      const existingUser = await userModel.findByEmail(userData.email);
      if (existingUser) {
        return formatError('User already exists', 400);
      }
      
      // Create user
      const user = await userModel.create(userData);
      
      // Generate JWT token
      const token = this.generateToken(user.id);
      
      return formatSuccess({ user, token }, 'User registered successfully');
    } catch (error) {
      return formatError('Error registering user: ' + error.message);
    }
  }
  
  /**
   * Login user
   * @param {String} email - User email
   * @param {String} password - User password
   * @returns {Promise<Object>} Response with user data and token
   */
  async login(email, password) {
    try {
      // Find user by email
      const user = await userModel.findByEmail(email);
      if (!user) {
        return formatError('Invalid credentials', 401);
      }
      
      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return formatError('Invalid credentials', 401);
      }
      
      // Generate JWT token
      const token = this.generateToken(user.id);
      
      // Remove password from response
      const { password: _, ...userWithoutPassword } = user;
      
      return formatSuccess({ 
        user: userWithoutPassword, 
        token 
      }, 'Login successful');
    } catch (error) {
      return formatError('Error logging in: ' + error.message);
    }
  }
  
  /**
   * Get user profile
   * @param {Number} userId - User ID
   * @returns {Promise<Object>} Response with user data
   */
  async getProfile(userId) {
    try {
      const user = await userModel.findById(userId);
      if (!user) {
        return formatError('User not found', 404);
      }
      
      return formatSuccess({ user }, 'User profile retrieved');
    } catch (error) {
      return formatError('Error getting user profile: ' + error.message);
    }
  }
  
  /**
   * Update user profile
   * @param {Number} userId - User ID
   * @param {Object} userData - User data to update
   * @returns {Promise<Object>} Response with updated user data
   */
  async updateProfile(userId, userData) {
    try {
      const { username, email } = userData;
      // Garante que estamos passando apenas os campos permitidos
      const filteredUserData = { username, email };

      const updatedUser = await userModel.update(userId, filteredUserData);
      if (!updatedUser) {
        return formatError('User not found', 404);
      }
      return formatSuccess({ user: updatedUser }, 'User profile updated');
    } catch (error) {
        // Trata erro de email duplicado
        if (error.code === '23505') {
            return formatError('Email already in use.', 400);
        }
        return formatError('Error updating user profile: ' + error.message);
    }
  }
  
  /**
   * Delete user
   * @param {Number} userId - User ID
   * @returns {Promise<Object>} Response with success message
   */
  async deleteUser(userId) {
    try {
      const deleted = await userModel.delete(userId);
      if (!deleted) {
        return formatError('User not found', 404);
      }
      return formatSuccess(null, 'User deleted successfully');
    } catch (error) {
      return formatError('Error deleting user: ' + error.message);
    }
  }
  
  /**
   * Generate JWT token
   * @param {Number} userId - User ID
   * @returns {String} JWT token
   */
  generateToken(userId) {
    return jwt.sign(
      { user: { id: userId } },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
  }
}

module.exports = new UserPresenter();
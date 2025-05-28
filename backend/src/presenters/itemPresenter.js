const itemModel = require('../models/itemModel');
const { formatSuccess, formatError } = require('../utils/responseFormatter');

class ItemPresenter {
  /**
   * Create a new item
   * @param {Object} itemData - Item data including user_id
   * @returns {Promise<Object>} Response with item data
   */
  async createItem(itemData) {
    try {
      const item = await itemModel.create(itemData);
      return formatSuccess({ item }, 'Item created successfully');
    } catch (error) {
      return formatError('Error creating item: ' + error.message);
    }
  }
  
  /**
   * Get item by ID
   * @param {Number} itemId - Item ID
   * @param {Number} userId - User ID for authorization
   * @returns {Promise<Object>} Response with item data
   */
  async getItemById(itemId, userId) {
    try {
      const item = await itemModel.findById(itemId);
      
      if (!item) {
        return formatError('Item not found', 404);
      }
      
      // Check if item belongs to user
      if (item.user_id !== userId) {
        return formatError('Not authorized to access this item', 403);
      }
      
      return formatSuccess({ item }, 'Item retrieved');
    } catch (error) {
      return formatError('Error getting item: ' + error.message);
    }
  }
  
  /**
   * Get all items for a user
   * @param {Number} userId - User ID
   * @returns {Promise<Object>} Response with array of items
   */
  async getUserItems(userId) {
    try {
      const items = await itemModel.findByUserId(userId);
      return formatSuccess({ items }, 'Items retrieved successfully');
    } catch (error) {
      return formatError('Error getting items: ' + error.message);
    }
  }
  
  /**
   * Update an item
   * @param {Number} itemId - Item ID
   * @param {Number} userId - User ID for authorization
   * @param {Object} itemData - Item data to update
   * @returns {Promise<Object>} Response with updated item
   */
  async updateItem(itemId, userId, itemData) {
    try {
      // First check if item exists and belongs to user
      const existingItem = await itemModel.findById(itemId);
      
      if (!existingItem) {
        return formatError('Item not found', 404);
      }
      
      if (existingItem.user_id !== userId) {
        return formatError('Not authorized to update this item', 403);
      }
      
      const updatedItem = await itemModel.update(itemId, userId, itemData);
      
      return formatSuccess({ item: updatedItem }, 'Item updated successfully');
    } catch (error) {
      return formatError('Error updating item: ' + error.message);
    }
  }
  
  /**
   * Delete an item
   * @param {Number} itemId - Item ID
   * @param {Number} userId - User ID for authorization
   * @returns {Promise<Object>} Response with success message
   */
  async deleteItem(itemId, userId) {
    try {
      // Check if item exists and belongs to user first
      const existingItem = await itemModel.findById(itemId);
      
      if (!existingItem) {
        return formatError('Item not found', 404);
      }
      
      if (existingItem.user_id !== userId) {
        return formatError('Not authorized to delete this item', 403);
      }
      
      const deleted = await itemModel.delete(itemId, userId);
      
      if (!deleted) {
        return formatError('Failed to delete item', 500);
      }
      
      return formatSuccess(null, 'Item deleted successfully');
    } catch (error) {
      return formatError('Error deleting item: ' + error.message);
    }
  }
}

module.exports = new ItemPresenter();
/**
 * Format success response
 * @param {Object} data - The data to be sent
 * @param {String} message - Success message
 * @returns {Object} Formatted response object
 */
const formatSuccess = (data, message = 'Operation successful') => {
  return {
    success: true,
    message,
    data
  };
};

/**
 * Format error response
 * @param {String} message - Error message
 * @param {Number} status - HTTP status code
 * @param {Object} errors - Additional error details
 * @returns {Object} Formatted error object
 */
const formatError = (message = 'An error occurred', status = 500, errors = null) => {
  return {
    success: false,
    message,
    status,
    errors
  };
};

module.exports = {
  formatSuccess,
  formatError
};
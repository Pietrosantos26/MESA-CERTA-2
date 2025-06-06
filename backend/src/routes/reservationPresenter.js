const reservationModel = require('../models/reservationModel');
const { formatSuccess, formatError } = require('../utils/responseFormatter');

class ReservationPresenter {
  /**
   * Criar uma nova reserva
   * @param {Object} reservationData - Dados da reserva, incluindo userId
   */
  async createReservation(reservationData) {
    try {
      const newReservation = await reservationModel.create(reservationData);
      return formatSuccess({ reservation: newReservation }, 'Reservation created successfully', 201);
    } catch (error) {
      // Tratar erros de chave estrangeira (ex: restaurante não existe)
      if (error.code === '23503') {
        return formatError('Restaurant not found or invalid data provided.', 404);
      }
      return formatError('Error creating reservation: ' + error.message);
    }
  }

  /**
   * Obter reservas de um usuário
   * @param {Number} userId - ID do usuário
   */
  async getUserReservations(userId) {
    try {
      const reservations = await reservationModel.findByUserId(userId);
      return formatSuccess({ reservations }, 'User reservations retrieved successfully');
    } catch (error) {
      return formatError('Error getting user reservations: ' + error.message);
    }
  }

  /**
   * Cancelar uma reserva
   * @param {Number} reservationId - ID da reserva
   * @param {Number} userId - ID do usuário
   */
  async cancelReservation(reservationId, userId) {
    try {
      const updatedReservation = await reservationModel.updateStatus(reservationId, userId, 'cancelled');
      if (!updatedReservation) {
        return formatError('Reservation not found or you are not authorized to cancel it.', 404);
      }
      return formatSuccess({ reservation: updatedReservation }, 'Reservation cancelled successfully');
    } catch (error) {
      return formatError('Error cancelling reservation: ' + error.message);
    }
  }
}

module.exports = new ReservationPresenter();
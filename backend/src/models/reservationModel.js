const db = require('../config/db');

class ReservationModel {
  /**
   * Criar uma nova reserva
   * @param {Object} reservationData - Dados da reserva
   */
  async create(reservationData) {
    const { userId, restaurantId, reservationDate, reservationTime, guests, specialRequests } = reservationData;
    
    const query = `
      INSERT INTO reservations (user_id, restaurant_id, reservation_date, reservation_time, guests, special_requests)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    
    const result = await db.query(query, [userId, restaurantId, reservationDate, reservationTime, guests, specialRequests]);
    return result.rows[0];
  }

  /**
   * Encontrar reservas por ID de usuário
   * @param {Number} userId - ID do usuário
   */
  async findByUserId(userId) {
    const query = `
      SELECT r.*, rest.name as restaurant_name, rest.address as restaurant_address, rest.image_url as restaurant_image_url
      FROM reservations r
      JOIN restaurants rest ON r.restaurant_id = rest.id
      WHERE r.user_id = $1
      ORDER BY r.reservation_date DESC, r.reservation_time DESC
    `;
    const result = await db.query(query, [userId]);
    return result.rows;
  }

  /**
   * Atualizar o status de uma reserva
   * @param {Number} reservationId - ID da reserva
   * @param {Number} userId - ID do usuário (para autorização)
   * @param {String} status - Novo status
   */
  async updateStatus(reservationId, userId, status) {
    const query = `
      UPDATE reservations
      SET status = $1, updated_at = NOW()
      WHERE id = $2 AND user_id = $3
      RETURNING *
    `;
    const result = await db.query(query, [status, reservationId, userId]);
    return result.rows[0];
  }
}

module.exports = new ReservationModel();

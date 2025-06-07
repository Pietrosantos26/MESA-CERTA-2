const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const reservationPresenter = require('../presenters/reservationPresenter');
const { protect, validate } = require('../middleware/authMiddleware');

/**
 *
 * /api/reservations:
 * post:
 * summary: Create a new reservation
 * tags: [Reservations]
 * security:
 * - bearerAuth: []
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required:
 * - restaurantId
 * - reservationDate
 * - reservationTime
 * - guests
 * properties:
 * restaurantId:
 * type: integer
 * reservationDate:
 * type: string
 * format: date
 * reservationTime:
 * type: string
 * format: time
 * guests:
 * type: integer
 * specialRequests:
 * type: string
 * responses:
 * 201:
 * description: Reservation created successfully
 * 401:
 * description: Not authenticated
 */
router.post(
  '/',
  protect,
  validate([
    body('restaurantId').isInt().withMessage('Valid restaurant ID is required'),
    body('reservationDate').isISO8601().toDate().withMessage('Valid date is required'),
    body('reservationTime').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Valid time format (HH:MM) is required'),
    body('guests').isInt({ min: 1 }).withMessage('Number of guests must be at least 1'),
    body('specialRequests').optional().trim()
  ]),
  async (req, res) => {
    const reservationData = {
      ...req.body,
      userId: req.user.id
    };
    const result = await reservationPresenter.createReservation(reservationData);
    res.status(result.success ? 201 : (result.status || 500)).json(result);
  }
);

/**
 * 
 * /api/reservations/my-reservations:
 * get:
 * summary: Get all reservations for the authenticated user
 * tags: [Reservations]
 * security:
 * - bearerAuth: []
 * responses:
 * 200:
 * description: List of user's reservations
 * 401:
 * description: Not authenticated
 */
router.get('/my-reservations', protect, async (req, res) => {
  const result = await reservationPresenter.getUserReservations(req.user.id);
  res.status(result.success ? 200 : (result.status || 500)).json(result);
});

/**
 * 
 * /api/reservations/{id}/cancel:
 * put:
 * summary: Cancel a reservation
 * tags: [Reservations]
 * security:
 * - bearerAuth: []
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: integer
 * responses:
 * 200:
 * description: Reservation cancelled successfully
 * 401:
 * description: Not authenticated
 * 404:
 * description: Reservation not found or not authorized
 */
router.put('/:id/cancel', protect, async (req, res) => {
  const result = await reservationPresenter.cancelReservation(parseInt(req.params.id), req.user.id);
  res.status(result.success ? 200 : (result.status || 500)).json(result);
});

module.exports = router;

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userPresenter = require('../presenters/userPresenter');
const { protect, validate } = require('../middleware/authMiddleware');

/**
 * 
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the user
 *         username:
 *           type: string
 *           description: The username
 *         email:
 *           type: string
 *           description: The user email
 *         created_at:
 *           type: string
 *           format: date
 *           description: The date the user was created
 *         updated_at:
 *           type: string
 *           format: date
 *           description: The date the user was last updated
 */

/**
 * 
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input or user already exists
 */
router.post(
  '/register',
  validate([
    body('username').trim().notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
  ]),
  async (req, res) => {
    const result = await userPresenter.register(req.body);
    res.status(result.success ? 201 : result.status).json(result);
  }
);

/**
 * 
 * /api/users/login:
 *   post:
 *     summary: Login a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post(
  '/login',
  validate([
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
  ]),
  async (req, res) => {
    const { email, password } = req.body;
    const result = await userPresenter.login(email, password);
    res.status(result.success ? 200 : result.status).json(result);
  }
);

/**
 * 
 * /api/users/profile:
 *   get:
 *     summary: Get current user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved
 *       401:
 *         description: Not authenticated
 */
router.get('/profile', protect, async (req, res) => {
  const result = await userPresenter.getProfile(req.user.id);
  res.status(result.success ? 200 : result.status).json(result);
});

/**
 * 
 * /api/users/profile:
 *   put:
 *     summary: Update user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       401:
 *         description: Not authenticated
 *       404:
 *         description: User not found
 */
router.put(
  '/profile',
  protect,
  validate([
    body('username').trim().optional().notEmpty().withMessage('Username cannot be empty'),
    body('email').optional().isEmail().withMessage('Valid email is required')
  ]),
  async (req, res) => {
    const result = await userPresenter.updateProfile(req.user.id, req.body);
    res.status(result.success ? 200 : result.status).json(result);
  }
);

/**
 * 
 * /api/users:
 *   delete:
 *     summary: Delete user account
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: Not authenticated
 *       404:
 *         description: User not found
 */
router.delete('/', protect, async (req, res) => {
  const result = await userPresenter.deleteUser(req.user.id);
  res.status(result.success ? 200 : result.status).json(result);
});

module.exports = router;
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const itemPresenter = require('../presenters/itemPresenter');
const { protect, validate } = require('../middleware/authMiddleware');

/**
 *
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       required:
 *         - title
 *         - user_id
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the item
 *         title:
 *           type: string
 *           description: The item title
 *         description:
 *           type: string
 *           description: The item description
 *         user_id:
 *           type: integer
 *           description: ID of the user who owns this item
 *         created_at:
 *           type: string
 *           format: date
 *           description: The date the item was created
 *         updated_at:
 *           type: string
 *           format: date
 *           description: The date the item was last updated
 */

/**
 *
 * /api/items:
 *   get:
 *     summary: Get all items for the authenticated user
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of items
 *       401:
 *         description: Not authenticated
 */
router.get('/', protect, async (req, res) => {
  const result = await itemPresenter.getUserItems(req.user.id);
  res.status(result.success ? 200 : result.status).json(result);
});

/**
 *
 * /api/items:
 *   post:
 *     summary: Create a new item
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Item created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Not authenticated
 */
router.post(
  '/',
  protect,
  validate([
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description').optional().trim()
  ]),
  async (req, res) => {
    // Add user_id to item data
    const itemData = {
      ...req.body,
      user_id: req.user.id
    };
    
    const result = await itemPresenter.createItem(itemData);
    res.status(result.success ? 201 : result.status).json(result);
  }
);

/**
 * 
 * /api/items/{id}:
 *   get:
 *     summary: Get an item by ID
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Item details
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Not authorized to access this item
 *       404:
 *         description: Item not found
 */
router.get('/:id', protect, async (req, res) => {
  const result = await itemPresenter.getItemById(parseInt(req.params.id), req.user.id);
  res.status(result.success ? 200 : result.status).json(result);
});

/**
 * 
 * /api/items/{id}:
 *   put:
 *     summary: Update an item
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Item updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Not authorized to update this item
 *       404:
 *         description: Item not found
 */
router.put(
  '/:id',
  protect,
  validate([
    body('title').trim().optional().notEmpty().withMessage('Title cannot be empty'),
    body('description').optional().trim()
  ]),
  async (req, res) => {
    const result = await itemPresenter.updateItem(
      parseInt(req.params.id),
      req.user.id,
      req.body
    );
    res.status(result.success ? 200 : result.status).json(result);
  }
);

/**
 * 
 * /api/items/{id}:
 *   delete:
 *     summary: Delete an item
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Item deleted successfully
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Not authorized to delete this item
 *       404:
 *         description: Item not found
 */
router.delete('/:id', protect, async (req, res) => {
  const result = await itemPresenter.deleteItem(parseInt(req.params.id), req.user.id);
  res.status(result.success ? 200 : result.status).json(result);
});

module.exports = router;
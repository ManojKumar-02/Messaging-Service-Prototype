// routes/messageRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/send', authMiddleware, userController.sendMessage);
router.get('/:sender/:receiver', authMiddleware, userController.getMessages);

module.exports = router;

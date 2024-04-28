const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');
const authMiddleware = require('../middlewares/AuthMiddleware');

router.post('/register', UserController.register);

router.post('/login', UserController.login);

router.get('/users', authMiddleware, UserController.getUsers);

router.get('/users/:id', authMiddleware, UserController.getUserById);

router.get('/loggedInUser', authMiddleware, UserController.getLoggedInUser);

module.exports = router;

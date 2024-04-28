const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const authMiddleware = require('../middlewares/authMiddleware');
const isAdminMiddleware = require('../middlewares/IsAdminMiddleware');

// Create a new reservation
router.post('/', authMiddleware, reservationController.createReservation);

// Get all reservations
router.get('/', authMiddleware, reservationController.getAllReservations);

// Approve a reservation by ID
router.put(
  '/:id/approve',
  authMiddleware,
  isAdminMiddleware,
  reservationController.approveReservation
);

module.exports = router;

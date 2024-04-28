const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');

const authMiddleware = require('../middlewares/AuthMiddleware');
const isAdminMiddleware = require('../middlewares/IsAdminMiddleware');

// Create a new vehicle
router.post(
  '/',
  authMiddleware,
  isAdminMiddleware,
  vehicleController.createVehicle
);

// Get all vehicles
router.get('/', authMiddleware, vehicleController.getAllVehicles);

// Get a specific vehicle by ID
router.get('/:id', authMiddleware, vehicleController.getVehicleById);

// Update a vehicle by ID
router.put(
  '/:id',
  authMiddleware,
  isAdminMiddleware,
  vehicleController.updateVehicleById
);

// Delete a vehicle by ID
router.delete(
  '/:id',
  authMiddleware,
  isAdminMiddleware,
  vehicleController.deleteVehicleById
);

module.exports = router;

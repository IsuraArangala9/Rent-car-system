const { Op } = require('sequelize');
const moment = require('moment');
const { Reservation, Vehicle } = require('../models');

const createReservation = async (req, res) => {
  try {
    const { startDate, endDate, vehicleId } = req.body;
    const existingReservation = await Reservation.findOne({
      where: {
        [Op.or]: [
          {
            startDate: {
              [Op.between]: [startDate, endDate],
            },
          },
          {
            endDate: {
              [Op.between]: [startDate, endDate],
            },
          },
        ],
        vehicleId,
      },
    });
    if (existingReservation) {
      return res
        .status(409)
        .json({ message: 'Vehicle is already reserved for this period' });
    }
    const vehicle = await Vehicle.findByPk(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    const rentalDays = moment(endDate).diff(moment(startDate), 'days');
    const rentalPrice = rentalDays * vehicle.rentalPricePerDay;
    const reservation = await Reservation.create({
      startDate,
      endDate,
      vehicleId,
      finalPayment: rentalPrice,
    });
    res.status(201).json(reservation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.findAll({
      include: [Vehicle],
      attributes: ['id', 'startDate', 'endDate', 'finalPayment', 'approved'],
    });
    res.json(reservations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const approveReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await Reservation.findByPk(id);
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    reservation.approved = true;
    await reservation.save();
    res.json(reservation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createReservation,
  getAllReservations,
  approveReservation,
};

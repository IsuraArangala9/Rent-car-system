const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();
const pg = require('pg');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectModule: pg,
});
const Vehicle = require('./Vehicle')(sequelize);
const User = require('./User')(sequelize);
const Reservation = require('./Reservation')(sequelize);

Reservation.belongsTo(Vehicle, { foreignKey: 'vehicleId' });
Vehicle.hasMany(Reservation);

module.exports = {
  sequelize,
  Vehicle,
  User,
  Reservation,
};

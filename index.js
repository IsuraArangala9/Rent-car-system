require('dotenv').config(); // Load environment variables from .env file
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const { sequelize } = require('./models/index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3001;

sequelize
  .authenticate()
  .then(() => {
    console.log(
      'Connection to the database has been established successfully.'
    );
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log('All models were synchronized successfully.');

    // test route localhost:3001/
    app.get('/', (req, res) => {
      res.send('Hello World!');
    });

    // Set up the server routes
    const vehicleRoutes = require('./routes/vehicleRoutes');
    app.use('/vehicles', vehicleRoutes);

    const userRoutes = require('./routes/userRoutes');
    app.use('/users', userRoutes);

    const reservationRoutes = require('./routes/reservationRoutes');
    app.use('/reservations', reservationRoutes);

    // Start the server
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

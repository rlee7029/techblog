const Sequelize = require('sequelize');
require('dotenv').config();

const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;


// Create a new Sequelize instance with the database configuration
const sequelize = new Sequelize(dbName, dbUser,dbPassword, {
  host: dbHost,
  dialect: 'mysql'

});

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });



// Synchronize the models with the database
sequelize.sync()
  .then(() => {
    console.log('Models synchronized with the database.');
  })
  .catch((err) => {
    console.error('Unable to synchronize models with the database:', err);
  });


module.exports = sequelize;


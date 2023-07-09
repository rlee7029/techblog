const Sequelize = require('sequelize');

// Create a new Sequelize instance with the database configuration
const sequelize = new Sequelize('tech_blog_db', 'root','root', {
  host: 'localhost',
  dialect: 'mysql'
  // Additional configuration options if necessary
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



// Export the sequelize instance
module.exports = sequelize;


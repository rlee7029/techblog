const Sequelize = require('sequelize');
const db = require('../config/database');
const User = require('./user');

const Article = db.define('article', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  }
});


  Article.belongsTo(User, { foreignKey: 'userId' });


module.exports =  Article;

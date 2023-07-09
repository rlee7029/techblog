const Sequelize = require('sequelize');
const db = require('../config/database');
const Article = require('./article')
const User = require('./user')

const Comment = db.define('comment', {
  comment: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  }
});


Comment.belongsTo(Article, { foreignKey: 'articleId' });
Comment.belongsTo(User, { foreignKey: 'userId' });
Article.hasMany(Comment, { foreignKey: 'articleId' });
User.hasMany(Comment, { foreignKey: 'userId' });

module.exports =  Comment;

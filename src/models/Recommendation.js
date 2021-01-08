const { Sequelize } = require('sequelize');
const sequelize = require('../utils/database');

class Recommendation extends Sequelize.Model {}

Recommendation.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: Sequelize.STRING(255),
  youtubeLink: Sequelize.STRING(255),
  score: Sequelize.INTEGER,
}, {
  sequelize,
  timestamps: false,
  modelName: 'recommendation',
});

module.exports = Recommendation;

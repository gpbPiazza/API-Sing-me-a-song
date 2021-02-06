const { Sequelize } = require('sequelize');
const sequelize = require('../utils/database');

class RecommendationsGenre extends Sequelize.Model {}

RecommendationsGenre.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  recommendationId: Sequelize.INTEGER,
  genreId: Sequelize.INTEGER,
}, {
  sequelize,
  timestamps: false,
  modelName: 'recommendationsGenre',
});

module.exports = RecommendationsGenre;

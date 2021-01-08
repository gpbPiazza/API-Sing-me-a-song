const { Sequelize } = require('sequelize');
const sequelize = require('../utils/database');

class RecommendationGenre extends Sequelize.Model {}

RecommendationGenre.init({
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

module.exports = RecommendationGenre;

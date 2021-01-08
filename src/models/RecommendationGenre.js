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
  recommendationsId: Sequelize.INTEGER,
  genresId: Sequelize.INTEGER,
}, {
  sequelize,
  timestamps: false,
  modelName: 'recommendationGenre',
});

module.exports = RecommendationGenre;

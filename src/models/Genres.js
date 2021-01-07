const { Sequelize } = require('sequelize');
const sequelize = require('../utils/database');

class Genres extends Sequelize.Model {}

Genres.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: Sequelize.STRING,
}, {
  sequelize,
  timestamps: false,
  modelName: 'genre',
});

module.exports = Genres;

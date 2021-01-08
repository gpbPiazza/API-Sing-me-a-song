const { Sequelize } = require('sequelize');
const sequelize = require('../utils/database');

class Genre extends Sequelize.Model {}

Genre.init({
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

module.exports = Genre;

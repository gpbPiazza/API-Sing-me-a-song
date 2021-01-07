module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('recommendationsGenres', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      recommendationsId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'recommendations',
          key: 'id',
        },
        allowNull: false,
      },

      genresId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'genres',
          key: 'id',
        },
        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('recommendationsGenres');
  },
};

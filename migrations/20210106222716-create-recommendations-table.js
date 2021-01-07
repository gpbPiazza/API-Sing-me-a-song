module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('recommendations', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      youtubeLink: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      score: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('recommendations');
  },
};

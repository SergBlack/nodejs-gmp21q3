module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      login: {
        type: Sequelize.STRING(64),
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(64),
        allowNull: false,
      },
      age: {
        type: Sequelize.NUMERIC,
      },
      isDeleted: {
        type: Sequelize.BOOL,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('Users');
  },
};

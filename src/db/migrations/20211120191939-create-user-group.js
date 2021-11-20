module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserGroups', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      GroupId: {
        type: Sequelize.UUIDV4,
      },
      UserId: {
        type: Sequelize.UUIDV4,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('UserGroups');
  },
};

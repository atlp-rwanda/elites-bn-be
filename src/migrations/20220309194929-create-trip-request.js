module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tripRequests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId',
        },
      },
      managerId: {
        type: Sequelize.INTEGER,
      },
      departLocation: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      destinations: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.TEXT),
      },
      tripReason: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      departDate: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      returnDate: {
        type: Sequelize.DATE,
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: 'pending',
      },
      tripType: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('tripRequests');
  },
};

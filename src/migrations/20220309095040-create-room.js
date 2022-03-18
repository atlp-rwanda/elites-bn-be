module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Rooms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      roomType: {
        type: Sequelize.STRING,
      },
      roomNumber: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      currency: {
        type: Sequelize.STRING,
      },
      isAvailable: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      accommodationId: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('Rooms');
  },
};

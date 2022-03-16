module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tripRequests", {
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
          model: "Users",
          key: "id",
          as: "userId",
        },
      },
      managerId: {
        type: Sequelize.INTEGER,
      },
      departLocation: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      arrivalLocation: {
        allowNull: false,
        type: Sequelize.INTEGER,
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
      accomodationId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: "pending",
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("tripRequests");
  },
};

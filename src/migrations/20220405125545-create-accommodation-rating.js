module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AccommodationRatings', {
      userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      accommodationId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      rating: {
        type: Sequelize.INTEGER,
      },
      feedback: {
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('AccommodationRatings');
  },
};

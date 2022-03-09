module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Accommodations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      accommodationName: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      streetAddress: {
        type: Sequelize.STRING,
      },
      images: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      amenities: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      approvalStatus: {
        type: Sequelize.STRING,
        defaultValue: 'pending',
      },
      geoCoordinates: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      locationId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Locations',
          key: 'id',
          as: 'locationId',
        },
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId',
        },
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
    await queryInterface.dropTable('Accommodations');
  },
};

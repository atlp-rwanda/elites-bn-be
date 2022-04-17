module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Profiles', {
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
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      gender: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      birthdate: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      language: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      currency: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      residence: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Locations',
          key: 'id',
          as: 'residence',
        },
      },
      role: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      department: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      manager: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      passportNumber: {
        type: Sequelize.STRING,
        defaultValue: 'none',
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      picture: {
        type: Sequelize.STRING,
        defaultValue: 'https://www.pngkit.com/png/detail/126-1262807_instagram-default-profile-picture-png.png',
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
  // eslint-disable-next-line no-unused-vars
  async down(queryInterface) {
    await queryInterface.dropTable('Profiles');
  },
};

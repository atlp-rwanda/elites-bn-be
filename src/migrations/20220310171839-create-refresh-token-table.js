module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('refreshTokenTables', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      refreshToken: {
<<<<<<< HEAD
        type: Sequelize.STRING,
=======
        type: Sequelize.TEXT
>>>>>>> ec439fb (updated fb and google login)
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
    await queryInterface.dropTable('refreshTokenTables');
  },
};

'use strict';
const { sequelize } = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('chatMessages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      postedBy: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
          as: 'postedBy',
        },
      },
      sender: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      message: {
        allowNull: false,
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
    await queryInterface.dropTable('chatMessages');
  },
};

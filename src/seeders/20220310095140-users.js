'use strict';
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10, 'b');

module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('Users', [{
      names:'YANGENEYE Patrick',
      email:'yangeney@gmail.com',
      password:await bcrypt.hash('password', salt),
        roleId:1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        names:'seeduser',
        email:'seeduser@gmail.com',
        password:await bcrypt.hash('seeduser', salt),
          roleId:5,
          createdAt: new Date(),
          updatedAt: new Date()
        }], {});
    
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('Users', null, {});
     
  }
};

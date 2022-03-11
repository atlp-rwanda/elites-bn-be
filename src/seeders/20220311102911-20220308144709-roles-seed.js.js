'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   
     await queryInterface.bulkInsert('Roles', [
       {
        id: 1,
        name: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
       },
       {
        id: 2,
        name: 'travel-admin',
        createdAt: new Date(),
        updatedAt: new Date(),
       },
       {
        id: 3,
        name: 'manager',
        createdAt: new Date(),
        updatedAt: new Date(),
       },
       {
        id: 4,
        name: 'accommodation-supplier',
        createdAt: new Date(),
        updatedAt: new Date(),
       },
       {
        id: 5,
        name: 'requester',
        createdAt: new Date(),
        updatedAt: new Date(),
       },
    ], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Role', null, {});
  }
};


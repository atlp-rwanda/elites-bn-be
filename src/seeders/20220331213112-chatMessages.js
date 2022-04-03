'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('chatMessages', [{
      postedBy: 10,
      message: 'hello hello, this is my first message,rate my work',
      createdAt: new Date(),
      updatedAt: new Date(),

    },
    {
      postedBy: 11,
      message: 'hello hello, this is my second message,rate my work',
      createdAt: new Date(),
      updatedAt: new Date(),

    },
    {
      postedBy: 12,
      message: 'hello hello, this is my third message,rate my work',
      createdAt: new Date(),
      updatedAt: new Date(),

    },
    {
      postedBy: 12,
      message: 'hello hello, this is my fourth message,rate my work',
      createdAt: new Date(),
      updatedAt: new Date(),

    },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('chatMessages', null, {});
     
  }
};

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Notifications',
      [
        {
          userId: 1,
          requestId: 2,
          body: 'You are very kind to us',
          isRead: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          requestId: 3,
          body: 'We always value our customers, you are one of them',
          isRead: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 5,
          requestId: 3,
          body: 'By next month you are the one who will gain more keep it up.',
          isRead: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          requestId: 1,
          body: 'We want to talk to you for good news.',
          isRead: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          requestId: 2,
          body: 'Sorry for the ticket issues, let us try to provide another ticket.',
          isRead: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          requestId: 2,
          body: 'Our Team will try to follow everything, hopefully you',
          isRead: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Notifications', null, {});
  },
};

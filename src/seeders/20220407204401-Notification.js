module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Notifications',
      [
        {
          userId: 14,
          requestId: 4,
          body: 'Hello John Kalisa!, Your manager Honore, has commented on your trip request. Comment: We have a lot of work this week, I will look into it',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 7,
          requestId: 4,
          body: 'Hello Honore!, Requester John Kalisa, who is under your management has commented on the trip request. Comment: I have filed all the papers for travel',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 14,
          requestId: 4,
          body: 'Hello John Kalisa!, Your manager Honore, has commented on your trip request. Comment: You shall consider going next month',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 7,
          requestId: 4,
          body: 'Hello Honore!, Requester John Kalisa, who is under your management has commented on the trip request. Comment: I have to go ASAP',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Notifications', null, {}),
};

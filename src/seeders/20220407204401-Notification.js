module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert(
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
      {
        userId: 7,
        requestId: 4,
        body: 'Hello Honore!, Requester John Kalisa, who is under your management has commented on the trip request. Comment: I have to go ASAP',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        requestId: 4,
        body: 'Let us send some new update in few hours.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        requestId: 3,
        body: 'Always caring to our members.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        requestId: 2,
        body: 'The system will allow you in two days.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        requestId: 4,
        body: 'Your feedback is needed on time please.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        requestId: 4,
        body: 'We value always our customers.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        requestId: 3,
        body: 'Care is around for the production.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 5,
        requestId: 2,
        body: 'The system will allow you in two days.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        requestId: 1,
        body: 'The management team will follow your issues.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface) => queryInterface.bulkDelete('Notifications', null, {}),
};

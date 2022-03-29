module.exports = {
  // eslint-disable-next-line no-unused-vars
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'tripRequests',
      [
        {
          id: 1,
          userId: 1,
          managerId: 1,
          departLocation: 1,
          destinations: [
            JSON.stringify({
              accomodationId: 1,
              destionation: 1,
            }),
            JSON.stringify({
              accomodationId: 2,
              destionation: 2,
            }),
          ],
          tripReason: 'this is trip for research purpose',
          departDate: '2022-9-03',
          returnDate: '2022-10-03',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          userId: 2,
          managerId: 1,
          departLocation: 2,
          destinations: [
            JSON.stringify({
              accomodationId: 1,
              destionation: 1,
            }),
            JSON.stringify({
              accomodationId: 2,
              destionation: 2,
            }),
          ],
          tripReason: 'this is trip for research purpose',
          departDate: '2022-10-03',
          returnDate: '2022-12-03',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          userId: 2,
          managerId: 3,
          departLocation: 2,
          destinations: [
            JSON.stringify({
              accomodationId: 1,
              destionation: 1,
            }),
            JSON.stringify({
              accomodationId: 2,
              destionation: 2,
            }),
          ],
          status: 'approved',
          tripReason: 'this is trip for research purpose',
          departDate: '2022-10-03',
          returnDate: '2022-12-03',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          userId: 2,
          managerId: 3,
          departLocation: 2,
          destinations: [
            JSON.stringify({
              accomodationId: 1,
              destionation: 1,
            }),
            JSON.stringify({
              accomodationId: 2,
              destionation: 2,
            }),
          ],
          status: 'approved',
          tripReason: 'this is to test ',
          departDate: '2024-04-03',
          returnDate: '2024-04-05',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tripRequests', null, {});
  },
};

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
              destionationId: 1,
            }),
            JSON.stringify({
              accomodationId: 2,
              destionationId: 2,
            }),
          ],
          tripReason: 'this is trip for research purpose',
          departDate: '2022-9-03',
          returnDate: '2022-10-03',
          address: 'KIGALI-GASABO-KARURUMA',
          passportNumber: 'FGH54673',
          names: 'YANGENEYE Patrick',
          gender: 'male',
          role: 'admin',
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
              destionationId: 1,
            }),
            JSON.stringify({
              accomodationId: 2,
              destionation: 2,
            }),
          ],
          tripReason: 'this is trip for research purpose',
          departDate: '2022-10-03',
          returnDate: '2022-12-03',
          address: 'KAMPALA-ENTEBE-KAMINA',
          passportNumber: 'ZXC9876',
          names: 'seeduser',
          gender: 'male',
          role: 'requester',
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
              destionationId: 1,
            }),
            JSON.stringify({
              accomodationId: 2,
              destionationId: 2,
            }),
          ],
          status: 'approved',
          tripReason: 'this is trip for research purpose',
          departDate: '2022-10-03',
          returnDate: '2022-12-03',
          address: 'KAMPALA-ENTEBE-KAMINA',
          passportNumber: 'ZXC9876',
          names: 'seeduser',
          gender: 'male',
          role: 'requester',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          userId: 10,
          managerId: 3,
          departLocation: 2,
          destinations: [
            JSON.stringify({
              accomodationId: 1,
              destionationId: 1,
            }),
            JSON.stringify({
              accomodationId: 2,
              destionationId: 2,
            }),
          ],
          status: 'pending',
          tripReason: 'this is to test ',
          departDate: '2024-04-03',
          returnDate: '2024-04-05',
          address: 'KAMPALA-ENTEBE-KAMINA',
          passportNumber: 'ZXC9876',
          names: 'bosco',
          gender: 'male',
          role: 'requester',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 5,
          userId: 13,
          managerId: 7,
          departLocation: 2,
          destinations: [
            JSON.stringify({
              accomodationId: 1,
              destionationId: 1,
            }),
            JSON.stringify({
              accomodationId: 2,
              destionationId: 2,
            }),
          ],
          status: 'approved',
          tripReason: 'this is to test ',
          address: 'KAMPALA-ENTEBE-KAMINA',
          passportNumber: 'ZXC9876',
          names: 'bosco',
          gender: 'male',
          role: 'requester',
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

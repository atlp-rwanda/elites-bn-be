module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Bookings',
      [
        {
          userId: 1,
          roomId: 2,
          checkinDate: new Date('2022-02-22').toISOString(),
          checkoutDate: new Date('2022-03-23').toISOString(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Bookings', null, {});
  },
};

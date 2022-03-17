module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Rooms',
    [
      {
        roomType: 'VIP',
        roomNumber: 'L2-301',
        price: 800,
        currency: 'USD',
        accommodationId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roomType: 'VVIP',
        roomNumber: 'F-671',
        price: 1500,
        currency: 'USD',
        accommodationId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roomType: 'REGULAR',
        roomNumber: 'B2-01',
        price: 200,
        currency: 'USD',
        accommodationId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],

    {}
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Rooms', null, {}),
};

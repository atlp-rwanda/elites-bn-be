module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert(
    'Locations',
    [
      {
        locationName: 'Kigali',
        description: 'Best place for tourists',
        country: 'Rwanda',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        locationName: 'Makueni',
        description: 'Best place for tourists',
        country: 'Nairobi',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        locationName: 'Kampala',
        description: 'Best place for tourists',
        country: 'Uganda',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],

    {},
  ),

  down: (queryInterface) => queryInterface.bulkDelete('Locations', null, {}),
};

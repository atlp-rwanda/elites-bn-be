module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        names: 'Gihozo Innocente',
        email: 'gihozo97@gmail.com',
        password: '$2b$10$UXnwEWSIsSXsK/ocfmr0R.7OAt3WD1WpD0kx5VtI/wNbvQO1iGxWa',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      names: 'eric John',
      email: 'eric@gmail.com',
      roleId: 1,
      password: '111@call',
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      names: 'eric James',
      email: 'james@gmail.com',
      roleId: 1,
      password: '111@call',
      createdAt: new Date(),
      updatedAt: new Date()

    }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};

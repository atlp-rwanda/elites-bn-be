const bcrypt = require('bcrypt');

const salt = bcrypt.genSaltSync(10, 'b');

module.exports = {
  // eslint-disable-next-line no-unused-vars
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      names: 'YANGENEYE Patrick',
      email: 'yangeney@gmail.com',
      password: await bcrypt.hash('password', salt),
      roleId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      names: 'seeduser',
      email: 'seeduser@gmail.com',
      password: await bcrypt.hash('seeduser', salt),
      roleId: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      names: 'Honore Iradukunda',
      email: 'ihonore03@gmail.com',
      password: await bcrypt.hash('password', salt),
      roleId: 3,
      managerId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      names: 'Gihozo Innocente',
      email: 'gihozo97@gmail.com',
      password: await bcrypt.hash('password', salt),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      names: 'Irene Kalisa',
      email: 'ihonore100@gmail.com',
      password: await bcrypt.hash('password', salt),
      roleId: 2,
      managerId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ], {});
  },
  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};

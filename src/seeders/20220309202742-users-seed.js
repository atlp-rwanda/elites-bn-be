const bcrypt = require('bcrypt');

const salt = bcrypt.genSaltSync(10, 'b');
const hashPassword = async (plainPassword) => {
  const hash = await bcrypt.hash(plainPassword, salt);
  return hash;
};
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      names: 'eric John',
      email: 'eric@gmail.com',
      roleId: 1,
      managerId: 1,
      password: await hashPassword('111@call'),
      createdAt: new Date(),
      updatedAt: new Date(),

    },
    {
      names: 'eric James',
      email: 'james@gmail.com',
      roleId: 2,
      managerId: 1,
      password: await hashPassword('111@call'),
      createdAt: new Date(),
      updatedAt: new Date(),

    },
    {
      names: 'jane',
      email: 'jane@gmail.com',
      roleId: 3,
      managerId: 2,
      password: await hashPassword('111@call'),
      createdAt: new Date(),
      updatedAt: new Date(),

    },
    {
      names: 'john',
      email: 'john@gmail.com',
      roleId: 3,
      managerId: 2,
      password: await hashPassword('111@call'),
      createdAt: new Date(),
      updatedAt: new Date(),

    },
    {
      names: 'bosco',
      email: 'bosco@gmail.com',
      roleId: 4,
      managerId: 3,
      password: await hashPassword('111@call'),
      createdAt: new Date(),
      updatedAt: new Date(),

    },
    {
      names: 'bosco',
      email: 'senderone@gmail.com',
      roleId: 5,
      managerId: 7,
      password: await hashPassword('pass123@'),
      createdAt: new Date(),
      updatedAt: new Date(),

    },
    {
      names: 'bosco',
      email: 'sendertwo@gmail.com',
      roleId: 4,
      managerId: 3,
      password: await hashPassword('pass123@'),
      createdAt: new Date(),
      updatedAt: new Date(),

    },
    {
      names: 'bosco',
      email: 'senderthree@gmail.com',
      roleId: 5,
      password: await hashPassword('pass123@'),
      createdAt: new Date(),
      updatedAt: new Date(),

    },
    {
      names: 'bosco',
      email: 'senderfour@gmail.com',
      roleId: 5,
      managerId: 8,
      password: await hashPassword('pass123@'),
      createdAt: new Date(),
      updatedAt: new Date(),

    },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
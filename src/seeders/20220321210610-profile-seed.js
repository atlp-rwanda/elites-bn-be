module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Profiles', [{
      userId: 1,
      name: 'eric John',
      email: 'eric@gmail.com',
      gender: 'male',
      birthdate: '2000-12-12',
      language: 'English',
      currency: 'RWF',
      residence: 2,
      role: 1,
      department: 'sales',
      manager: 1,
      createdAt: new Date(),
      updatedAt: new Date(),

    },
    {
      userId: 2,
      name: 'James Clovis',
      email: 'james@gmail.com',
      gender: 'male',
      birthdate: '2000-12-15',
      language: 'French',
      currency: 'USD',
      residence: 2,
      role: 1,
      department: 'Marketing',
      manager: 1,
      createdAt: new Date(),
      updatedAt: new Date(),

    },
    {
      userId: 3,
      name: 'Milliam Joe',
      email: 'joe@gmail.com',
      gender: 'female',
      birthdate: '2000-12-19',
      language: 'French',
      currency: 'USD',
      residence: 1,
      role: 1,
      department: 'Marketing',
      manager: 1,
      createdAt: new Date(),
      updatedAt: new Date(),

    },
    {
      userId: 4,
      name: 'Janet Lucyian',
      email: 'janet@gmail.com',
      gender: 'female',
      birthdate: '2000-12-19',
      language: 'French',
      currency: 'USD',
      residence: 3,
      role: 1,
      department: 'Marketing',
      manager: 1,
      createdAt: new Date(),
      updatedAt: new Date(),

    },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Profiles', null, {});
  },
};

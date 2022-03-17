
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10, 'b');

module.exports = {
  async up (queryInterface) {
      await queryInterface.bulkInsert('Users', [{
      names:'YANGENEYE Patrick',
      email:'yangeney@gmail.com',
      password:await bcrypt.hash('password', salt),
        roleId:1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        names:'seeduser',
        email:'seeduser@gmail.com',
        password:await bcrypt.hash('seeduser', salt),
          roleId:5,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          names: 'Gihozo Innocente',
          email: 'gihozo97@gmail.com',
          password: '$2b$10$UXnwEWSIsSXsK/ocfmr0R.7OAt3WD1WpD0kx5VtI/wNbvQO1iGxWa',
          createdAt: new Date(),
          updatedAt: new Date(),
                 }
      ], {});
    
  },

  async down (queryInterface) {
      await queryInterface.bulkDelete('Users', null, {});
     
  }
};
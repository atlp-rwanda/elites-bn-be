'use strict';
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10, 'b');

module.exports = {
  async up (queryInterface, Sequelize) {
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
					names: 'Honore Iradukunda',
					email: 'ihonore03@gmail.com',
					password:
						'$2b$10$QYWjjX0DW7Qhgqf30Gxh3uZ1IkPy2pGYa14069VwbnoRsdlzQE1om',
        roleId: 3,
        managerId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        names: 'Gihozo Innocente',
        email: 'gihozo97@gmail.com',
        password: '$2b$10$UXnwEWSIsSXsK/ocfmr0R.7OAt3WD1WpD0kx5VtI/wNbvQO1iGxWa',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        names: 'Irene Kalisa',
        email: 'ihonore100@gmail.com',
        password:
						'$2b$10$F/rm0bnbmQezTEtWccJcpOSGd.AekvKu3foKNR8jsJWu3ECMoZ4fO',
        roleId: 2,
        managerId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        names: 'Gabriel Manzi',
        email: 'ihonore@gmail.com',
        password:
						'$2b$10$ae70fNT92f9eK.ZhcgNlzOQQb36Ba43Mh37UNxGi9Ey8bcOsONDoi',
					roleId: 5,
					managerId: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},], {});
    
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('Users', null, {});
     
  }
};

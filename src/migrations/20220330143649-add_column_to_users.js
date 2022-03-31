<<<<<<< HEAD
=======
'use strict';

>>>>>>> fdb8021 ( This is a combination of 4 commits.)
module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Users', // table name
        'notifyByEmail', // new field name
        {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
          allowNull: true,
          after: 'verified',
<<<<<<< HEAD
        },
=======
        }
>>>>>>> fdb8021 ( This is a combination of 4 commits.)
      ),
    ]);
  },

  down(queryInterface, Sequelize) {
    // logic for reverting the changes
    return Promise.all([queryInterface.removeColumn('Users', 'notifyByEmail')]);
  },
};

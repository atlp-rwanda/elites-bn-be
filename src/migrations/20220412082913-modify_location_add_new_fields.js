'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Locations', // table name
        'visitCount', // new field name
        {
          type: Sequelize.INTEGER,
          defaultValue: 0,
          allowNull: true,
        }
      ),
    ]);
  },

  down(queryInterface, Sequelize) {
    // logic for reverting the changes
    return Promise.all([
      queryInterface.removeColumn('Locations', 'visitCount'),
    ]);
  },
};

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
        },
      ),
    ]);
  },

  down(queryInterface) {
    // logic for reverting the changes
    return Promise.all([queryInterface.removeColumn('Users', 'notifyByEmail')]);
  },
};

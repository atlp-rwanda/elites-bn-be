const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class refreshTokenTable extends Model {
    static associate(models) {
      // define association here
    }
  }
  refreshTokenTable.init({
    refreshToken: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'refreshTokenTable',
  });
  return refreshTokenTable;
};

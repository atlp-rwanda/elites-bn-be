const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class refreshTokenTable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  refreshTokenTable.init({
    refreshToken: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'refreshTokenTable',
  });
  return refreshTokenTable;
};

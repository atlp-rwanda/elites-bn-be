const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BlacklistedToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
   
  }
  BlacklistedToken.init({
    token: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'BlacklistedToken',
  });
  return BlacklistedToken;
};

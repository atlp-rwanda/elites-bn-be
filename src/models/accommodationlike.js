const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class AccommodationLike extends Model {
    /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
    static associate(models) {
      // define association here
      AccommodationLike.belongsTo(models.Accommodation, {
        foreignKey: 'accommodationId',
        as: 'accommodation',
      });
      AccommodationLike.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
    }
  }
  AccommodationLike.init({
    userId: DataTypes.INTEGER,
    accommodationId: DataTypes.INTEGER,
    isLike: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'AccommodationLike',
  });
  return AccommodationLike;
};

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class AccommodationRating extends Model {
    /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
    static associate(models) {
      // define association here
      AccommodationRating.belongsTo(models.Accommodation, {
        foreignKey: 'accommodationId',
        as: 'accommodation',
      });
      AccommodationRating.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
    }
  }
  AccommodationRating.init({
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    accommodationId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    rating: DataTypes.INTEGER,
    feedback: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'AccommodationRating',
  });
  return AccommodationRating;
};

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Accommodation extends Model {
    /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
    static associate(models) {
      // define association here
      Accommodation.belongsTo(models.Location, {
        foreignKey: 'locationId',
        as: 'location',
      });
      Accommodation.hasMany(models.Room, {
        foreignKey: 'accommodationId',
        as: 'Rooms',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });

      Accommodation.hasMany(models.AccommodationLike, {
        foreignKey: 'accommodationId',
        as: 'likes',
      });

      Accommodation.hasMany(models.AccommodationRating, {
        foreignKey: 'accommodationId',
        as: 'ratings',
      });
    }
  }
  Accommodation.init({
    accommodationName: DataTypes.STRING,
    description: DataTypes.STRING,
    streetAddress: DataTypes.STRING,
    images: DataTypes.ARRAY(DataTypes.STRING),
    geoCoordinates: DataTypes.ARRAY(DataTypes.STRING),
    amenities: DataTypes.ARRAY(DataTypes.STRING),
    approvalStatus: DataTypes.STRING,
    locationId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Accommodation',
    tableName: 'Accommodations',
  });
  return Accommodation;
};

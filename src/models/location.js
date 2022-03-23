const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    static associate(models) {
      // define association here
      Location.hasMany(models.Accommodation, {
        foreignKey: 'locationId',
        as: 'accommodations',
        onDelete: 'CASCADE',
      });

      Location.hasMany(models.Profile, {
        foreignKey: 'residence',
      });
    }
  }
  Location.init(
    {
      locationName: DataTypes.STRING,
      description: DataTypes.STRING,
      country: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Location',
      tableName: 'Locations',
    }
  );
  return Location;
};

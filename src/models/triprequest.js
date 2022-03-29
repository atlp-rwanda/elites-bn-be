const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class tripRequest extends Model {
    static associate(models) {
      // define association here
      tripRequest.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      tripRequest.hasMany(models.TripComment, {
        foreignKey: 'tripId',
        as: 'comments',
      });
    }
  }
  tripRequest.init(
    {
      userId: DataTypes.INTEGER,
      managerId: DataTypes.INTEGER,
      departLocation: DataTypes.INTEGER,
      destinations: DataTypes.ARRAY(DataTypes.TEXT),
      tripReason: DataTypes.STRING,
      departDate: DataTypes.DATE,
      returnDate: DataTypes.DATE,
      rememberMe: DataTypes.BOOLEAN,
      passportNumber: DataTypes.STRING,
      address: DataTypes.STRING,
      names: DataTypes.STRING,
      gender: DataTypes.STRING,
      role: DataTypes.STRING,
      status: DataTypes.STRING,
      tripType: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'tripRequest',
    }
  );
  return tripRequest;
};

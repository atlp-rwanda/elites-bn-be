const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    static associate(models) {
      // define association here
      Room.belongsTo(models.Accommodation, {
        foreignKey: 'accommodationId',
        as: 'accommodations',
      });
    }
  }
  Room.init(
    {
      roomType: DataTypes.STRING,
      roomNumber: DataTypes.STRING,
      price: DataTypes.INTEGER,
      currency: DataTypes.STRING,
      isAvailable: DataTypes.BOOLEAN,
      accommodationId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Room',
      tableName: 'Rooms',
    },
  );
  return Room;
};

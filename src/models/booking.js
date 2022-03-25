const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
    }
  }
  Booking.init(
    {
      roomId: DataTypes.INTEGER,
      checkinDate: DataTypes.DATE,
      checkoutDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Booking',
    },
  );
  return Booking;
};

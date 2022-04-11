const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Notification.belongsTo(models.tripRequest, {
        foreignKey: 'requestId',
        as: 'trip-request',
      });
    }
  }
  Notification.init(
    {
      userId: DataTypes.INTEGER,
      requestId: DataTypes.INTEGER,
      body: DataTypes.STRING,
      isRead: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Notification',
      tableName: 'Notifications',
    }
  );
  return Notification;
};

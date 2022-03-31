<<<<<<< HEAD
const { Model } = require('sequelize');

=======
'use strict';
const { Model } = require('sequelize');
>>>>>>> fdb8021 ( This is a combination of 4 commits.)
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
<<<<<<< HEAD
    },
=======
    }
>>>>>>> fdb8021 ( This is a combination of 4 commits.)
  );
  return Notification;
};

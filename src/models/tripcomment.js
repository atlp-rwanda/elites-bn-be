'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TripComment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TripComment.belongsTo(models.tripRequest, {
        foreignKey: 'tripId', as: 'trip'
      })
      TripComment.belongsTo(models.User, {
        foreignKey: 'userId', as: 'user'
      })
    }
  }
  
  TripComment.init({
    userId: DataTypes.INTEGER,
    tripId: DataTypes.INTEGER,
    comment: DataTypes.STRING,
    isVisible: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'TripComment',
  });
  return TripComment;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class chatMessage extends Model {
    
    static associate(models) {
      // define association here
      chatMessage.belongsTo(models.User, {
        foreignKey:'postedBy',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        constraints: false,

      })
    }
  }
  chatMessage.init({
    postedBy: DataTypes.INTEGER,
    message: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'chatMessage',
  });
  return chatMessage;
};
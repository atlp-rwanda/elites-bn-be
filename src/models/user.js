const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.belongsTo(models.Role, {
        foreignKey: 'roleId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      User.belongsTo(User, {
        foreignKey: 'managerId',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        constraints: false,
      });

      User.hasMany(User, {
        foreignKey: 'managerId',
      });

      User.hasMany(models.tripRequest, {
        foreignKey: 'userId',
      });

      User.hasOne(models.Profile, {
        foreignKey: 'userId',
      });
    }
  }
  User.init(
    {
      names: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      roleId: DataTypes.INTEGER,
      managerId: DataTypes.INTEGER,
      isActive: DataTypes.BOOLEAN,
      verified: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};

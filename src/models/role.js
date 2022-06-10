const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      // define association here
      Role.hasMany(models.User, {
        foreignKey: 'roleId',
        as: 'Role',
      });
    }
  }
  Role.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Role',
    },
  );
  return Role;
};

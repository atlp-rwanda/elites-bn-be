const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Role, {
        foreignKey: 'roleId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      User.belongsTo(User, {
        foreignKey: 'managerId',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      });

      User.hasMany(User, {
        foreignKey: 'managerId'
      });
    }
  }
  User.init({
    names: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    roleId: DataTypes.INTEGER,
    managerId: DataTypes.INTEGER,
    isActive: DataTypes.BOOLEAN,
    verified: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};

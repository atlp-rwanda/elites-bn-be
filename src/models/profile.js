const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        constraints: false,
        as: 'Profile',
      });

      Profile.belongsTo(models.Location, {
        foreignKey: 'residence',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        constraints: false,
      });
    }
  }
  Profile.init(
    {
      userId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      gender: DataTypes.STRING,
      birthdate: DataTypes.DATE,
      language: DataTypes.STRING,
      currency: DataTypes.STRING,
      residence: DataTypes.INTEGER,
      role: DataTypes.INTEGER,
      department: DataTypes.STRING,
      manager: DataTypes.INTEGER,
      address: DataTypes.STRING,
      passportNumber: DataTypes.STRING,
      picture: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Profile',
    }
  );
  return Profile;
};

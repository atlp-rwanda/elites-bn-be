const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class tripRequest extends Model {
    /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
    static associate(models) {
      // define association here
      tripRequest.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  tripRequest.init({
    userId: DataTypes.INTEGER,
    managerId: DataTypes.INTEGER,
    departLocation: DataTypes.INTEGER,
    arrivalLocation: DataTypes.INTEGER,
    tripReason: DataTypes.STRING,
    departDate: DataTypes.DATE,
    returnDate: DataTypes.DATE,
    travelId: DataTypes.INTEGER,
    accomodationId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tripRequest',
  });
  return tripRequest;
};

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Room extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Room.belongsTo(models.Accommodation, {
				foreignKey: 'accommodationId',
				constraints: false,
				as: 'accommodations',
			});
		}
	}
	Room.init(
		{
			roomType: DataTypes.STRING,
			roomNumber: DataTypes.STRING,
			price: DataTypes.INTEGER,
			currency: DataTypes.STRING,
			isAvailable: DataTypes.BOOLEAN,
			accommodationId: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'Room',
			tableName: 'Rooms',
		}
	);
	return Room;
};

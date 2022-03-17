const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Location extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Location.hasMany(models.Accommodation, {
				foreignKey: 'locationId',
				constraints: false,
				as: 'accommodations',
				onDelete: 'CASCADE',
			});
		}
	}
	Location.init(
		{
			locationName: DataTypes.STRING,
			description: DataTypes.STRING,
			country: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'Location',
			tableName: 'Locations',
		}
	);
	return Location;
};

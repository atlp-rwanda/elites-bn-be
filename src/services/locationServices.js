import { Accommodation, Location } from '../models';
class locationServices {
  createLocation = async (location) => {
    const createdLocation = await Location.create(location);
    return createdLocation;
  };

	getSingleLocation = async (id) => {
		const foundLocation = await Location.findOne({
			where: { id },
			include: [
				{
					model: Accommodation,
					as: 'accommodations',
					attributes: { exclude: ['createdAt', 'updatedAt'] },
				},
			],
		});
		return foundLocation;
	};

  updateLocation = async (id, locationUpdate) => {
    const updatedLocation = await Location.update(locationUpdate, {
      where: { id },
      returning: true,
      raw: true,
    });
    return updatedLocation;
  };

  deleteLocation = async (id) => {
    const deletedLocation = await Location.destroy({
      where: { id },
    });
    if (deletedLocation) {
      return 'Location deleted successfully';
    } else {
      return 'Location does not exists';
    }
  };
}

export default locationServices;

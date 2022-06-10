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

  getAllLocations = async () => {
    const foundLocations = await Location.findAll({});
    return foundLocations;
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

  listMostVisitedLocations = async () => {
    try {
      const mostVisited = await Location.findAll({
        order: [['visitCount', 'DESC']],
      });
      return mostVisited;
    } catch (error) {
      console.log(error);
    }
  };

  findLocation = async (id) => {
    try {
      const findLoc = await Location.findOne(
        { where: { id } },
        {
          include: [{ model: Accommodation, as: 'Accommodations' }],
        }
      );
      return findLoc;
    } catch (error) {
      console.log(error);
    }
  };

  findAndUpdateLocation = async ({ where, id }, locData) => {
    try {
      const updateLoc = await Location.update(locData, {
        where: id ? { id } : where,
      });
      return updateLoc;
    } catch (error) {
      console.log(error);
    }
  };
}

export default locationServices;

import { Accommodation, Room, Location } from '../models';

class AccommodationServices {
  createAccommodation = async (data) => {
    const accommodation = await Accommodation.create(data);
    return accommodation;
  };

  getOneAccommodation = async (id) => {
    const oneAccommodation = await Accommodation.findOne({
      where: { id: id },
      include: [
        {
          model: Room,
          as: 'Rooms',
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
        {
          model: Location,
          as: 'location',
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
      ],
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    return oneAccommodation;
  };

  getAccommodationsByLocation = async (locationId) => {
    const accommodations = await Accommodation.findAll({
      where: { locationId: locationId },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [
        {
          model: Room,
          as: 'Rooms',
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
        {
          model: Location,
          as: 'location',
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
      ],
      order: [['id', 'DESC']],
    });
    return accommodations;
  };

  updateAccommodation = async (id, updates) => {
    const updatedAccommodation = await Accommodation.update(updates, {
      where: { id: id },
      returning: true,
      raw: true,
    });
    return updatedAccommodation;
  };

  getAllAccommodations = async () => {
    const accommodations = await Accommodation.findAll({
      include: [
        {
          model: Room,
          as: 'Rooms',
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
        {
          model: Location,
          as: 'location',
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
      ],
      order: [['id', 'DESC']],
    });
    return accommodations;
  };

  deleteAccommodation = async (id) => {
    const deletedAccommodation = await Accommodation.destroy({
      where: { id: id },
    });
    if (deletedAccommodation) {
      return 'Accommodation deleted successfully';
    } else {
      return 'Accommodation does not exists';
    }
  };
}

export default AccommodationServices;

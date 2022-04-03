import models from '../models';

export class AccommodationLikeService {
  static async create(data) {
    return await models.AccommodationLike.create(data);
  }

  static async update(data) {
    await data.update();
    return await data.save();
  }

  static async findByPk(id) {
    return await models.AccommodationLike.findByPk(id);
  }

  static async delete(id) {
    return await models.AccommodationLike.destroy({ where: { id } });
  }

  static async findAllLikeByAccommodation(id) {
    return await models.AccommodationLike.findAndCountAll({
      include: [
        { model: models.Accommodation, as: 'accommodation' },
        { model: models.User, as: 'user' },
      ],
      where: { accommodationId: id, isLike: true },
    });
  }

  static async findOneByAccommodationAndUser(userId, accommodationId) {
    return await models.AccommodationLike.findOne({
      where: { userId, accommodationId },
    });
  }

  static async findAllDisLikeByAccommodation(id) {
    return await models.AccommodationLike.findAndCountAll({
      include: [
        { model: models.Accommodation, as: 'accommodation' },
        { model: models.User, as: 'user' },
      ],
      where: { accommodationId: id, isLike: false },
    });
  }
}

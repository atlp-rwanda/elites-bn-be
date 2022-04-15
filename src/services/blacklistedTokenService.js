import models from '../models';

export class BlacklistedTokenService {
  static async create(data) {
    return await models.BlacklistedToken.create(data);
  }

  static async findOne(token) {
    return await models.BlacklistedToken.findOne({
      where: {
        token: token
      },
    });
  }

}
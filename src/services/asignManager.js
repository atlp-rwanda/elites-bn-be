import models from '../models';

export const assignManager = async (userId, managerId) => {
  const user = await models.User.findOne({ where: { id: userId } });
    user.managerId = managerId;
    user.save();
    return user;
};

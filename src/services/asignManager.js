import models from '../models';

export const assignManager = async (userId, managerId) => {
  const user = await models.User.findOne({ where: { id: userId } });
  if (user.dataValues.managerId === null) {
    user.managerId = managerId;
    user.save();
    return user;
  }
  return false;
};

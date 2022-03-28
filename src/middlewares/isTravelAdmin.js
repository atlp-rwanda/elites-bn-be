/* eslint-disable consistent-return */
import { User, Role } from '../models';

// eslint-disable-next-line import/prefer-default-export
export const isTravelAdmin = async (id, req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id },
    });
    const role = await Role.findOne({
      where: { id: user.roleId },
    });
    if (role.name === 'travel-admin') {
      next();
    } else {
      return res.status(401).json({ message: 'You are not a travel admin' });
    }
  } catch (err) {
    next(err);
  }
};

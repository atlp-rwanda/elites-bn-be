/* eslint-disable import/prefer-default-export */
import { User, Role } from '../models';
import { UnauthorizedError } from '../httpErrors/unauthorizedError';

export const isManager = async (id, req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id },
    });
    const role = await Role.findOne({
      where: { id: user.roleId },
    });
    if (role.name === 'manager') {
      next();
    } else {
      throw new UnauthorizedError();
    }
  } catch (err) {
    next(err);
  }
};

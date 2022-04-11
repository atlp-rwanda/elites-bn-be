import { User, Role } from '../models';
import { UnauthorizedError } from '../httpErrors/unauthorizedError';

export const isRequesterOnly = async (id, req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id },
    });
    const role = await Role.findOne({
      where: { id: user.roleId },
    });
    if (role.name == 'requester') {
      next(id);
    } else {
      throw new UnauthorizedError('Login required as requester');
    }
  } catch (err) {
    next(err);
  }
};

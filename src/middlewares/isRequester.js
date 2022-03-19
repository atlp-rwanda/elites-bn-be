import { User, Role } from '../models';
import { UnauthorizedError } from '../httpErrors/unauthorizedError';

export const isRequester = async(id, req, res, next) => {
    try {
        const user = await User.findOne({
            where: { id },
        });
        const role = await Role.findOne({
            where: { id: user.roleId },
        });
        if (role.name == 'requester' || role.name == 'manager') {
            next(id);
        } else {
            throw new UnauthorizedError(`Login required`);
        }
    } catch (err) {
        next(err);
    }
};
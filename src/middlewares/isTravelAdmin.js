import { User, Role } from '../models';

export const isTravelAdmin = async (id, req, res, next) => {
	try {
		const user = await User.findOne({
			where: { id: id },
		});
		const role = await Role.findOne({
			where: { id: user.roleId },
		});
		if (role.name == 'travel-admin') {
			next();
		} else {
			return res.status(401).json({ message: 'You are not a travel admin' });
		}
	} catch (err) {
		next(err);
	}
};

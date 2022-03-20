import 'dotenv/config';
import { decodeAcessToken } from '../helpers/jwtFunction';
import models from '../models';

export const isAdmin = async (req, res, next) => {
  try {
    const emptyToken = req.headers.authorization;
    if (emptyToken === null) {
      return res.status(403).json({ message: 'user is note logged in' });
    }
    const token = req.headers.authorization.split(' ')[1];
    let data;

    data = await decodeAcessToken(token);
    console.log(data);

    const user = await models.User.findOne({
      where: { id: data.id },
      include: 'Role',
    });
    console.log(user.roleId);
    if (user.roleId !== 1) {
      return res.status(401).json({
        status: 401,
        message: 'Only admins are allowed to perform this task',
      });
    }
  } catch (error) {
    return res.status(403).json({ message: 'user is not logged in' });
  }

  next();
};

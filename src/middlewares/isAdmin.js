/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import 'dotenv/config';
import { decodeAcessToken } from '../helpers/jwtFunction';
import models from '../models';

export const isAdmin = async (req, res, next) => {
  try {
    const emptyToken = req.headers.authorization;
    if (emptyToken === null) {
      return res.status(401).json({ message: 'user is note logged in' });
    }
    const token = req.headers.authorization.split(' ')[1];
    const data = await decodeAcessToken(token);
    const user = await models.User.findOne({
      where: { id: data.id },
      include: 'Role',
    });
    if (user.roleId !== 1) {
      return res.status(403).json({
        status: 403,
        message: 'Only admins are allowed to perform this task',
      });
    }
  } catch (error) {
    return res.status(401).json({ message: 'user is not logged in' });
  }

  next();
};

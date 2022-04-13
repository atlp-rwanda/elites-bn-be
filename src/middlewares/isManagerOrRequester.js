/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import 'dotenv/config';
import { decodeAcessToken } from '../helpers/jwtFunction';
import models from '../models';

export const isManagerOrRequester = async (req, res, next) => {
  try {
    const emptyToken = req.headers.authorization;
    if (emptyToken === null) {
      return res.status(403).json({ message: 'user is note logged in' });
    }
    const token = req.headers.authorization.split(' ')[1];
    const data = await decodeAcessToken(token);
    const user = await models.User.findOne({
      where: { id: data.id },
      include: 'Role',
    });
    if (user.roleId !== 3 || user.roleId !== 5) {
      return res.status(401).json({
        status: 401,
        message: 'Only manager and requester are allowed to perform this task',
      });
    }
  } catch (error) {
    return res.status(403).json({ message: 'user is not logged in' });
  }

  next();
};
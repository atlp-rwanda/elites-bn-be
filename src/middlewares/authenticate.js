/* eslint-disable consistent-return */
import 'dotenv/config';
import { decodeAcessToken } from '../helpers/jwtFunction';
import { userById } from '../services/userServices';

// eslint-disable-next-line import/prefer-default-export
export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const data = await decodeAcessToken(token);
    const user = await userById(data.id);

    if (!user.verified) {
      return res.status(400).json({
        status: 400,
        error: 'Please, you have to verify your account.',
      });
    }

    next(data.id);
  } catch (error) {
    return res.status(401).json({
      status: 401,
      error: 'You are not authorized, Please login',
    });
  }
};
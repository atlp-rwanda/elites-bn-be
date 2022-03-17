import 'dotenv/config';
import { decodeAcessToken } from '../helpers/jwtFunction';

// eslint-disable-next-line import/prefer-default-export
export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const data = await decodeAcessToken(token);
    next(data.id);
  } catch (error) {
    return res.status(401).json({
      status: 401,
      error: 'You are not authorized, Please login',
    });
  }
};

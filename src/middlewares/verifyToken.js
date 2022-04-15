/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import 'dotenv/config';
import {BlacklistedTokenService} from '../services/blacklistedTokenService'

export const verifyToken = async (id,req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const isTokenInvalid = await BlacklistedTokenService.findOne(token)
  if (isTokenInvalid) {
    return res.status(401).json({
      status: 401,
      error: 'You are not authorized, Please login',
    });
  }
  next(id);
};

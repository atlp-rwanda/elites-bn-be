import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const ACCESS_TOKEN_KEY = process.env.JWT_SECRETE_KEY;
const REFRESH_TOKEN_KEY = process.env.JWT_SECRETE_REFRESH_KEY;

export const generateAccessToken = (payload, expiresIn = '360d') => {
  const token = jwt.sign(payload, ACCESS_TOKEN_KEY, { expiresIn });
  return token;
};

export const generateRefreshToken = (payload) => {
  const refreshToken = jwt.sign({ ...payload }, REFRESH_TOKEN_KEY, {
    expiresIn: '7d',
  });
  return refreshToken;
};

export const decodeAcessToken = async (token) => {
  try {
    const decoded = await jwt.verify(token, ACCESS_TOKEN_KEY);
    return decoded;
  } catch (err) {
    console.log(err);
  }
};

export const decodeRefreshToken = async (refreshToken) => {
  try {
    const decode = await jwt.verify(refreshToken, REFRESH_TOKEN_KEY);
    return decode;
  } catch (error) {
    return null;
  }
};

export const generateResetPasswordToken = (
  payload,
  secret,
  expiresIn = '30m',
) => {
  const token = jwt.sign(payload, secret, { expiresIn });
  return token;
};

export const decodeResetPasswordToken = async (token, secret) => {
  const decoded = await jwt.verify(token, secret);
  return decoded;
};

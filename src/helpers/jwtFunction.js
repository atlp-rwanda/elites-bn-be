import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


const ACCESS_TOKEN_KEY = process.env.JWT_SECRETE_KEY;
const REFRESH_TOKEN_KEY = process.env.JWT_SECRETE_REFRESH_KEY;

export const generateAccessToken = (payload, expiresIn = '1d') => {
  const token = jwt.sign(payload, ACCESS_TOKEN_KEY, { expiresIn });
  return token;
};

export const generateRefreshToken = (payload) => {
  const refreshToken = jwt.sign({ ...payload }, REFRESH_TOKEN_KEY, { expiresIn: '7d' });
  return refreshToken;
};

export const decodeAcessToken = async (token) => {
  const decoded = await jwt.verify(token, ACCESS_TOKEN_KEY);
  return decoded;
};


export const decodeRefreshToken = async (refreshToken) => {
  try {
    const decode = await jwt.verify(refreshToken, REFRESH_TOKEN_KEY);
    return decode;
  } catch (error) {
    return null;
  }
}


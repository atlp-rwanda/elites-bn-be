import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const ACCESS_TOKEN_KEY = process.env.JWT_SECRETE_KEY;
const REFRESH_TOKEN_KEY = process.env.JWT_SECRETE_REFRESH_KEY;

<<<<<<< HEAD
<<<<<<< HEAD
const ACCESS_TOKEN_KEY = process.env.JWT_SECRETE_KEY;
const REFRESH_TOKEN_KEY = process.env.JWT_SECRETE_REFRESH_KEY;

export const generateAccessToken = (payload, expiresIn = '1d') => {
  const token = jwt.sign(payload, ACCESS_TOKEN_KEY, { expiresIn });
=======

export const generateAccessToken = (payload, expiresIn = '1d') => {
  const token = jwt.sign(payload , ACCESS_TOKEN_KEY, { expiresIn });
>>>>>>> f3b7c66 (changes on fb and google login)
=======
export const generateAccessToken = (payload, expiresIn = '1d') => {
  const token = jwt.sign(payload, ACCESS_TOKEN_KEY, { expiresIn });
>>>>>>> ec439fb (updated fb and google login)
  return token;
};

export const generateRefreshToken = (payload) => {
<<<<<<< HEAD
<<<<<<< HEAD
  const refreshToken = jwt.sign({ ...payload }, REFRESH_TOKEN_KEY, { expiresIn: '7d' });
=======
  const refreshToken = jwt.sign({ ...payload },REFRESH_TOKEN_KEY ,{ expiresIn : '7d'});
>>>>>>> f3b7c66 (changes on fb and google login)
=======
  const refreshToken = jwt.sign({ ...payload }, REFRESH_TOKEN_KEY, { expiresIn: '7d' });
>>>>>>> ec439fb (updated fb and google login)
  return refreshToken;
};

export const decodeAcessToken = async (token) => {
  const decoded = await jwt.verify(token, ACCESS_TOKEN_KEY);
  return decoded;
};

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> ec439fb (updated fb and google login)
export const decodeRefreshToken = async (refreshToken) => {
  try {
    const decode = await jwt.verify(refreshToken, REFRESH_TOKEN_KEY);
    return decode;
  } catch (error) {
    return null;
  }
<<<<<<< HEAD
};
=======


export const decodeRefreshToken = async (refreshToken) => {  
try {
  const decode = await jwt.verify(refreshToken, REFRESH_TOKEN_KEY)
  return decode
} catch (error) {
  return null
}
};

>>>>>>> f3b7c66 (changes on fb and google login)
=======
};
>>>>>>> ec439fb (updated fb and google login)

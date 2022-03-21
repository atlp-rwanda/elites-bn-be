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
	const refreshToken = jwt.sign({ ...payload }, REFRESH_TOKEN_KEY, {
		expiresIn: '7d',
	});
	return refreshToken;
};

export const decodeAcessToken = async (token) => {
	const decoded = await jwt.verify(token, ACCESS_TOKEN_KEY);
	return decoded;
};

<<<<<<< HEAD
export const decodeRefreshToken = async (refreshToken) => {  
try {
  const decode = await jwt.verify(refreshToken, REFRESH_TOKEN_KEY)
  return decode
} catch (error) {
  return null
}
=======
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
	expiresIn = '30m'
) => {
	const token = jwt.sign(payload, secret, { expiresIn });
	return token;
};

export const decodeResetPasswordToken = async (token, secret) => {
	const decoded = await jwt.verify(token, secret);
	return decoded;
>>>>>>> 19ee691 (This is a combination of 9 commits)
};



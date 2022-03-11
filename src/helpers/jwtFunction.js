import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()

const secret = process.env.JWT_SECRETE_KEY;
const secrets = process.env.JWT_SECRETE_REFRESH_KEY;

export const generateToken = (payload, expiresIn = '15s') => {
  const token = jwt.sign({ ...payload }, secret, { expiresIn });
  return token;
};

export const generateRefreshToken = (payload) => {
  const refreshToken = jwt.sign({ ...payload }, secrets,{ expiresIn : '7d'});
  return refreshToken;
};

export const decodeToken = async (token) => {
  const decoded = await jwt.verify(token, secret);
  return decoded;
};

// export const decodegenerateRefreshToken = async (refreshToken) => {
//   const decode = await jwt.verify(refreshToken, secrets);
//   return decode;
// };

export const verifyRefreshToken= async (refreshToken)=>{
  return new Promise((resolve,reject)=>{
    jwt.verify(refreshToken.process.env.JWT_SECRETE_REFRESH_KEY,(error,payload)=>{
      if(error) return reject (createError.Unauthorized());
      const id = payload.exist
      // console.log(id)
      resolve(id)
    })
  })
}

export const decodegenerateRefreshToken = async (refreshToken) => {  
try {
  const decode = await jwt.verify(refreshToken, secrets)
  return decode

} catch (error) {
  return null
}

};



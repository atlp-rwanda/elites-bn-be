import 'dotenv/config';
import jwt from 'jsonwebtoken';
import models from '../models';
import { generateToken, generateRefreshToken } from '../helpers/jwtFunction';
import { verifyRefreshToken } from '../helpers/jwtFunction';

export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (token == null)
      return res.status(403).json({
        status: 403,
        error: 'You are not authorized, Please login'
      });
    jwt.verify(token, process.env.JWT_SECRETE_KEY, (error, payload) => {
      if (error.name == 'TokenExpiredError') {
        const refreshToken = req.headers.refreshtoken;
        // check if a refresh token is in table refreshToken db
        const refreshtokensExist = models.refreshTokenTable.findOne({ where: { refreshToken: refreshtoken } });
        if (refreshtokensExist) {
          const isValid = generateRefreshToken(req.headers.refreshToken, refreshtokensExist.refreshtoken)
          if (!isValid) {
            //if not  send 403
            jwt.verify(refreshToken.process.env.JWT_SECRETE_REFRESH_KEY,(error,payload)=>{
              if(error)
               return res.status(403).json({
                  status: 403,
                  error: 'You are not authorized, Please login expired token'
                })
             
            })
         
          }

          //extract payload from refresh token and make a new access token
          else {
            //generate a new acccess token
            const userId = verifyRefreshToken(refreshToken)
            const accessToken = generateToken(userId)
            const refToken = generateRefreshToken(userId)
            //set authorization header with a new bearer access token(req.headers.authorization = new accessToken) then next()
            req.headers.authorization = new accessToken;
          }
        }


        next();

      }

      if (error) {
        const { JsonWebTokenError, name } = error
        // console.log(JsonWebTokenError, name)
        return res.status(403).json({
          status: 403,
          error
        })

      }

      next();
    })

  } catch (error) {
    // console.log(error)
    return res.status(401).json({
      status: 401,
      error: 'You are not authorized, Please login'
    });
  }
};



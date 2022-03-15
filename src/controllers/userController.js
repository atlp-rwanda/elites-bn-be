import {
  USER_EXIST, USER_REGISTERED, USER_LOGIN, INVALID_LOGIN, SERVER_ERROR
} from '../constants/user-constants';
import { hashPassword, comparePassword } from '../helpers/passwordSecurity';
import { generateAccessToken, generateRefreshToken, decodeRefreshToken } from '../helpers/jwtFunction'
import { userExist, createUser, createArticles } from '../services/userServices.js';
import  models  from '../models'

import { ConflictsError } from '../httpErrors/conflictError';

export class UserControllers {
  // register a user
  async registerUser(req, res, next) {
    try {
      // Check if user exists
      const exist = await userExist(req.body.email);
      if (exist) {
        throw new ConflictsError(`User with this email: "${req.body.email}" already exist please a different email`);
      } else {
        req.body.password = await hashPassword(req.body.password);
        const createdUser = await createUser(req.body);
        const token = await generateAccessToken({ id: createdUser.id });
        res.status(201).json({ status: 201, message: USER_REGISTERED, payload: { accessToken: token, user: createdUser } });
        
      }
    } catch (err) {
      next(err);
    }
  }

  async login(req, res) {
    //login a user
    try {
      const userInfo = await userExist(req.body.email)
      if (!userInfo) {
        return res.status(401).json({ status: 401, message: INVALID_LOGIN });
        
      }
      const valid = await comparePassword(req.body.password, userInfo.password)
      if (!valid) {
        return res.status(401).json({ status: 401, message: "Invalid credentials" })
      }
      const {password,createdAt,updatedAt ,...userPayload} = userInfo
      const token = await generateAccessToken(userPayload);
      const refreshToken = await generateRefreshToken(userPayload);
      await models.refreshTokenTable.create({refreshToken});
      return res.status(200).json({ status: 200, message: USER_LOGIN, payload: { accesstoken: token, refreshToken } });
    } catch (err) {
      next(err)
    }

  }

  async createArticle(req, res) {
    // using post end point to check authentication
    try {
      const article = {
        title: req.body.title,
        content: req.body.content,
      };
      const newArticle = await createArticles(article);
      res.status(200).json({ status: 200, message: 'Article created successfully', newArticle });
    } catch (err) {
      next(err)
    }
  }

 //using access token to generate refresh token
 async refreshTokens (req, res){
  try {
    const { refreshToken } = req.body
    if (!refreshToken) 
    return res.status(400).json({ status: 400, message: "Bad request" })
    const payloadToken = await decodeRefreshToken(refreshToken)
    const {iat,exp,...newPayloadToken}= payloadToken
    // console.log(payloadToken)
    const accessToken = await generateAccessToken(newPayloadToken)
    const refToken = await  generateRefreshToken(newPayloadToken)
    res.status(200).json({ status: 200, message: "Access token created sussccefully", payload: { accessToken: accessToken, refreshToken: refToken}  })
  } catch (err) {
    next(err)
    
  }
}
}

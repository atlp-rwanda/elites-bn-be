import { USER_REGISTERED, USER_LOGIN } from '../constants/user-constants.js';
import { hashPassword, comparePassword } from '../helpers/passwordSecurity.js';
import { generateAccessToken, generateRefreshToken, decodeRefreshToken } from '../helpers/jwtFunction.js';
import { userExist, createUser, createArticles } from '../services/userServices.js';
import models from '../models';

import { ConflictsError } from '../httpErrors/conflictError.js';
import { UnauthorizedError } from '../httpErrors/unauthorizedError.js';

export class UserControllers {
  // register a user
  async registerUser(req, res, next) {
    try {
      // Check if user exists
      
      const userEmailExist = await userExist(req.body.email);
      if (userEmailExist) {
        throw new ConflictsError(`User with this email: "${req.body.email}" already exist please a different email`);
      } else {
        req.body.password = await hashPassword(req.body.password);
        const createdUser = await createUser(req.body);
        const {
          password, createdAt, updatedAt, ...newcreatedUser
        } = createdUser;
        const token = await generateAccessToken({ newcreatedUser});
        res.status(200).json({
          status: 200,
          message: USER_REGISTERED,
          payload: { accessToken: token }
        });
      }
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    // login a user
    try {
      const userInfo = await userExist(req.body.email);
      if (!userInfo) {
        throw new UnauthorizedError();
      }
      const valid = await comparePassword(req.body.password, userInfo.password);
      if (!valid) {
        throw new UnauthorizedError();
      }
      const {
        password, createdAt, updatedAt, ...userPayload
      } = userInfo;
      const token = await generateAccessToken(userPayload);
      const refreshToken = await generateRefreshToken(userPayload);
      await models.refreshTokenTable.create({ refreshToken });
      return res.status(200).json({ status: 200, message: USER_LOGIN, payload: { accesstoken: token, refreshToken } });
    } catch (err) {
      next(err);
    }
  }

  async createArticle(req, res, next) {
    // using post end point to check authentication
    try {
      const article = {
        title: req.body.title,
        content: req.body.content,
      };
      const newArticle = await createArticles(article);
      res.status(200).json({ status: 200, message: 'Article created successfully', payload:{newArticle} });
    } catch (err) {
      next(err);
    }
  }

  async refreshTokens(req, res, next) {
    // using access token to generate refresh token
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) 
      return res.status(400).json({ status: 400, message: 'Bad request' });
      const payloadToken = await decodeRefreshToken(refreshToken);
      const { iat, exp, ...newPayloadToken } = payloadToken;
      // console.log(payloadToken)
      const accessToken = await generateAccessToken(newPayloadToken);
      const refToken = await generateRefreshToken(newPayloadToken);
      res.status(200).json({ status: 200, message: 'Access token created sussccefully', payload: { accessToken, refreshToken: refToken } });
    } catch (err) {
      next(err);
    }
  }
}

<<<<<<< HEAD
/* eslint-disable consistent-return */
import { USER_REGISTERED, USER_LOGIN } from '../constants/user-constants';
=======
<<<<<<< HEAD
import {
  USER_EXIST, USER_REGISTERED, USER_LOGIN, INVALID_LOGIN, SERVER_ERROR
} from '../constants/user-constants';
>>>>>>> some changes on linting
import { hashPassword, comparePassword } from '../helpers/passwordSecurity';
import { generateAccessToken, generateRefreshToken, decodeRefreshToken } from '../helpers/jwtFunction';
import { userExist, createUser } from '../services/userServices';
import models from '../models';

import { ConflictsError } from '../httpErrors/conflictError';
<<<<<<< HEAD
import { UnauthorizedError } from '../httpErrors/unauthorizedError';
=======
=======
import { USER_EXIST, USER_REGISTERED } from '../constants/user-constants';
import { hashPassword } from '../helpers/passwordSecurity';
import { userExist, createUser } from '../services/userServices.js';
>>>>>>> some changes on linting
>>>>>>> some changes on linting

// eslint-disable-next-line import/prefer-default-export
export class UserControllers {
  // eslint-disable-next-line class-methods-use-this
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
        const token = await generateAccessToken({ id: newcreatedUser.id });
        const refreshToken = await generateRefreshToken({ id: newcreatedUser.id });
        res.status(200).json({
          status: 200,
          message: USER_REGISTERED,
          payload: { accessToken: token, refleshToken: refreshToken },
        });
      }
    } catch (err) {
      next(err);
    }
  }

  // eslint-disable-next-line class-methods-use-this
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
      const userPayload = { id: userInfo.id };
      const token = await generateAccessToken(userPayload);
      const refreshToken = await generateRefreshToken(userPayload);
      await models.refreshTokenTable.create({ refreshToken });
      return res.status(200).json({
        status: 200, message: USER_LOGIN, payload: { accesstoken: token, refreshToken },
      });
    } catch (err) {
      next(err);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async refreshTokens(req, res, next) {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) return res.status(400).json({ status: 400, message: 'Bad request' });
      const payloadToken = await decodeRefreshToken(refreshToken);
      const newPayloadToken = { id: payloadToken.id };
      const accessToken = await generateAccessToken(newPayloadToken);
      const refToken = await generateRefreshToken(newPayloadToken);
      return res.status(200).json({ status: 200, message: 'Access token created sussccefully', payload: { accessToken, refreshToken: refToken } });
    } catch (err) {
      next(err);
    }
  }
}

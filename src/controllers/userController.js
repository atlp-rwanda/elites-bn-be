/* eslint-disable consistent-return */
import { USER_REGISTERED, USER_LOGIN } from '../constants/user-constants';
import { hashPassword, comparePassword } from '../helpers/passwordSecurity';
import { generateAccessToken, generateRefreshToken, decodeRefreshToken } from '../helpers/jwtFunction';
import { userExist, createUser,updatedRole } from '../services/userServices';
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> 54dcd28 (added update role)
=======
>>>>>>> 10644c0 (updated tests)
import models from '../models';

import { ConflictsError } from '../httpErrors/conflictError';
import { UnauthorizedError } from '../httpErrors/unauthorizedError';

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

<<<<<<< HEAD

  async updateRole(req, res) {
    try {
      const email = req.body.email;
      const user = await userExist(email);

      if (user == null) {
        res.status(400).json({ message: "User does not exist! " });
        return false;
      } else {
        const updatedUser = await updatedRole(req.params.id, email)
        
        if(updatedUser == null){
          return res.status(400).json({ message: "this role does not exist" });
        }
        return res.status(200).json({ message:updatedUser})
        }
    } catch (err) {
      next(err)
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
  

=======
>>>>>>> 10644c0 (updated tests)

  async updateRole(req, res) {
    try {
      const email = req.body.email;
      const user = await userExist(email);

      if (user == null) {
        res.status(400).json({ message: "User does not exist! " });
        return false;
      } else {
        const updatedUser = await updatedRole(req.params.id, email)
        
        if(updatedUser == null){
          return res.status(400).json({ message: "this role does not exist" });
        }
        return res.status(200).json({ message:updatedUser})
        }
    } catch (error) {
      return res.status(500).json({ message: error });
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

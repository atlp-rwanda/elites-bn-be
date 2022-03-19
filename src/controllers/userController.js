/* eslint-disable consistent-return */
import validator from 'validator';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { USER_REGISTERED, USER_LOGIN } from '../constants/user-constants';
import { hashPassword, comparePassword } from '../helpers/passwordSecurity';
<<<<<<< HEAD
import {
  generateAccessToken,
  generateRefreshToken,
  decodeRefreshToken,
  generateResetPasswordToken,
  decodeResetPasswordToken,
} from '../helpers/jwtFunction';
import {
  userExist,
  createUser,
  updatedRole,
  userById,
  updateUserPassword,
} from '../services/userServices';
=======
import { generateAccessToken, generateRefreshToken, decodeRefreshToken } from '../helpers/jwtFunction';
import { userExist, createUser, updatedRole } from '../services/userServices';
>>>>>>>  This is a combination of 11 commits.

import { sendEmail } from '../services/send-email-service';
import { verificationEmail } from '../template/verify-email-template';
import models from '../models';
import sendResetEmail from '../helpers/sendEmail';

import { ConflictsError } from '../httpErrors/conflictError';
import { UnauthorizedError } from '../httpErrors/unauthorizedError';
<<<<<<< HEAD
import makeTemplate from '../template/emailTemplate';
import { BaseError } from '../httpErrors/baseError';
=======
import jwt from 'jsonwebtoken';
import {config }from 'dotenv'
>>>>>>>  This is a combination of 11 commits.

config();

// eslint-disable-next-line import/prefer-default-export
export class UserControllers {
  // eslint-disable-next-line class-methods-use-this
  async registerUser(req, res, next) {
    try {
      // Check if user exists
      const userEmailExist = await userExist(req.body.email);
      if (userEmailExist) {
        throw new ConflictsError(
          `User with this email: "${req.body.email}" already exist please a different email`,
        );
      } else {
        req.body.password = await hashPassword(req.body.password);
        const createdUser = await createUser(req.body);
        const {
          password, createdAt, updatedAt, ...newcreatedUser
        } = createdUser;
<<<<<<< HEAD
        const token = await generateAccessToken({ id: createdUser.id });
        const refreshToken = await generateRefreshToken({
          id: newcreatedUser.id,
        });

        const email = {
          to: createdUser.email,
          subject: 'Barefoot verification Email',
          from: process.env.SENDGRID_EMAIL,
          text: `Hello  ${createdUser.names}`,
          html: await verificationEmail(token),
        };
        await sendEmail(email);
=======
        
        const token = await generateAccessToken({ id: createdUser.id });
        const refreshToken = await generateRefreshToken({ id: newcreatedUser.id });

          
    const email = {to: createdUser.email,
    subject: 'Barefoot verification Email',
    from: process.env.SENDGRID_EMAIL,
    text: `Hello  ${createdUser.names}`,
    html: await verificationEmail(token),}
    await sendEmail(email)
>>>>>>>  This is a combination of 11 commits.

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

  // create verifyUser
<<<<<<< HEAD
  // eslint-disable-next-line class-methods-use-this
  async verifyNewUser(req, res) {
=======
  async verifyNewUser(req, res) {
    
>>>>>>>  This is a combination of 11 commits.
    try {
      const { token } = req.params;
      const userInfo = jwt.verify(token, process.env.JWT_SECRETE_KEY);
      const userId = userInfo.id;
<<<<<<< HEAD
      const isVerified = true;
      models.User.update({ verified: isVerified }, { where: { id: userId } });
      return res.status(200).send({ message: 'Account verified!' });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }

=======
      const isVerified=true;
      models.User.update({ verified: isVerified }, { where: { id: userId } })
      return res
        .status(200)
        .send({  message: 'Account verified!' });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: error.message });
    }
}
>>>>>>>  This is a combination of 11 commits.
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
        status: 200,
        message: USER_LOGIN,
        payload: { accesstoken: token, refreshToken },
      });
    } catch (err) {
      next(err);
    }
  }

<<<<<<< HEAD
  // eslint-disable-next-line class-methods-use-this
  async updateRole(req, res, next) {
=======
  async updateRole(req, res) {
>>>>>>>  This is a combination of 11 commits.
    try {
      const { email } = req.body;
      const user = await userExist(email);
      if (user == null) {
        res.status(400).json({ message: 'User does not exist! ' });
        return false;
      }
      const updatedUser = await updatedRole(req.params.id, email);

      if (updatedUser == null) {
        return res.status(400).json({ message: 'this role does not exist' });
      }
      return res.status(200).json({
        message: {
<<<<<<< HEAD
          newRole: updatedUser.roleId,
          userId: updatedUser.id,
          email: updatedUser.email,
          names: updatedUser.names,
          managerId: updatedUser.managerId,
=======
          newRole: updatedUser.roleId, userId: updatedUser.id, email: updatedUser.email, names: updatedUser.names, managerId: updatedUser.managerId,
>>>>>>>  This is a combination of 11 commits.
        },
      });
    } catch (err) {
      next(err);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async refreshTokens(req, res, next) {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        return res.status(400).json({ status: 400, message: 'Bad request' });
      }
      const payloadToken = await decodeRefreshToken(refreshToken);
      const newPayloadToken = { id: payloadToken.id };
      const accessToken = await generateAccessToken(newPayloadToken);
      const refToken = await generateRefreshToken(newPayloadToken);
      return res.status(200).json({
        status: 200,
        message: 'Access token created sussccefully',
        payload: { accessToken, refreshToken: refToken },
      });
    } catch (err) {
      next(err);
    }
  }

<<<<<<< HEAD
  // eslint-disable-next-line class-methods-use-this
=======
>>>>>>>  This is a combination of 11 commits.
  async authGoogleLogin(req, res, next) {
    try {
      const token = await generateAccessToken({ id: req.user.id });
      const refreshToken = await generateRefreshToken({ id: req.user.id });
      await models.refreshTokenTable.create({ refreshToken });
<<<<<<< HEAD
      res.status(201).json({
        status: 201,
        message: 'Succesfully logged in with Google!',
        payload: { accesstoken: token, refreshToken },
      });
=======
      res.status(201).json({ status: 201, message: 'Succesfully logged in with Google!', payload: { accesstoken: token, refreshToken } });
>>>>>>>  This is a combination of 11 commits.
    } catch (err) {
      next(err);
    }
  }

<<<<<<< HEAD
  // eslint-disable-next-line class-methods-use-this
=======
>>>>>>>  This is a combination of 11 commits.
  async authFacebookLogin(req, res, next) {
    try {
      const token = await generateAccessToken({ id: req.user.id });
      const refreshToken = await generateRefreshToken({ id: req.user.id });
      await models.refreshTokenTable.create({ refreshToken });
<<<<<<< HEAD
      res.status(201).json({
        status: 201,
        message: 'Succesfully logged in with Facebook!',
        payload: { accesstoken: token, refreshToken },
      });
=======
      res.status(201).json({ status: 201, message: 'Succesfully logged in with Facebook!', payload: { accesstoken: token, refreshToken } });
>>>>>>>  This is a combination of 11 commits.
    } catch (err) {
      next(err);
    }
  }
<<<<<<< HEAD
=======
}
>>>>>>>  This is a combination of 11 commits.

  // eslint-disable-next-line class-methods-use-this
  async sendResetLink(req, res, next) {
    try {
      const { email } = req.body;
      const user = await userExist(email);
      if (!email) {
        throw new BaseError('Bad request', 400, 'Email is required');
      }
      if (!validator.isEmail(email)) {
        throw new BaseError(
          'Bad request',
          400,
          'Please Enter a valid email address',
        );
      }
      if (!user) {
        throw new BaseError(
          'Not found',
          404,
          'The account with provided email is not registered',
        );
      }
      const payload = {
        id: user.id,
      };
      const secret = process.env.JWT_SECRET_KEY;

      const token = await generateResetPasswordToken(payload, secret);
      const link = `${req.protocol}://localhost:3000/api/v1/users/reset-password/${token}`;
      await sendResetEmail(
        email,
        'ihonore01@gmail.com',
        'Barefoot Nomad password reset',
        makeTemplate(link),
      );
      return res.status(200).send({
        status: 200,
        message: `Password reset link has been successfully sent to ${email}`,
      });
    } catch (err) {
      next(err);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async resetPassword(req, res, next) {
    try {
      const { password, confirmPassword } = req.body;
      if (password !== confirmPassword) {
        throw new BaseError(
          'Bad request',
          400,
          'Entered passwords do not match',
        );
      }
      const { token } = req.params;

      const secret = process.env.JWT_SECRET_KEY;
      const decoded = await decodeResetPasswordToken(token, secret);
      const user = await userById(decoded.id);

      const hash = await hashPassword(password);
      const updatedUser = await updateUserPassword(decoded.id, user.email, {
        password: hash,
      });

      if (updatedUser) {
        return res.status(200).send({
          status: 200,
          message: 'The password has been reset successfully',
        });
      }
    } catch (err) {
      next(err);
    }
  }
}

/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { USER_REGISTERED, USER_LOGIN } from '../constants/user-constants';
import { hashPassword, comparePassword } from '../helpers/passwordSecurity';
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
  notificationsOptOut,
  notificationsOptIn,
  getAllUser,
  fetchRole,
} from '../services/userServices';

import { sendEmail } from '../services/send-email-service';
import { verificationEmail } from '../template/verify-email-template';
import models from '../models';
import { sendResetEmail } from '../helpers/sendEmail';

import { ConflictsError } from '../httpErrors/conflictError';
import { UnauthorizedError } from '../httpErrors/unauthorizedError';
import makeTemplate from '../template/emailTemplate';
import { BaseError } from '../httpErrors/baseError';

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
          `User with this email: "${req.body.email}" already exist please a different email`
        );
      } else {
        req.body.password = await hashPassword(req.body.password);
        const createdUser = await createUser(req.body);
        const { password, createdAt, updatedAt, ...newcreatedUser } =
          createdUser;
        const token = await generateAccessToken({
          id: createdUser.id,
          role: createdUser.roleId,
        });
        const refreshToken = await generateRefreshToken({
          id: newcreatedUser.id,
          role: newcreatedUser.roleId,
        });

        const email = {
          to: createdUser.email,
          subject: 'Barefoot verification Email',
          from: process.env.SENDGRID_EMAIL,
          text: `Hello  ${createdUser.names}`,
          html: await verificationEmail(token),
        };
        await sendEmail(email);

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
  // eslint-disable-next-line class-methods-use-this
  async verifyNewUser(req, res, next) {
    try {
      const { token } = req.params;
      const userInfo = jwt.verify(token, process.env.JWT_SECRETE_KEY);
      const userId = userInfo.id;
      const user = await models.User.findOne({ where: { id: userId } });

      const isVerified = true;
      if (user.verified) {
        return res.status(409).send({
          status: 409,
          message: 'Account is already verified!',
        });
        // throw new ConflictsError('The account is already verified');
      }
      models.User.update({ verified: isVerified }, { where: { id: userId } });
      return res.status(200).send({ message: 'Account verified!' });
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
      } else if (userInfo.verified) {
        const userPayload = { id: userInfo.id, role: userInfo.roleId };
        const token = await generateAccessToken(userPayload);
        const refreshToken = await generateRefreshToken(userPayload);
        await models.refreshTokenTable.create({ refreshToken });
        return res.status(200).json({
          status: 200,
          message: USER_LOGIN,
          payload: { accesstoken: token, refreshToken },
        });
      } else {
        throw new UnauthorizedError('Please verify your email');
      }
    } catch (err) {
      next(err);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async fetchAllUsers(req, res, next) {
    try {
      const users = await getAllUser(); 
      return res.status(200).json({ status: 200, message: 'users retrieved successfully', payload: users })
    } catch (err) {
      next(err);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async fetchAllRoles(req, res, next) {
    try {
      const roles = await fetchRole(); 
      return res.status(200).json({ status: 200, message: 'users retrieved successfully', payload: roles })
    } catch (err) {
      next(err);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async updateRole(req, res, next) {
    try {
      const { email } = req.body;
      const user = await userExist(email);
      if (user == null) {
        res.status(400).json({
          status: 400,
          message: 'User does not exist! ',
        });
        return false;
      }
      const updatedUser = await updatedRole(req.params.id, email);

      if (updatedUser == null) {
        return res.status(400).json({
          status: 400,
          message: 'this role does not exist',
        });
      }
      return res.status(200).json({
        status: 200,
        message: {
          newRole: updatedUser.roleId,
          userId: updatedUser.id,
          email: updatedUser.email,
          names: updatedUser.names,
          managerId: updatedUser.managerId,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async refreshTokens(id, req, res, next) {
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

  // eslint-disable-next-line class-methods-use-this
  async authGoogleLogin(req, res, next) {
    try {
      const token = await generateAccessToken({
        id: req.user.id,
        role: req.user.role,
      });
      const refreshToken = await generateRefreshToken({
        id: req.user.id,
        role: req.user.role,
      });
      await models.refreshTokenTable.create({ refreshToken });
      // res.status(201).json({
      //   status: 201,
      //   message: 'Succesfully logged in with Google!',
      //   payload: { accesstoken: token, refreshToken },
      // });
      res
        .status(201)
        .send(
          `<script> window.location = 'https://elites-bn-muutyv707-elites-team.vercel.app/google/success/${token.replace(
            /\.+/gi,
            '|'
          )}'</script>`
        );
    } catch (err) {
      next(err);
    }
  }
  // {token.replace(/\|+/gi,'.')}

  // eslint-disable-next-line class-methods-use-this
  async authFacebookLogin(req, res, next) {
    try {
      const token = await generateAccessToken({
        id: req.user.id,
        role: req.user.role,
      });
      const refreshToken = await generateRefreshToken({
        id: req.user.id,
        role: req.user.role,
      });
      await models.refreshTokenTable.create({ refreshToken });
      res.status(201).json({
        status: 201,
        message: 'Succesfully logged in with Facebook!',
        payload: { accesstoken: token, refreshToken },
      });
    } catch (err) {
      next(err);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async sendResetLink(req, res, next) {
    try {
      const { email } = req.body;
      const user = await userExist(email);
      if (!user) {
        throw new BaseError(
          'Not found',
          404,
          'The account with provided email is not registered'
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
        makeTemplate(link)
      );
      return res.status(200).send({
        status: 200,
        message: `Password reset link has been successfully sent to ${email}`,
        payload: { token },
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
          'Entered passwords do not match'
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

  async notificationOptOut(id, req, res, next) {
    try {
      const user = await notificationsOptOut(id);
      if (user) {
        res.status(200).json({
          status: 200,
          message: 'You have unsubscribed successfully',
        });
      } else {
        throw new ConflictsError('You are already unsubscribed!');
      }
    } catch (err) {
      next(err);
    }
  }

  async notificationOptIn(id, req, res, next) {
    try {
      const user = await notificationsOptIn(id);
      if (user) {
        res.status(200).json({
          status: 200,
          message: 'You have subscribed successfully',
        });
      } else {
        throw new ConflictsError('You are already subscribed!');
      }
    } catch (err) {
      next(err);
    }
  }

}

import {
  USER_EXIST, USER_REGISTERED, USER_LOGIN, INVALID_LOGIN, SERVER_ERROR
} from '../constants/user-constants';
import { hashPassword, comparePassword } from '../helpers/passwordSecurity';
import { generateToken, generateRefreshToken, verifyRefreshTokens } from '../helpers/jwtFunction';
import {
  userExist, createUser, updateUser, createArticles
} from '../services/userServices.js';
import models from '../models';
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
        const token = await generateToken({ id: createdUser.id });
        res.status(201).json({ status: 201, message: USER_REGISTERED, payload: { accessToken: token, user: createdUser } });
      }
    } catch (err) {
      next(err);
    }
  }

  async login(req, res) {
    // login a user
    try {
      const exist = await userExist(req.body.email);
      if (exist) {
        const valid = await comparePassword(req.body.password, exist.password);
        if (!valid) {
          return res.status(403).json({ status: 403, message: 'Invalid credentials' });
        }
        const token = await generateToken({ id: exist.id });
        const refreshToken = await generateRefreshToken({ id: exist.id });
        const userCreated = await models.refreshTokenTable.create({ refreshToken });
        return res.status(201).json({ status: 201, message: USER_LOGIN, payload: { accesstoken: token, refreshToken } });
      }

      return res.status(403).json({ status: 403, message: INVALID_LOGIN });
    } catch (error) {
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
      res.status(201).json({ status: 201, message: 'Article created successfully', newArticle });
    } catch (error) {
      next(err);
    }
  }

  async refreshTokens(req, res, next) {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) return res.status(403).json({ status: 403, message: 'Bad request' });

      const userId = await verifyRefreshTokens(refreshToken);

      const accessToken = await generateToken(userId);
      const refToken = await generateRefreshToken(userId);
      res.send({ accessToken, refreshToken: refToken });
    } catch (err) {
      next(err);
    }
  }
}

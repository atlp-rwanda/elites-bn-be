import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import model from '../models/index';
import { generateToken, token } from '../helpers/userhelpers';
import { comparePassword, hashPassword } from '../helpers/passwordSecurity';
import { userExist, createUser } from '../services/userServices.js';

dotenv.config();

// const { Users } = model;

/**
 * user controller
 */

export class UserControllers {
  async registerUser(req, res) {
    try {
      const exist = await userExist(req.body.email);
      console.log('exist');
      if (exist) {
        res.status(409).json({
          status: 409,
          message: 'User with this email already exist.',
        });
      } else {
        const {
          username, role, email, password, image
        } = req.body;

        const user = {
          username,
          email,
          role,
          hash: password,
          image: null,
        };
        const createdUser = await createUser(user);

        const { hash, ...newUser } = createdUser.dataValues;

        res.status(201).json({
          status: 201,
          message: 'user registered successfully',
          user: newUser,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error! ' });
    }
  }

  static async login(req, res) {
    try {
      const findUser = await Users.findOne({
        where: { email: req.body.email },
      });

      if (findUser) {
        const { username, email, hash } = findUser.dataValues;
        const userData = { username, email, hash };

        if (bcrypt.compareSync(req.body.password, userData.hash)) {
          const payload = {
            username: userData.username,
            email: userData.email,
          };
          const token = jwt.sign(payload, process.env.SECRET_JWT_KEY, {
            expiresIn: '24h',
          });
          return res.status(200).json({
            message: 'login succesfull',
            user: {
              token,
              email: payload.email,
              username: payload.username,
            },
          });
        }
        return res.status(401).json({
          message: 'incorrect password',
        });
      }
      return res.status(404).json({
        message: `user with email: ${req.body.email} does not exist`,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'internal server error! please try again later',
      });
    }
  }
}

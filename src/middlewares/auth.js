import passport from 'passport';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import models from '../models';

dotenv.config();
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALL_BACKURL,
      // passReqToCallback: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await models.User.findOne({
        where: { email: profile.emails[0].value },
      });
      if (user) {
        jwt.sign({ user }, process.env.JWT_SECRET_KEY, (err, token) => {
          if (err) {
            return err;
          }

          return done(null, token);
        });
      } else {
        const role = await models.Role.findOne({
          where: { name: 'requester' },
        });
        const newUser = await models.User.create({
          email: profile.emails[0].value,
          names: profile.displayName,
          roleId: role.dataValues.id,
        });
        jwt.sign({ newUser }, process.env.JWT_SECRET_KEY, (err, token) => {
          if (err) {
            return err;
          }

          return done(null, token);
        });
      }
    },
  ),
);
passport.use(
  new FacebookStrategy(
    {
      clientID: '464262885339408',
      clientSecret: '3807d297c4216ee50e130ee1265877ad',
      callbackURL: 'https://elites-barefoot-nomad.herokuapp.com/api/v1/users/auth/facebook',

      profileFields: ['emails', 'displayName'],
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await models.User.findOne({
        where: { email: profile.emails[0].value },
      });
      if (user) {
        jwt.sign({ user }, process.env.JWT_SECRET_KEY, (err, token) => {
          if (err) {
            return err;
          }

          return done(null, token);
        });
      } else {
        const role = await models.Role.findOne({
          where: { name: 'requester' },
        });
        const newUser = await models.User.create({
          email: profile.emails[0].value,
          names: profile.displayName,
          roleId: role.dataValues.id,
        });
        jwt.sign({ newUser }, process.env.JWT_SECRET_KEY, (err, token) => {
          if (err) {
            return err;
          }
          return done(null, token);
        });
      }
    },
  ),
);
export default passport;

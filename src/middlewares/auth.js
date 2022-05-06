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
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await models.User.findOne({
        where: { email: profile.emails[0].value },
      });

      if (user) {
        const userId = user.id;

        return done(null, { id: userId, role:user.roleId });
      }
      const role = await models.Role.findOne({
        where: { name: 'requester' },
      });
      const newUser = await models.User.create({
        email: profile.emails[0].value,
        names: profile.displayName,
        roleId: role.dataValues.id,
      });
      const fetchUser = await models.User.findOne({
        where: { email: newUser.email },
      });

      const fetchUserId = fetchUser.id;

      return done(null, { id: fetchUserId ,role: fetchUser.roleId });
    },
  ),
);
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FB_CLIENT_ID,
      clientSecret: process.env.FB_CLIENT_SECRET,
      callbackURL: process.env.FB_CALL_BACKURL,

      profileFields: ['emails', 'displayName'],
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await models.User.findOne({
        where: { email: profile.emails[0].value },
      });
      if (user) {
        const userId = user.id;

        return done(null, { id: userId, role:user.roleId });
      } else {
        const role = await models.Role.findOne({
          where: { name: 'requester' },
        });
        const newUser = await models.User.create({
          email: profile.emails[0].value,
          names: profile.displayName,
          roleId: role.dataValues.id,
        });
        const fetchUser = await models.User.findOne({
          where: { email: newUser.email },
        });
  
        const fetchUserId = fetchUser.id;
  
        return done(null, { id: fetchUserId, role: fetchUser.roleId });
      }
    },
  ),
);
export default passport;

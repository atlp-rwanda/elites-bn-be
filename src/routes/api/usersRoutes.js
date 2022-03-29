import express from 'express';
import { UserControllers } from '../../controllers/userController';
import { userValidation } from '../../validations/users.validation';
import { roleValidate } from '../../validations/roleValidation';
import { isAdmin } from '../../middlewares/isAdmin';
import passport from '../../middlewares/auth';
import { passwordValidation } from '../../validations/resetPassword.validation';

const router = express.Router();
const userControllers = new UserControllers();

router.post('/register', userValidation, userControllers.registerUser);
router.get('/verifyEmail/:token', async (req, res) => {
  await new userControllers.verifyNewUser(req, res);
});
router.post('/login', userControllers.login);
router.post('/refreshtoken', userControllers.refreshTokens);
router.patch(
  '/updateRole/:id',
  roleValidate,
  isAdmin,
  userControllers.updateRole
);
router.post('/forgot-password', userControllers.sendResetLink);
router.patch(
  '/reset-password/:token',
  passwordValidation,
  userControllers.resetPassword
);

router.get(
  '/auth/google',
  passport.authenticate('google', {
    session: false,
    scope: ['email', 'profile'],
    prompt: 'select_account',
  })
);

router.get(
  '/auth/google/login',
  passport.authenticate('google', {
    session: false,
    failureRedirect: 'auth/google/failed',
  }),
  userControllers.authGoogleLogin
);

router.get('/auth/google/failed', (req, res) => {
  res.send('oops!failed to login with Google');
});

router.get(
  '/auth/facebook',
  passport.authenticate('facebook', {
    session: false,
    scope: ['email', 'public_profile'],
  }),
  userControllers.authFacebookLogin
);

router.get('/auth/facebook/failed', (req, res, next) => {
  res.send('oops!failed to login with Facebook');
});

router.get(
  '/auth/google',
  passport.authenticate('google', {
    session: false,
    scope: ['email', 'profile'],
    prompt: 'select_account',
  })
);

router.get(
  '/auth/google/login',
  passport.authenticate('google', {
    session: false,
    failureRedirect: 'auth/google/failed',
  }),
  userControllers.authGoogleLogin
);

router.get('/auth/google/failed', (req, res) => {
  res.send('oops!failed to login with Google');
});

router.get(
  '/auth/facebook',
  passport.authenticate('facebook', {
    session: false,
    scope: ['email', 'public_profile'],
  }),
  userControllers.authFacebookLogin
);

router.get('/auth/facebook/failed', (req, res) => {
  res.send('oops!failed to login with Facebook');
});

export default router;
import express from 'express';
import { UserControllers } from '../../controllers/userController';
import { userValidation } from '../../validations/users.validation';

const router = express.Router();
const userControllers = new UserControllers();

router.post('/register', userValidation, userControllers.registerUser);
router.post('/login', userControllers.login);
router.post('/refreshtoken', userControllers.refreshTokens);

<<<<<<< HEAD
export default router;
=======
export default router;
>>>>>>>  This is a combination of 11 commits.

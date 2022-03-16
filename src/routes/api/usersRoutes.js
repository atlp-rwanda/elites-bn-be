import express from 'express';
import { UserControllers } from '../../controllers/userController.js';
import { userValidation } from '../../validations/users.validation.js';

const router = express.Router();
const userControllers = new UserControllers();

router.post('/register', userValidation, userControllers.registerUser);
router.post('/login', userControllers.login);
router.post('/refreshtoken', userControllers.refreshTokens);

export default router;

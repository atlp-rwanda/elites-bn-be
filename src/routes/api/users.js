import express from 'express';
import { UserControllers }from '../../controllers/userController';
import userValidation from '../../validations/userValdation';

const router = express.Router();
const userControllers = new UserControllers()
router.post('/',userValidation, userControllers.registerUser);

export default router;
import express from 'express';
import { UserControllers } from "../../controllers/userController";
import { userValidation } from '../../validation/users/user.validation';

const router = express.Router();
const userControllers = new UserControllers();


router.post('/register', userValidation, userControllers.registerUser);
// router.post('/register',userControllers.registerUser);

export default router;

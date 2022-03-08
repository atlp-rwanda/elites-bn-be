import express from 'express';
import { UserControllers } from '../../controllers/userController';

const router = express.Router();
const userControllers = new UserControllers();

router.post('/register', userControllers.registerUser);

export default router;

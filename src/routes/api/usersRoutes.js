import express from 'express';
import { UserControllers } from '../../controllers/userController';
import { authenticate} from '../../middlewares/authenticate';

const router = express.Router();
const userControllers = new UserControllers();

router.post('/register', userControllers.registerUser);
router.post('/login', userControllers.login);
router.patch('/:email',authenticate, userControllers.updateUserInfo)

export default router;

import express from 'express';
import { UserControllers } from '../../controllers/userController';
import { userValidation } from '../../validations/users.validation';
import {roleValidate} from '../../validations/roleValidation'
import { isAdmin } from '../../middlewares/isAdmin';


const router = express.Router();
const userControllers = new UserControllers();

router.post('/register', userValidation, userControllers.registerUser);
router.post('/login', userControllers.login);
router.post('/refreshtoken', userControllers.refreshTokens);
router.patch(
    '/updateRole/:id',roleValidate,isAdmin,
    userControllers.updateRole
)

export default router;

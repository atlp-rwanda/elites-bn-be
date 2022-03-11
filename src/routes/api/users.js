import express from 'express';
import { UserControllers } from '../../controllers/userController';
import {roleValidate} from '../../validation/roleValidation'



const router = express.Router();
const userControllers = new UserControllers();

router.post('/register', userControllers.registerUser);
router.patch(
<<<<<<< HEAD
    '/updateRole/:id',roleValidate,
=======
    '/updateRole',roleValidate,
>>>>>>> 54dcd28 (added update role)
    userControllers.updateRole
)

export default router;

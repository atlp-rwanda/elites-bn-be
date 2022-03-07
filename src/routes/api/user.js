import express from "express";
import { UserControllers } from "../../controllers/userController";

const router = express.Router();
const userControllers = new UserControllers();
router.post("/", userControllers.registerUser);
// router.post('/login', userControllers.login);

export default router;

import express from 'express';
import { Authentication } from '../../controllers/auth.controller.js';
import { authenticate } from '../../middlewares/authenticate.js';
import { verifyToken } from '../../middlewares/verifyToken.js';

const router = express.Router();

router.post('/logout', authenticate, verifyToken, Authentication.logout);

export default router;

import express from 'express';
import { Authentication } from '../../controllers/auth.controller';
import { authenticate } from '../../middlewares/authenticate';
import { verifyToken } from '../../middlewares/verifyToken';

const router = express.Router();

router.post('/logout', authenticate, verifyToken, Authentication.logout);

export default router;

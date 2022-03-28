import express from 'express';
import { TripCommentController } from '../../controllers/tripCommentController';
import { authenticate } from '../../middlewares/authenticate';
import { isRequester } from '../../middlewares/isRequester';

const router = express.Router();

router.delete('/:id', authenticate, isRequester, TripCommentController.delete);

export default router;

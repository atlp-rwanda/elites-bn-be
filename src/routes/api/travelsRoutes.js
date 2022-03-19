import express from 'express'
import { TripCommentController } from '../../controllers/tripCommentController'
import { authenticate } from '../../middlewares/authenticate';
import {isRequester} from '../../middlewares/isRequester'

const router = express.Router()

router.post('/:id/comments' , authenticate, isRequester, TripCommentController.create)
router.delete('/comments/:id' , authenticate, isRequester, TripCommentController.delete)
router.get('/:id/comments' , TripCommentController.findAllByTrip)

export default router
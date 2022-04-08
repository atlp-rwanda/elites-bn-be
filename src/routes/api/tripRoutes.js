import express from 'express';
import { TripControllers } from '../../controllers/tripControllers';
import { requestValidation } from '../../validations/tripRequest/tripValidations';
import { authenticate } from '../../middlewares/authenticate';
import { isManager } from '../../middlewares/isManager';

import { TripCommentController } from '../../controllers/tripCommentController';
import { isRequester } from '../../middlewares/isRequester';

const router = express.Router();
const tripControllers = new TripControllers();

router.post(
  '/',
  requestValidation,
  authenticate,
  tripControllers.createController,
);
router.put('/:id', authenticate, tripControllers.updateRequest);
router.get('/', authenticate, tripControllers.getAllRequests);
router.get('/:id', authenticate, tripControllers.getSingleRequests);
router.delete('/:id', authenticate, tripControllers.deleteRequests);
router.patch(
  '/:id',
  authenticate,
  isManager,
  tripControllers.approveRejectTripRequest,
);

router.post(
  '/:id/comments',
  authenticate,
  isRequester,
  TripCommentController.create,
);
router.get(
  '/:id/comments',
  authenticate,
  isRequester,
  TripCommentController.findAllByTrip,
);

export default router;

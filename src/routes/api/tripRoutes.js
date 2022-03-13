import express from 'express';
import { TripControllers } from '../../controllers/tripControllers';
import { requestValidation } from '../../validations/tripRequest/tripValidations';

const router = express.Router();
const tripControllers = new TripControllers();

router.post(
  '/request/:userId',
  requestValidation,
  tripControllers.createController,
);
router.patch('/request/:userId/:id', tripControllers.updateRequest);
router.get('/allrequest/:userId', tripControllers.getAllRequests);
router.get('/requests/:userId', tripControllers.getRequests);
router.delete('/request/:userId/:id', tripControllers.deleteRequests);

export default router;

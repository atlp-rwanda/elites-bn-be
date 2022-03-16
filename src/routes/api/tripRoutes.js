import express from 'express';
import { TripControllers } from '../../controllers/tripControllers';
import { requestValidation } from '../../validations/tripRequest/tripValidations';
import { authenticate } from '../../middlewares/authenticate';

const router = express.Router();
const tripControllers = new TripControllers();

router.get('/requests/all', authenticate, tripControllers.fetchAllRequest);
router.post(
  '/request/',
  requestValidation,
  tripControllers.createController,
);
router.patch('/requests/:id', authenticate, tripControllers.updateRequest);
router.get('/allrequests/', authenticate, tripControllers.getAllRequests);
router.get('/requests/', authenticate, tripControllers.getRequests);
router.delete('/requests/:id', authenticate, tripControllers.deleteRequests);

export default router;

import express from 'express';
import { TripControllers } from '../../controllers/tripControllers';
import { requestValidation } from '../../validations/tripRequest/tripValidations';
import { authenticate } from '../../middlewares/authenticate';

const router = express.Router();
const tripControllers = new TripControllers();

router.post(
  '/',
  requestValidation,
  authenticate,
  tripControllers.createController,
);
router.patch('/:id', authenticate, tripControllers.updateRequest);
router.get('/', authenticate, tripControllers.getAllRequests);
router.get('/:id', authenticate, tripControllers.getSingleRequests);
// router.get('/requests/', authenticate, tripControllers.getRequests);
router.delete('/:id', authenticate, tripControllers.deleteRequests);

export default router;

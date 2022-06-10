import express from 'express';
import LocationControllers from '../../controllers/locationController';
import { locationValidation } from '../../validations/locationValidation/location.validation';
import { authenticate } from '../../middlewares/authenticate';
import { verifyToken } from '../../middlewares/verifyToken';
import { isTravelAdmin } from '../../middlewares/isTravelAdmin';

const router = express.Router();

const locationController = new LocationControllers();
router.post(
  '/',
  authenticate,
  isTravelAdmin,
  verifyToken,
  locationValidation,
  locationController.createLocation,
);
router.get('/:locationId', locationController.getSingleLocation);
router.get('/', locationController.getAllLocations);
router.get('/mostTravelled/all', locationController.findMostVisitedLocations);
router.patch(
  '/:locationId',
  authenticate,
  isTravelAdmin,
  verifyToken,
  locationController.updateLocation,
);
router.delete(
  '/:locationId',
  authenticate,
  isTravelAdmin,
  verifyToken,
  locationController.deleteLocation,
);

export default router;

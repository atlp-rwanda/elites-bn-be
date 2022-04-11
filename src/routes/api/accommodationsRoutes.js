import express from 'express';
import AccommodationControllers from '../../controllers/accommodationsController';
import { accommodationValidation } from '../../validations/accommodationValidation/accommodation.validation';
import upload from '../../helpers/multer';
import { authenticate } from '../../middlewares/authenticate';
import { verifyToken } from '../../middlewares/verifyToken';
import { isTravelAdmin } from '../../middlewares/isTravelAdmin';

import { AccommodationRatingController } from '../../controllers/accommodationRatingController';
import { hasVisitedAccommodation } from '../../middlewares/hasVisitedAccommodation';
import { accommodationRatingValidation } from '../../validations/accommodationValidation/accommodationRating.validation';

const router = express.Router();

const AccommodationController = new AccommodationControllers();

router.post(
  '/',
  authenticate,
  isTravelAdmin,
  verifyToken,
  upload.array('images', 5),
  accommodationValidation,
  AccommodationController.createAccommodation,
);
router.get('/', AccommodationController.getAllAccommodations);
router.get('/:accommodationId', AccommodationController.getOneAccommodation);
router.get(
  '/in/:locationId',
  AccommodationController.getAccommodationsByLocation,
);
router.patch(
  '/:accommodationId',
  authenticate,
  isTravelAdmin,
  verifyToken,
  upload.array('images', 5),
  AccommodationController.updateAccommodation,
);
router.delete(
  '/:accommodationId',
  authenticate,
  isTravelAdmin,
  verifyToken,
  AccommodationController.deleteAccommodation,
);

router.post(
  '/:id/reviews',
  authenticate,
  hasVisitedAccommodation,
  accommodationRatingValidation,
  AccommodationRatingController.create,
);

router.get(
  '/:id/reviews',
  AccommodationRatingController.findAccommodationRating,
);

export default router;

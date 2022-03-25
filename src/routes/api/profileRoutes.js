import express from 'express';
import ProfileController from '../../controllers/profileControllers';
import upload from '../../helpers/multer';
import { authenticate } from '../../middlewares/authenticate';
import { profileValidation } from '../../validations/profileValidation/profile.validation';

const router = express.Router();
const profileControllers = new ProfileController();

router.post(
  '/',
  upload.single('picture'),
  profileValidation,
  authenticate,
  profileControllers.createController,
);

router.get('/', authenticate, profileControllers.getProfileController);
router.get('/:id', authenticate, profileControllers.getSingleProfile);
router.patch('/', upload.single('picture'), authenticate, profileControllers.updateUserProfile);
router.delete('/', authenticate, profileControllers.deleteProfile);

export default router;

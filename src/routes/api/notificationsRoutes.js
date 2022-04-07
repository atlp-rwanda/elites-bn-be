import express from 'express';
import NotificationControllers from '../../controllers/notificationRoutesController';
import { UserControllers } from '../../controllers/userController';

import { authenticate } from '../../middlewares/authenticate';

const router = express.Router();

const notificationController = new NotificationControllers();
const userController = new UserControllers();

router.get('/', authenticate, notificationController.getAllNotificationsOfUser);
router.get('/:id', authenticate, notificationController.getSingleNotification);
router.get(
  '/unread',
  authenticate,
  notificationController.getUnreadNotifications,
);
router.patch('/unsubscribe', authenticate, userController.notificationOptOut);
router.patch('/subscribe', authenticate, userController.notificationOptIn);
router.delete('/:id', authenticate, notificationController.deleteNotification);
router.delete(
  '/',
  authenticate,
  notificationController.deleteAllNotificationsOfUser,
);

export default router;

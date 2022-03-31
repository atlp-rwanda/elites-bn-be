import notificationServices from '../services/notificationServices';
import { BaseError } from '../httpErrors/baseError';
import {
  FETCH_ERROR,
  DOES_NOT_EXIST,
  NOTIFICATION_FOUND,
} from '../constants/notificationConstant';
import { config } from 'dotenv';
config();

const notificationService = new notificationServices();
class NotificationControllers {
  getAllNotificationsOfUser = async (id, req, res, next) => {
    try {
      const foundNotifications =
        await notificationService.getAllNotificationsOfUser(id);
      if (foundNotifications.length !== 0) {
        return res.status(200).json({
          status: '200',
          message: 'All notifications of given user',
          payload: foundNotifications,
        });
      } else throw new BaseError('Not found', 404, 'No notifications found');
    } catch (err) {
      next(err);
    }
  };

  getSingleNotification = async (id, req, res, next) => {
    try {
      const foundNotification = await notificationService.getSingleNotification(
        req.params.id,
        id
      );
      if (!foundNotification)
        throw new BaseError(
          'Not found',
          404,
          'Notification with that ID does not exists'
        );
      return res.status(200).json({
        status: '200',
        message: 'Notification found',
        payload: foundNotification,
      });
    } catch (err) {
      next(err);
    }
  };

  deleteNotification = async (id, req, res, next) => {
    try {
      const deleteMessage = await notificationService.deleteNotification(
        req.params.id,
        id
      );
      res.status(200).json({ status: 200, message: deleteMessage });
    } catch (err) {
      next(err);
    }
  };

  deleteAllNotificationsOfUser = async (id, req, res, next) => {
    try {
      const deleteMessage =
        await notificationService.deleteAllNotificationsOfUser(id);
      res.status(200).json({ status: 200, message: deleteMessage });
    } catch (err) {
      next(err);
    }
  };

  changestatus = async (req, res, next) => {
    try {
      const updateStatus = await notificationService.updateStatus(req.user.id);

      console.log(updateStatus);
      if (updateStatus) {
        return res.status(200).json({
          message: NOTIFICATION_FOUND,
          data: { updateStatus },
        });
      } else {
        return res.status(400).json({ message: DOES_NOT_EXIST });
      }
    } catch (error) {
      return res.status(500).send({ message: FETCH_ERROR });
    }
  };
}

export default NotificationControllers;

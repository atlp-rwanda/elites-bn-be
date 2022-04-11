import { Notification } from '../models';
import { Op } from 'sequelize';

export const checkAllNotificationsExist = async (id, req, res, next) => {
  const notificationExist = await Notification.findAll({
    where: {
      [Op.and]: [{ userId: id }, { isRead: false }],
    },
  });
  if (!notificationExist) {
    return res.status(404).json({ message: 'No notification you have' });
  } else {
    next();
  }
};

export const checkOneNotificationsExist = async (id, req, res, next) => {
  const notificationExist = await Notification.findOne({
    where: {
      [Op.and]: [{ userId: id }, { isRead: false }, { id: req.params.id }],
    },
  });
  if (!notificationExist) {
    return res.status(404).json({ message: 'No notification you have' });
  } else {
    next();
  }
};

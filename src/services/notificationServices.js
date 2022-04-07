import { Notification } from '../models';

class notificationServices {
  createInAppNotification = async (notification) => {
    const createdNotification = await Notification.create(notification);
    return createdNotification;
  };

  getAllNotificationsOfUser = async (userId) => {
    const notifications = await Notification.findAll({ where: { userId } });
    return notifications;
  };

  getSingleNotification = async (id, userId) => {
    try {
      const foundNotification = await Notification.findOne({
        where: { id, userId },
      });
      return foundNotification;
    } catch (err) {
      console.log(err);
    }
  };
  
  getUnreadNotifications = async (userId) => {
    const notifications = await Notification.findAll({
      where: { userId, isRead: false },
    });
    return notifications;
  };

  deleteNotification = async (id, userId) => {
    const deletedNotification = await Notification.destroy({
      where: { id, userId },
    });
    if (deletedNotification) {
      return 'Notification deleted successfully';
    } else {
      return 'Notification does not exists';
    }
  };

  deleteAllNotificationsOfUser = async (userId) => {
    const deletedNotifications = await Notification.destroy({
      where: { userId },
    });
    if (deletedNotifications) {
      return 'All Notifications deleted successfully';
    } else {
      return 'No notification to delete';
    }
  };
}

export default notificationServices;

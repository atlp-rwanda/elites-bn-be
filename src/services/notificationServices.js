import { Notification } from '../models';

class notificationServices {
  checkIsRead = async (notificationId) => {
    const isExist = await Notification.findOne({
      where: { id: notificationId },
    });

    if (isExist.isRead) {
      return true;
    }
    return false;
  };

  checkIsReadAll = async (id) => {
    const isExist = await Notification.findOne({
      where: { isRead: false, userId: id },
    });

    if (isExist) {
      return true;
    }
    return false;
  };

  createInAppNotification = async (notification) => {
    const createdNotification = await Notification.create(notification);
    return createdNotification;
  };

  getAllNotificationsOfUser = async (userId) => {
    const notifications = await Notification.findAll({
      where: { userId },
      order: [['id', 'DESC']],
    });
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

  markAllAsRead = async (userId) => {
    const updateNotifications = await Notification.update(
      { isRead: true },
      { where: { userId } }
    );

    return updateNotifications;
  };

  markOneAsRead = async (id) => {
    const updateOneNotifications = await Notification.update(
      { isRead: true },
      { where: { id } }
    );
    return updateOneNotifications;
  };
}

export default notificationServices;

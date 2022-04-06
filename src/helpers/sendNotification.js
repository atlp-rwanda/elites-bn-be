import { connectedUsers } from '../helpers/socketio';

export default class SendNotification {
  static async sendNotif(notification, req, content) {
    try {
      if (connectedUsers[notification.userId]) {
        connectedUsers[notification.userId].forEach(async (el) => {
          await req.io
            .to(el)
            .emit('notification', JSON.stringify(notification));
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

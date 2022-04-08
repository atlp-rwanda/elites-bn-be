import dotenv from 'dotenv';
import { Notification } from '../models';
import { decodeAcessToken } from './jwtFunction';

dotenv.config();

export const connectedUsers = {};

export const ioMiddleware = async (socket) => {
  try {
    const { token } = socket.handshake.query;
    const token1 = JSON.parse(token);
    const decoded = await decodeAcessToken(token1);
    if (!decoded.error) {
      if (!connectedUsers[decoded.id]) {
        connectedUsers[decoded.id] = [];
      }
      connectedUsers[decoded.id].push(socket.id);
      socket.emit(
        'initialize',
        JSON.stringify({
          notif: await Notification.findAll({
            where: { userId: decoded.id },
          }),
        }),
      );
      socket.on('disconnect', () => {
        process.stdout.write('a user is disconnected');
        connectedUsers[decoded.id].forEach((el, index, arr) => {
          if (arr[index] === socket.id) {
            arr.splice(index, 1);
          }
        });
      });
    }
  } catch (err) {
    console.log(err);
  }
};

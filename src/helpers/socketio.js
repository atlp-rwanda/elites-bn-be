import dotenv from 'dotenv';
import models from '../models';
import { decodeAcessToken } from '../helpers/jwtFunction';

dotenv.config();

export const connectedUsers = {};

export const ioMiddleware = async (socket) => {
  try {
    const { token } = socket.handshake.headers;
    const decoded = decodeAcessToken(token);
    if (!decoded.error) {
      if (!connectedUsers[decoded.id]) {
        connectedUsers[decoded.id] = [];
      }
      connectedUsers[decoded.id].push(socket.id);
      socket.emit(
        'initialize',
        JSON.stringify({
          notif: await models.Notification.findAll({
            where: { userId: decoded.id },
          }),
        })
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
    if (err.name === 'JsonWebTokenError') {
      socket.emit(
        'initialize',
        JSON.stringify({
          error:
            'The token is not provided or the token provided is an invalid token',
        })
      );
    }
  }
};

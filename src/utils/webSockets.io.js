import { Server } from 'socket.io';
import { addMessage, getMessages } from '../services/chatServices';
import models, { Notification } from '../models';
import { decodeAcessToken } from '../helpers/jwtFunction';

const io = new Server({
  cors: {
    origin: 'http://localhost:3000',
  },
});
let decodedToken;
io.use(async (socket, next) => {
  const { token } = socket.handshake.auth;
  if (token) {
    const accesstoken = JSON.parse(token);
    decodedToken = await decodeAcessToken(accesstoken);
    return next();
  }
  return next(new Error('unable to access token'));
});
let onlineUsers = 0;
const ipsconnected = [];
io.on('connection', async (socket) => {
  const connectedUser = socket.id;
  if (!ipsconnected.hasOwnProperty(connectedUser)) {
    ipsconnected[connectedUser] = 1;
    onlineUsers += 1;
    io.emit('register', onlineUsers);
  }
  const { token } = socket.handshake.auth;
  const accesstoken = JSON.parse(token);
  decodedToken = await decodeAcessToken(accesstoken);
  const findUser = await models.User.findOne({
    where: {
      id: decodedToken.id,
    },
    attributes: {
      exclude: [
        'email',
        'password',
        'roleId',
        'managerId',
        'isActive',
        'createdAt',
        'password',
        'updatedAt',
        'verified',
      ],
    },
  });
  const { names } = findUser;
  io.to(socket.id).emit('subscribe', names);
  const getData = await getMessages();
  io.to(socket.id).emit('message', getData);
  socket.on('disconnect', () => {
    if (ipsconnected.hasOwnProperty(connectedUser)) {
      delete ipsconnected[connectedUser];
      onlineUsers -= 1;
      io.emit('register', onlineUsers);
    }
  });
  socket.on('chat', (data) => {
    const message = {
      postedBy: findUser.id,
      sender: findUser.names,
      message: data.message,
    };
    const addData = addMessage(message);
    io.emit('chat', data);
  });
  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data);
  });
  socket.emit(
    'initialize',
    JSON.stringify({
      notif: await Notification.findAll({
        where: { userId: decodedToken.id },
      }),
    }),
  );
});
export default io;

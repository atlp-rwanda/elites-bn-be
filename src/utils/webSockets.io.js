/* eslint-disable */
import { Server } from 'socket.io';
import { addMessage, getMessages } from '../services/chatServices';
import models from '../models';
import { decodeAcessToken } from '../helpers/jwtFunction';
import requestEventEmitter from '../controllers/notificationEventsController';

const io = new Server({
  cors: {
    origin: [
      'https://elites-bn-gf39mmc5l-elites-team.vercel.app:*',
      'https://elites-bn-fe-git-ft-181339606-notifications-elites-team.vercel.app:*',
      'https://elites-bn-fe.vercel.app:*',
      'https://elites-bn-asgwqvk2i-elites-team.vercel.app:*',
    ],
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  },
});
let decodedToken;
io.use(async (socket, next) => {
  const { token } = socket.handshake.auth;
  if (token) {
    const accesstoken = token;
    decodedToken = await decodeAcessToken(accesstoken);
    return next();
  }
  return next(new Error('unable to access token'));
});

//onlines users for notification

let onlineUsersToNotify = [];

const addNewUser = (userId, socketId) => {
  !onlineUsersToNotify.some((user) => user.userId === userId) &&
    onlineUsersToNotify.push({ userId, socketId });
};

const removeUser = (socketId) => {
  onlineUsersToNotify = onlineUsersToNotify.filter(
    (user) => user.socketId !== socketId
  );
};

const getUser = (userId) => {
  return onlineUsersToNotify.find((user) => user.userId === userId);
};

//online users for chat
let onlineUsers = 0;
const ipsconnected = [];

///////////////////
io.on('connection', async (socket) => {
  console.log('a user connected');
  io.emit('onconnectTesting1');

  const connectedUser = socket.id;
  if (!ipsconnected.hasOwnProperty(connectedUser)) {
    ipsconnected[connectedUser] = 1;
    onlineUsers += 1;
    io.emit('register', onlineUsers);
  }
  const { token } = socket.handshake.auth;
  const accesstoken = token;
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
  const { names, id } = findUser;
  addNewUser(id, socket.id);
  console.log('usersToNofify', onlineUsersToNotify);

  io.to(socket.id).emit('subscribe', names);
  const getData = await getMessages();
  io.to(socket.id).emit('message', getData);
  socket.on('disconnect', () => {
    console.log('a user disconnected');
    removeUser(socket.id);
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
});

//Notification Events
requestEventEmitter.on('sendToastNotification', (userId, body) => {
  const receiver = getUser(userId);
  receiver && io.to(receiver.socketId).emit('getNotification', body);
  console.log(
    `Notification event triggered and is being sent to user ID: ${userId} socket ID: ${receiver?.socketId}`
  );
});

export default io;

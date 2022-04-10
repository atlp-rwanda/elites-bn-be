import { Server } from 'socket.io';
import { addMessage } from '../services/chatServices';
import models from '../models';
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

let flags = 0;
const ipsconnected = [];

io.on('connection', async (socket) => {
  const connectedUser = socket.id;
  if (!ipsconnected.hasOwnProperty(connectedUser)) {
    ipsconnected[connectedUser] = 1;
    flags += 1;
    io.emit('register', flags);
  }
  console.log('👾 New socket connected! >>', socket.id);

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

  socket.on('message', (data) => {
    io.to(socket.id).emit('message', data);
  });

  socket.on('disconnect', () => {
    if (ipsconnected.hasOwnProperty(connectedUser)) {
      delete ipsconnected[connectedUser];
      flags -= 1;
      io.emit('register', flags);
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

export default io;

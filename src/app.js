import express from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import morgan from 'morgan';
import socketio from 'socket.io';
import path from 'path';
import http from 'http';
import routes from './routes/index';
import db from './models/index';
import swaggerDoc from './documentation/index';
import 'dotenv/config';
import { PageNotFoundError } from './httpErrors/pageNotFoundError';
import passport from './middlewares/auth';
import http from 'http';
import { ioMiddleware } from './helpers/socketio';
import { getMessages, addMessage } from './services/chatServices';
import models from './models';

const app = express();

const port = process.env.PORT || 3000;
const mode = process.env.NODE_ENV || 'development';

try {
  const { sequelize } = db;
  if (mode === 'development') {
    sequelize
      .authenticate()
      .then(() => {
        console.log('DEV DB CONNECTED...');
      })
      .catch((err) => {
        console.log('Unable to connect to the database: ', err);
      });
  }
  if (mode === 'test') {
    sequelize
      .authenticate()
      .then(() => {
        console.log('TEST DB CONNECTED...');
      })
      .catch((err) => {
        console.log('Unable to connect to the database: ', err);
      });
  }
  if (mode === 'production') {
    sequelize
      .authenticate()
      .then(() => {
        console.log('PRODUCTION DB CONNECTED...');
      })
      .catch((err) => {
        console.log('Unable to connect to the database: ', err);
      });
  }

  app.use(express.static(path.join(__dirname, 'public')));
  app.set('views', path.join(__dirname, 'template'));
  app.set('view engine', 'ejs');
  app.use(cors());
  app.use(express.json());
  app.use(morgan('dev'));
  app.use(passport.initialize());
  app.use('/api/v1/', routes);
  app.get('/verify', (req, res) => {
    res.render('index');
  });
  app.use('/api/v1/chat', (req, res) => res.send(`${__dirname}/public/`));

  app.use(
    '/docs/swagger-ui/',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDoc, {
      swaggerOptions: {
        docExpansions: 'none',
        persistAuthorization: true,
      },
    }),
  );

  app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
      statusCode,
      name: err.name,
      message: err.message,
      path: req.path,
      error: err.description,
      stack: err.stack,
    });
    next(err);
  });

  const server = http.createServer(app);
  const io = socketio(server, {
    path: '/socket.io',
  });
let flags = 0;
let ipsconnected = [];

  io.on('connection', async (socket) => {
    let connectedUser = socket.id
    if(!ipsconnected.hasOwnProperty(connectedUser)){
      ipsconnected[connectedUser]=1;
      flags++;
      io.emit('register',flags)
    }
    console.log('👾 New socket connected! >>', socket.id);
    const url = socket.handshake.headers.referer.split('?')[1];
    const findUser = await models.User.findOne({
      where: {
        email: url,
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
    io.to(socket.id).emit('subscribe', findUser.names);

    // get past message

    const getData = await getMessages();
    io.to(socket.id).emit('message', getData);

    socket.on('disconnect', () => {
      if(ipsconnected.hasOwnProperty(connectedUser)){
       delete ipsconnected[connectedUser];
        flags--;
        io.emit('register',flags)
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

  server.listen(port, () => {
    console.log('server is running');
  });

  const io = socketio(server);

  io.use(async (socket, next) => {
    ioMiddleware(socket);
    next();
  });

  app.use((req, res, next) => {
    req.io = io;
    next();
  });

  // catch all 404 errors
  app.all('*', (req, res, next) => {
    const err = new PageNotFoundError();
    next(err);
  });
} catch (error) {
  console.log(error);
}

export default app;

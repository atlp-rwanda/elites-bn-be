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
import { ioMiddleware } from './helpers/socketio';
import io from './utils/webSockets.io';

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
  app.use('/public/notification', (req, res) => res.sendFile(`${__dirname}/public/notification.html`));
  app.use('/public/chat', (req, res) => res.sendFile(`${__dirname}/public/login.html`));
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
  io.attach(server);

  server.listen(port, () => {
    console.log('server is running');
  });

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

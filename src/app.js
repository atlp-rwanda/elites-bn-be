import express from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes/index';
import db from './models/index';
import swaggerDoc from '../swagger.json';
import 'dotenv/config';
<<<<<<< HEAD
<<<<<<< HEAD
import { PageNotFoundError } from './httpErrors/pageNotFoundError';
=======
import { PageNotFoundError } from './httpErrors/pageNotFoundError.js';
<<<<<<< HEAD
import passport from './middlewares/auth'


>>>>>>> 986dac3 (login with google and fb)
=======
import passport from './middlewares/auth.js';
>>>>>>> ec439fb (updated fb and google login)
=======
import passport from './middlewares/auth'


>>>>>>> c663a64 (login with google and fb)

const app = express();
 const port =  3000;
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

  app.use(cors());
  app.use(express.json());
  app.use(morgan('dev'));
<<<<<<< HEAD
  app.use(passport.initialize());
=======
  app.use(passport.initialize())
>>>>>>> c663a64 (login with google and fb)
  app.use('/api/v1/', routes);
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

  // catch all 404 errors
  app.all('*', (req, res, next) => {
    const err = new PageNotFoundError();
    next(err);
  });
  app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    // console.log(err);
    res.status(statusCode).json({
      statusCode,
      name: err.name,
      message: err.message,
      path: req.path,
      error: err.description,
<<<<<<< HEAD
      stack: err.stack,
=======
      stack: err.stack
>>>>>>> 2518aab (changes on social auth)
    });
    next(err);
  });

  app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
  });
} catch (error) {
  console.log(error);
}
export default app;

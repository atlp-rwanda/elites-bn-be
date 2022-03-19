import express from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes/index';
import db from './models/index';
import swaggerDoc from './documentation/index';
import 'dotenv/config';
import { PageNotFoundError } from './httpErrors/pageNotFoundError';
<<<<<<< HEAD
import passport from './middlewares/auth';
=======
import path from 'path'
import passport from './middlewares/auth.js';
>>>>>>>  This is a combination of 11 commits.

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

  app.set('views', path.join(__dirname,'template'))
  app.set('view engine', 'ejs')
  app.use(cors());
  app.use(express.json());
  app.use(morgan('dev'));
  app.use(passport.initialize());
  app.use('/api/v1/', routes);
  app.get('/verify',(req, res)=>{
    res.render(`index`)
})

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
      stack: err.stack,
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

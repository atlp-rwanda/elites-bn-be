/* eslint-disable no-console */
import express from 'express';
import cors from 'cors';
import routes from './routes/index';
import db from './models';
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 3000;

try {
  app.use(cors());
  app.use(express.json());
  app.use('/api/v1/', routes);

  const { sequelize } = db;
  sequelize.authenticate().then(() => console.log('Database connected...'));

  app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
  });
} catch (error) {
  console.log(error);
}
export default app;

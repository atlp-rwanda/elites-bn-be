import express from 'express';
import welcomeRoutes from './api/welcomeRoutes';
import usersRoutes from './api/usersRoutes';
import authRoutes from './api/authRoutes';

const routes = express.Router();

routes.use('/', welcomeRoutes);
routes.use('/users', usersRoutes);
routes.use('/auth', authRoutes);

export default routes;

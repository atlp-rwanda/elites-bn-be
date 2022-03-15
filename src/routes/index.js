import express from 'express';
import welcomeRoutes from './api/welcomeRoutes.js';
import usersRoutes from './api/usersRoutes.js';
import authRoutes from './api/authRoutes.js';

const routes = express.Router();

routes.use('/', welcomeRoutes);
routes.use('/users', usersRoutes);
routes.use('/auth', authRoutes);

export default routes;

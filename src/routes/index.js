import express from 'express';
import welcomeRoutes from './api/welcomeRoutes';
import usersRoutes from './api/usersRoutes';
import authRoutes from './api/authRoutes';
import accommodationsRoutes from './api/accommodationsRoutes.js';
import roomRoutes from './api/roomsRoutes.js';
import locationsRoutes from './api/locationsRoutes.js';

const routes = express.Router();

routes.use('/', welcomeRoutes);
routes.use('/users', usersRoutes);
routes.use('/auth', authRoutes);
routes.use('/accommodations', accommodationsRoutes);
routes.use('/', roomRoutes);
routes.use('/locations', locationsRoutes);

export default routes;

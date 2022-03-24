import express from 'express';
import welcomeRoutes from './api/welcomeRoutes';
import usersRoutes from './api/usersRoutes';
import authRoutes from './api/authRoutes';
import accommodationsRoutes from './api/accommodationsRoutes';
import roomRoutes from './api/roomsRoutes';
import locationsRoutes from './api/locationsRoutes';
import tripRoutes from './api/tripRoutes';
import profileRoute from './api/profileRoutes';

const routes = express.Router();

routes.use('/', welcomeRoutes);
routes.use('/users', usersRoutes);
routes.use('/auth', authRoutes);
routes.use('/accommodations', accommodationsRoutes);
routes.use('/', roomRoutes);
routes.use('/locations', locationsRoutes);
routes.use('/trips', tripRoutes);
routes.use('/profiles', profileRoute);

export default routes;

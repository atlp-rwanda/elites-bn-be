import express from 'express';
import welcomeRoutes from './api/welcomeRoutes';
import usersRoutes from './api/usersRoutes';
import authRoutes from './api/authRoutes';
import accommodationsRoutes from './api/accommodationsRoutes';
import roomRoutes from './api/roomsRoutes';
import locationsRoutes from './api/locationsRoutes';
import tripRoutes from './api/tripRoutes';
import profileRoute from './api/profileRoutes';
import commentRoutes from './api/commentRoutes';
import bookingRoutes from './api/bookingRoutes';
import notificationRoutes from './api/notificationsRoutes';
import chatRoutes from './api/chatRoutes';

const routes = express.Router();

routes.use('/', welcomeRoutes);
routes.use('/users', usersRoutes);
routes.use('/auth', authRoutes);
routes.use('/accommodations', accommodationsRoutes);
routes.use('/', roomRoutes);
routes.use('/locations', locationsRoutes);
routes.use('/trips', tripRoutes);
routes.use('/profiles', profileRoute);
routes.use('/comments', commentRoutes);
routes.use('/rooms', bookingRoutes);
routes.use('/notifications', notificationRoutes);
// routes.use('/chat', chatRoutes);

export default routes;

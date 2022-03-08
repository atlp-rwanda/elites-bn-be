import express from 'express';
import welcomeRoutes from './api/welcomeRoutes.js';
import usersRoutes from './api/users.js'

const routes = express.Router();

routes.use('/', welcomeRoutes);
routes.use('/users', usersRoutes);

export default routes;

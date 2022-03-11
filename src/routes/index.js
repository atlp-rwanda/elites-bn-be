import express from 'express';
import welcomeRoutes from './api/welcomeRoutes.js';
import usersRoutes from './api/users.js'
import auth from './api/auth.js'

const routes = express.Router();

routes.use('/', welcomeRoutes);
routes.use('/users', usersRoutes);
routes.use('/auth', auth);

export default routes;

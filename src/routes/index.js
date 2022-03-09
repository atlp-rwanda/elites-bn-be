<<<<<<< HEAD
import express from 'express';
import welcomeRoutes from './api/welcomeRoutes';
import usersRoutes from './api/usersRoutes';
import authRoutes from './api/authRoutes';

const routes = express.Router();

routes.use('/', welcomeRoutes);
routes.use('/users', usersRoutes);
routes.use('/auth', authRoutes);
=======
import express from "express";
import welcomeRoutes from "./api/welcomeRoutes.js";
import usersRoutes from "./api/usersRoutes.js";
import accommodationsRoutes from "./api/accommodationsRoutes.js";
import roomRoutes from "./api/roomsRoutes.js";
import locationsRoutes from "./api/locationsRoutes.js";

const routes = express.Router();

routes.use("/", welcomeRoutes);
routes.use("/users", usersRoutes);
routes.use("/accommodations", accommodationsRoutes);
routes.use("/", roomRoutes);
routes.use("/locations", locationsRoutes);
>>>>>>> 51793e1 (This is a combination of 11 commits.)

export default routes;

import express from 'express';
import RoomControllers from '../../controllers/roomController';
import { roomValidation } from '../../validations/roomValidation/room.validation.js';

import { authenticate } from '../../middlewares/authenticate';
import { verifyToken } from '../../middlewares/verifyToken';
import { isTravelAdmin } from '../../middlewares/isTravelAdmin';

const router = express.Router();

const roomController = new RoomControllers();

router.post(
	'/rooms/',
	authenticate,
	isTravelAdmin,
	verifyToken,
	roomValidation,
	roomController.createRoom
);
router.get(
	'/accommodations/:accommodationId/rooms',
	roomController.getAllRoomsOfAccommodation
);
router.get('/rooms/:roomId', roomController.getSingleRoom);
router.patch(
	'/rooms/:roomId',
	authenticate,
	isTravelAdmin,
	verifyToken,
	roomController.updateRoom
);
router.delete(
	'/rooms/:roomId',
	authenticate,
	isTravelAdmin,
	verifyToken,
	roomController.deleteRoom
);

export default router;

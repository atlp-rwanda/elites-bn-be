import express from "express";
import RoomControllers from "../../controllers/roomController";
import { roomValidation } from "../../validations/roomValidation/room.validation.js";

const router = express.Router();

const roomController = new RoomControllers();

router.post("/rooms/", roomValidation, roomController.createRoom);
router.get(
	"/accommodations/:accommodationId/rooms",
	roomController.getAllRoomsOfAccommodation
);
router.get("/rooms/:roomId", roomController.getSingleRoom);
router.patch("/rooms/:roomId", roomController.updateRoom);
router.delete("/rooms/:roomId", roomController.deleteRoom);

export default router;

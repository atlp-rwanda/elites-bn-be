import express from "express";
import AccommodationControllers from "../../controllers/accommodationsController";
import { accommodationValidation } from "../../validations/accommodationValidation/accommodation.validation.js";
import upload from "../../helpers/multer";

const router = express.Router();

const AccommodationController = new AccommodationControllers();

router.post(
	"/",
	upload.array("images", 5),
	accommodationValidation,
	AccommodationController.createAccommodation
);
router.get("/", AccommodationController.getAllAccommodations);
router.get("/:accommodationId", AccommodationController.getOneAccommodation);
router.get(
	"/in/:locationId",
	AccommodationController.getAccommodationsByLocation
);
router.patch(
	"/:accommodationId",
	upload.array("images", 5),
	AccommodationController.updateAccommodation
);
router.delete("/:accommodationId", AccommodationController.deleteAccommodation);

export default router;

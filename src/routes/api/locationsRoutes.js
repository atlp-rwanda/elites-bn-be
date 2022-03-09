import express from "express";
import LocationControllers from "../../controllers/locationController";
import { locationValidation } from "../../validations/locationValidation/location.validation.js";

const router = express.Router();

const locationController = new LocationControllers();

router.post("/", locationValidation, locationController.createLocation);
router.get("/:locationId", locationController.getSingleLocation);
router.patch("/:locationId", locationController.updateLocation);
router.delete("/:locationId", locationController.deleteLocation);

export default router;

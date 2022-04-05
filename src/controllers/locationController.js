import locationServices from '../services/locationServices';
const locationService = new locationServices();
import { BaseError } from '../httpErrors/baseError';


class LocationControllers {
    createLocation = async(req, res, next) => {
        try {
            const data = {
                locationName: req.body.locationName,
                description: req.body.description,
                country: req.body.country,
            };
            const location = await locationService.createLocation(data);
            return res.status(201).json({
                status: '201',
                message: 'location added successfully',
                payload: location,
            });
        } catch (err) {
            next(err);
        }
    };

    getSingleLocation = async(req, res, next) => {
        try {
            const foundLocation = await locationService.getSingleLocation(
                req.params.locationId
            );
            if (foundLocation) {
                return res.status(200).json({
                    status: '200',
                    message: 'Location found',
                    payload: foundLocation,
                });
            } else
                throw new BaseError(
                    'Not found',
                    404,
                    'Location with that ID does not exists'
                );
        } catch (err) {
            next(err);
        }
    };

    updateLocation = async(req, res, next) => {
        try {
            const locationUpdate = {
                locationName: req.body.locationName,
                description: req.body.description,
                country: req.body.country,
            };
            const location = await locationService.updateLocation(
                req.params.locationId,
                locationUpdate
            );
            res.status(200).json({
                status: 200,
                message: 'location updated successfully',
                payload: location,
            });
        } catch (err) {
            next(err);
        }
    };

    findMostVisitedLocations=async(req, res, next) =>{
        try {
          const visitedLocations = await locationService.listMostVisitedLocations()
          return res
            .status(200)
            .json({ message: 'found Location', visitedLocations });
        } catch (err) {
            next(err);
        }
      }

    deleteLocation = async(req, res, next) => {
        try {
            const deleteMessage = await locationService.deleteLocation(
                req.params.locationId
            );
            res.status(200).json({ status: 200, message: deleteMessage });
        } catch (err) {
            next(err);
        }
    };
}

export default LocationControllers;
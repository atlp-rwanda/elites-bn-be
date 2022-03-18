/* eslint-disable class-methods-use-this */
import {
  TRIP_CREATED,
  REQUEST_UPDATED,
  TRIP_FOUND_MESSAGE,
  TRIP_DELETED_MESSAGE,
  NO_TRIP_FOUND,
  VALIDATION_ERROR,
} from '../constants/tripConstants';
import {
  createTrip,
  updateRequest,
  deleteRequest,
  getAllRequests,
  getManagerId,
  checkLocations,
  getOneRequest,
} from '../services/tripServices';
import { validateDate } from '../helpers/dateComparison';

// eslint-disable-next-line import/prefer-default-export
export class TripControllers {
  async createController(id, req, res, next) {
    try {
      // console.log(id);
      req.body.managerId = await getManagerId(id);
      const compareDates = validateDate(
        req.body.returnDate,
        req.body.departDate,
      );

      const locationsValidation = await checkLocations(
        req.body.departLocation,
        req.body.arrivalLocation,
      );
      if (compareDates && locationsValidation) {
        const newTrip = await createTrip(id, req.body);
        if (newTrip) {
          res
            .status(201)
            .json({ status: 201, message: TRIP_CREATED, payload: newTrip });
        } else {
          res
            .status(403)
            .json({ message: 'you are not allowed to create a request' });
        }
      } else {
        res.status(400).json({ status: 400, message: VALIDATION_ERROR });
      }
    } catch (err) {
      next(err);
    }
  }

  async updateRequest(id, req, res, next) {
    try {
      const updated = await updateRequest(id, req.params.id, req.body);
      if (updated) {
        res
          .status(200)
          .json({ status: 200, message: REQUEST_UPDATED, payload: updated });
      } else {
        res.status(404).json({
          status: 404,
          message: 'Oops,No such trip request found! ',
        });
      }
    } catch (err) {
      next(err);
    }
  }

  async getAllRequests(id, req, res, next) {
    try {
      const getTripRequests = await getAllRequests(id);
      res.status(200).json({
        status: 200,
        message: TRIP_FOUND_MESSAGE,
        payload: getTripRequests,
      });
    } catch (err) {
      next(err);
    }
  }

  async getSingleRequests(id, req, res, next) {
    try {
      const getTripRequest = await getOneRequest(id, req.params.id);
      if (getTripRequest) {
        res.status(200).json({
          status: 200,
          message: TRIP_FOUND_MESSAGE,
          payload: getTripRequest,
        });
      }
      res.status(404).json({ message: NO_TRIP_FOUND });
    } catch (err) {
      next(err);
    }
  }

  async deleteRequests(id, req, res, next) {
    try {
      const delTripRequests = await deleteRequest(id, req.params.id);
      if (delTripRequests) {
        res.send({ status: 204, message: TRIP_DELETED_MESSAGE });
      } else {
        res.status(200).json({
          status: 200,
          message: NO_TRIP_FOUND,
        });
      }
    } catch (err) {
      next(err);
    }
  }
}

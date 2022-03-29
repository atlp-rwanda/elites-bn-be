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
  tripExist,
  checkLocations,
  getOneRequest,
  approveRequest,
  findByPk,
  updateTrip,
} from '../services/tripServices';
import { validateDate } from '../helpers/dateComparison';
import models from '../models';
import { UnauthorizedError } from '../httpErrors/unauthorizedError';
import { userById } from '../services/userServices';
import { BaseError } from '../httpErrors/baseError';

// eslint-disable-next-line import/prefer-default-export
export class TripControllers {
  // eslint-disable-next-line class-methods-use-this
  async createController(id, req, res, next) {
    try {
      req.body.managerId = await getManagerId(id);
      const compareDates = validateDate(
        req.body.returnDate,
        req.body.departDate
      );
      const locationsValidation = await checkLocations(req.body.departLocation);

      const exists = await tripExist(id, req.body.departDate);
      console.log(exists);
      if (exists) {
        return res.status(201).json({
          status: 400,
          message: 'Trip request already exists',
          payload: exists,
        });
      }

      if (compareDates && locationsValidation) {
        const checkTripType = req.body.destinations.length;
        const tripType = checkTripType > 1 ? 'multicity' : 'single-city';
        req.body.tripType = tripType;
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
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  }

  // eslint-disable-next-line class-methods-use-this
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

  // eslint-disable-next-line class-methods-use-this
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

  // eslint-disable-next-line consistent-return
  async getSingleRequests(id, req, res, next) {
    try {
      const getTripRequest = await getOneRequest(id, req.params.id);
      if (getTripRequest) {
        return res.status(200).json({
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

  async approveRejectTripRequest(id, req, res, next) {
    try {
      const managerId = id;
      const triprequestId = req.params.id;
      const trip = await models.tripRequest.findByPk(triprequestId);
      const requester = await userById(trip.userId);

      if (managerId === requester.managerId) {
        const { status } = trip;

        if (status === 'pending') {
          const updatedStatus = req.body.status;
          const updated = await approveRequest(triprequestId, {
            status: updatedStatus,
          });
          if (updated) {
            res.status(200).json({
              status: 200,
              message: REQUEST_UPDATED,
              payload: updated,
            });
          }
        } else {
          throw new BaseError('Bad request', 404, 'Trip request not found');
        }
      } else {
        throw new UnauthorizedError('You are not a manager of this user');
      }
    } catch (err) {
      next(err);
    }
  }
}

/* eslint-disable class-methods-use-this */
import {
  TRIP_CREATED,
  REQUEST_UPDATED,
  FAILED_TRIP,
  TRIP_FOUND_MESSAGE,
  TRIP_DELETED_MESSAGE,
  NO_TRIP_FOUND,
  ERROR_DATES,
} from '../constants/tripConstants';
import {
  createTrip,
  getPending,
  updateRequest,
  deleteRequest,
  getAllRequests,
  fetchAllRequests,
  getManagerId,
  checkRole,
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
      if (compareDates) {
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
        res.status(400).json({ status: 400, message: ERROR_DATES });
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
        res.status(200).json({
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
    } catch (error) {
      next();
    }
  }

  async getRequests(id, req, res, next) {
    try {
      const getTripRequests = await getPending(id);
      res.status(200).json({
        status: 200,
        message: TRIP_FOUND_MESSAGE,
        payload: getTripRequests,
      });
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

  async fetchAllRequest(id, req, res, next) {
    try {
      const userRole = await checkRole(id);

      if (userRole === 'manager') {
        const getAll = await fetchAllRequests(id);
        res.status(200).json({
          status: 200,
          message: TRIP_FOUND_MESSAGE,
          payload: getAll,
        });
      } else {
        res.status(403).json({ status: 403, message: 'unauthorized' });
      }
    } catch (err) {
      next(err);
    }
  }
}

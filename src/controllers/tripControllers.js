import {
  TRIP_CREATED,
  REQUEST_UPDATED,
  FAILED_TRIP, TRIP_FOUND_MESSAGE,
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
  fetchAllRequests
} from '../services/tripServices';
import { validateDate } from '../helpers/dateComparison';

// eslint-disable-next-line import/prefer-default-export
export class TripControllers {
  async createController(req, res) {
    try {
      const compareDates = validateDate(req.body.returnDate, req.body.departDate);
      if (compareDates) {
        const newTrip = await createTrip(req.params.userId, req.body);
        res.status(201).json({ status: 201, message: TRIP_CREATED, payload: newTrip });
      } else {
        res.status(400).json({ status: 400, message: ERROR_DATES
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 500,
        message: FAILED_TRIP
      });
    }
  }

  async updateRequest(req, res) {
    try {
      const updated = await updateRequest(req.params.userId, req.params.id, req.body);
      if (updated) {
        res.status(200).json({ status: 200, message: REQUEST_UPDATED, payload: updated });
      } else {
        res.status(200).json({
          status: 404,
          message: 'Oops,No such trip request found! ',
        });
      }
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: 'Oops,No such trip request found! ',
      });
    }
  }

  async getAllRequests(req, res) {
    try {
      const getTripRequests = await getAllRequests(req.params.userId);
      res.status(200).json({ status: 200, message: TRIP_FOUND_MESSAGE, payload: getTripRequests });
    } catch (error) {
      res.status(404).json({
        status: 404,
        message: NO_TRIP_FOUND,
      });
    }
  }

  async getRequests(req, res) {
    try {
      const getTripRequests = await getPending(req.params.userId);
      res.status(200).json({ status: 200, message: TRIP_FOUND_MESSAGE, payload: getTripRequests });
    } catch (error) {
      res.status(404).json({
        status: 404,
        message: NO_TRIP_FOUND
      });
    }
  }

  async deleteRequests(req, res) {
    try {
      const delTripRequests = await deleteRequest(req.params.userId, req.params.id);
      if (delTripRequests) {
        res.send({ status: 204, message: TRIP_DELETED_MESSAGE });
      } else {
        res.status(200).json({
          status: 200,
          message: NO_TRIP_FOUND,
        });
      }
    } catch (error) {
      res.status(404).json({
        status: 404,
        message: NO_TRIP_FOUND,
      });
    }
  }

  async fetchAllRequest(req, res) {
    try {
      const getAllRequests = await fetchAllRequests(req.params.managerId);
      res.status(200).json({ status: 200, message: TRIP_FOUND_MESSAGE, payload: getAllRequests });
    } catch (error) {
      console.log(error);
      res.status(404).json({
        status: 404,
        message: NO_TRIP_FOUND,
      });
    }
  }
}

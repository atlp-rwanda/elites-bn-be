import {
  TRIP_CREATED,
  REQUEST_UPDATED,
  FAILED_TRIP,
  TRIP_FOUND_MESSAGE,
  TRIP_DELETED_MESSAGE,
  NO_TRIP_FOUND,
  ERROR_DATES,
} from '../constants/tripConstants.js';
import {
  createTrip,
  getPending,
  updateRequest,
  deleteRequest,
  getAllRequests,
  fetchAllRequests,
  getManagerId,
  checkRole
} from '../services/tripServices.js';
import { validateDate } from '../helpers/dateComparison.js';
import { decodeToken } from '../helpers/jwtFunction.js';
import { sendEmail } from '../helpers/sendgrid.js';

// eslint-disable-next-line import/prefer-default-export
export class TripControllers {
  async createController(req, res) {
    try {
      const getId = req.headers.authorization.split(' ')[1];
      const userId = await decodeToken(getId);
      const { id } = userId;
      req.body.managerId = await getManagerId(id);
      const compareDates = validateDate(
        req.body.returnDate,
        req.body.departDate
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
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 500,
        message: FAILED_TRIP,
      });
    }
  }

  async updateRequest(req, res) {
    try {
      const getId = req.headers.authorization.split(' ')[1];
      const userId = await decodeToken(getId);
      const { id } = userId;
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
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: 'Oops,No such trip request found! ',
      });
    }
  }

  async getAllRequests(req, res) {
    try {
      const getId = req.headers.authorization.split(' ')[1];
      const userId = await decodeToken(getId);
      console.log(userId);
      const { id } = userId;
      const getTripRequests = await getAllRequests(id);
      res
        .status(200)
        .json({
          status: 200,
          message: TRIP_FOUND_MESSAGE,
          payload: getTripRequests,
        });
    } catch (error) {
      res.status(404).json({
        status: 404,
        message: NO_TRIP_FOUND,
      });
    }
  }

  async getRequests(req, res) {
    try {
      const getId = req.headers.authorization.split(' ')[1];
      const userId = await decodeToken(getId);
      const { id } = userId;
      const getTripRequests = await getPending(id);
      res
        .status(200)
        .json({
          status: 200,
          message: TRIP_FOUND_MESSAGE,
          payload: getTripRequests,
        });
    } catch (error) {
      res.status(404).json({
        status: 404,
        message: NO_TRIP_FOUND,
      });
    }
  }

  async deleteRequests(req, res) {
    try {
      const getId = req.headers.authorization.split(' ')[1];
      const userId = await decodeToken(getId);
      const { id } = userId;
      const delTripRequests = await deleteRequest(id, req.params.id);
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
      const getId = req.headers.authorization.split(' ')[1];
      const userId = await decodeToken(getId);
      const { id } = userId;
      const userRole = await checkRole(id);

      if (userRole === 'manager') {
        const getAllRequests = await fetchAllRequests(id);
        res
          .status(200)
          .json({
            status: 200,
            message: TRIP_FOUND_MESSAGE,
            payload: getAllRequests,
          });
      } else {
        res.status(403).json({ status: 403, message: 'unauthorized' });
      }
    } catch (error) {
      console.log(error);
      res.status(404).json({
        status: 404,
        message: NO_TRIP_FOUND,
      });
    }
  }
}

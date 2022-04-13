/* eslint-disable class-methods-use-this */
import {
  TRIP_CREATED,
  REQUEST_UPDATED,
  TRIP_FOUND_MESSAGE,
  TRIP_DELETED_MESSAGE,
  NO_TRIP_FOUND,
  VALIDATION_ERROR,
  VALIDATION_ERROR_INPUT,
} from '../constants/tripConstants';
import {
  createTrip,
  deleteRequest,
  getAllRequests as fetchAllRequests,
  getManagerId,
  tripExist,
  checkLocations,
  getOneRequest,
  approveRequest,
  updateMulticities,
  findStatistcsByUser,
  findLocation,
  updateLocation,
} from '../services/tripServices';
import { validateDate, validateDateTripStat } from '../helpers/dateComparison';
import { UnauthorizedError } from '../httpErrors/unauthorizedError';
import { userById } from '../services/userServices';
import { BaseError } from '../httpErrors/baseError';
import requestEventEmitter from './notificationEventsController';
import { decodeAcessToken } from '../helpers/jwtFunction';
import models from '../models';

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
      const { rememberMe } = req.body;
      const exists = await tripExist(id, req.body.departDate);
      if (exists) {
        return res.status(400).json({
          status: 400,
          message: 'Trip request already exists',
          payload: exists,
        });
      }

      if (rememberMe === 'true') {
        const profile = await models.Profile.findOne({
          where: { userId: id },
        });

        if (profile === null) {
          res.status(400).json({
            status: 400,
            message: 'You do not have a profile, create one to proceed',
          });
        }
        const { role } = profile;

        const roleName = await models.Role.findOne({
          where: { id: role },
        });

        const { passportNumber } = profile;
        const { address } = profile;
        const names = profile.name;
        const { gender } = profile;
        req.body.passportNumber = passportNumber;
        req.body.address = address;
        req.body.names = names;
        req.body.gender = gender;
        req.body.role = roleName.name;

        if (compareDates) {
          const checkTripType = req.body.destinations.length;
          const tripType = checkTripType > 1 ? 'multicity' : 'single-city';
          req.body.tripType = tripType;
          const newTrip = await createTrip(id, req.body);

          if (newTrip) {
            // Emit event when trip request is created
            requestEventEmitter.emit('request-created', newTrip, req);
            res
              .status(201)
              .json({ status: 201, message: TRIP_CREATED, payload: newTrip });
          } else {
            res.status(403).json({
              status: 403,
              message: 'you are not allowed to create a request',
            });
          }
        } else {
          res
            .status(400)
            .json({ status: 400, message: VALIDATION_ERROR_INPUT });
        }
      } else if (compareDates) {
        const newPassportNumber = req.body.passportNumber;
        const newAddress = req.body.address;

        if (newPassportNumber === undefined || newAddress === undefined) {
          throw new BaseError(
            'Bad request',
            400,
            'Please fill in your new passport and address'
          );
        }
        const profile = await models.Profile.findOne({
          where: { userId: id },
        });

        if (profile === null) {
          res.status(400).json({
            status: 400,
            message: 'You do not have a profile, create one to proceed',
          });
        }
        const { role } = profile;

        const roleName = await models.Role.findOne({
          where: { id: role },
        });

        const names = profile.name;
        const { gender } = profile;
        req.body.names = names;
        req.body.gender = gender;
        req.body.role = roleName.name;

        await models.Profile.update(
          {
            passportNumber: newPassportNumber,
            address: newAddress,
          },
          {
            where: { userId: id },
          }
        );

        const checkTripType = req.body.destinations.length;
        const tripType = checkTripType > 1 ? 'multicity' : 'single-city';
        req.body.tripType = tripType;
        const newTrip = await createTrip(id, req.body);

        if (newTrip) {
          // Emit event when trip request is created
          requestEventEmitter.emit('request-created', newTrip, req);

          res
            .status(201)
            .json({ status: 201, message: TRIP_CREATED, payload: newTrip });
        } else {
          res.status(403).json({
            status: 403,
            message: 'you are not allowed to create a request',
          });
        }
      } else {
        res.status(400).json({ status: 400, message: VALIDATION_ERROR_INPUT });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async updateRequest(id, req, res, next) {
    try {
      const updatePassportNumber = req.body.passportNumber;
      const updateNewAdress = req.body.address;
      const multiCityTrips = await updateMulticities(
        id,
        req.params.id,
        req.body,
        updatePassportNumber,
        updateNewAdress
      );
      if (multiCityTrips) {
        // Emit event when trip request is edited
        requestEventEmitter.emit('request-updated', multiCityTrips);

        return res.status(200).json({
          message: 'Updating has been successfully ',
          payload: multiCityTrips,
        });
      }
      res.status(404).json({
        status: 404,
        message: 'Oops,No such trip request found! ',
      });
    } catch (err) {
      next(err);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async getAllRequests(id, req, res, next) {
    try {
      const getTripRequests = await fetchAllRequests(id, req.query);
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

  async approveRejectTripRequest(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = await decodeAcessToken(token);
      const managerId = decoded.id;
      const triprequestId = req.params.id;
      const trip = await models.tripRequest.findByPk(triprequestId);
      const { destinations } = trip;
      destinations.forEach(async (x) => {
        const y = await JSON.parse(x);
        const location = await findLocation(y.destinationId);
        location.visitCount += 1;
        await updateLocation(location);
      });

      const requester = await userById(trip.userId);
      if (managerId === requester.managerId) {
        const { status } = trip;
        if (status === 'pending') {
          const updatedStatus = req.body.status;
          const updated = await trip.update({
            status: updatedStatus,
          });
          if (updated) {
            // Emit the event when trip request is approved or rejected
            requestEventEmitter.emit('request-approved-or-rejected', updated);
            res.status(200).json({
              status: 200,
              message: REQUEST_UPDATED,
              payload: updated,
            });
          }
        } else {
          throw new BaseError(
            'Bad request',
            400,
            'Trip request is already Updated'
          );
        }
      } else {
        throw new UnauthorizedError('You are not a manager of this user');
      }
    } catch (err) {
      next(err);
    }
  }

  async mostTravelledDestination(id, req, res, next) {
    try {
      const getTripRequests = await fetchMostTravelled(id);
      res.status(200).json({
        status: 200,
        message: TRIP_FOUND_MESSAGE,
        payload: getTripRequests,
      });
    } catch (err) {
      next(err);
    }
  }
  async countTripStatics(id, req, res, next) {
    try {
      /*   const recordStart = await new Date(req.body.startDate);
      const recordEnd = await new Date(req.body.endDate); */

      const compareDates = validateDateTripStat(
        req.body.endDate,
        req.body.startDate
      );

      if (compareDates) {
        const result = await findStatistcsByUser(
          id,
          req.body.startDate,
          req.body.endDate
        );

        if (result) {
          res.status(200).json({
            status: 200,
            message: 'Information successfully found',
            payload: result,
          });
        }

        if (!result) {
          throw new BaseError('Not found', 404, 'information not found');
        } else {
          throw new UnauthorizedError(
            'You are not a manager or requester of this user'
          );
        }
      } else {
        throw new BaseError(
          'Bad request',
          400,
          'Please, check your input data.'
        );
      }
    } catch (err) {
      next(err);
    }
  }
  async mostTravelledDestination(id, req, res, next) {
    try {
      const getTripRequests = await fetchMostTravelled(id);
      res.status(200).json({
        status: 200,
        message: TRIP_FOUND_MESSAGE,
        payload: getTripRequests,
      });
    } catch (err) {
      next(err);
    }
  }
}

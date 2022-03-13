import { TRIP_CREATED, REQUEST_UPDATED, FAILED_TRIP } from '../constants/tripConstants';
import {
    createTrip,
    getPending,
    updateRequest,
    deleteRequest,
    getAllRequests
} from '../services/tripServices';
import { validateDate } from '../helpers/dateComparison';

export class TripControllers {
    async createController(req, res) {
        try {
            const compareDates = validateDate(req.body.returnDate, req.body.departDate);
            if (compareDates) {
                const newTrip = await createTrip(req.params.userId, req.body);
                res.status(201).json({ status: 201, message: TRIP_CREATED, payload: newTrip });
            } else {
                res.status(400).json({ status: 400, message: 'departure date is greater than return date' });
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
                    message: "Oops,No such trip request found! "
                });
            }

        } catch (error) {
            res.status(500).json({
                status: 500,
                message: "Oops,No such trip request found! "
            });
        }
    }
  

    async getAllRequests(req, res) {
        try {
            const getTripRequests = await getAllRequests(req.params.userId);
            res.status(200).json({ status: 200, message: TRIP_CREATED, payload: getTripRequests });
        } catch (error) {
            res.status(404).json({
                status: 404,
                message: NO_TRIP_FOUND
            });
        }
    }
  

    async getRequests(req, res) {
        try {
            const getTripRequests = await getPending(req.params.userId);
            res.status(200).json({ status: 200, message: TRIP_CREATED, payload: getTripRequests });
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
            res.status(204).json({ status: 204, message: TRIP_CREATED, payload: delTripRequests });
        } catch (error) {
            res.status(404).json({
                status: 404,
                message: NO_TRIP_FOUND
            });
        }
    }
  }
}


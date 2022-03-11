import { TRIP_CREATED, REQUEST_UPDATED } from '../constants/tripConstants';
import { createTrip, getPending, updateRequest, deleteRequest, getAllRequests } from '../services/tripServices'
import { validateDate } from '../helpers/dateComparison'

export class TripControllers {

    async createController(req, res) {
        try {
            const compareDates = validateDate(req.body.returnDate, req.body.departDate)
            if (compareDates) {
                const newTrip = await createTrip(req.params.userId, req.body);
                res.status(201).json({ status: 201, message: TRIP_CREATED, payload: newTrip });
            } else {
                res.status(400).json({ status: 400, message: "departure date is greater than return date" })
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status: 500,
                message: "Trip request failed"
            })
        }

    }

    async updateRequest(req, res) {
        try {
            const updated = await updateRequest(req.params.userId, req.params.id, req.body);
            res.status(200).json({ status: 200, message: REQUEST_UPDATED, payload: updated });
        } catch (error) {
            res.status(500).json({
                status: 500,
                message: "Trip request failed"
            })
        }
    }

    async getAllRequests(req, res) {
        try {
            const getTripRequests = await getAllRequests(req.params.userId);
            res.status(200).json({ status: 200, message: TRIP_CREATED, payload: getTripRequests });
        } catch (error) {
            res.status(500).json({
                status: 500,
                message: "Trip request failed"
            })
        }
    }

    async getRequests(req, res) {
        try {
            const getTripRequests = await getPending(req.params.userId);
            res.status(200).json({ status: 200, message: TRIP_CREATED, payload: getTripRequests });
        } catch (error) {
            res.status(500).json({
                status: 500,
                message: "NOT FOUND"
            })
        }
    }

    async deleteRequests(req, res) {
        try {
            const delTripRequests = await deleteRequest(req.params.userId, req.params.id);
            res.status(204).json({ status: 204, message: TRIP_CREATED, payload: delTripRequests });
        } catch (error) {
            res.status(500).json({
                status: 500,
                message: "Trip request failed"
            })
        }


    }
}
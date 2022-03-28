import roomServices from '../services/roomServices';
import { BaseError } from '../httpErrors/baseError';
const roomService = new roomServices();
class RoomControllers {
    createRoom = async(req, res, next) => {
        try {
            const data = {
                roomType: req.body.roomType,
                roomNumber: req.body.roomNumber,
                price: req.body.price,
                currency: req.body.currency,
                isAvailable: req.body.isAvailable,
                accommodationId: req.body.accommodationId,
            };
            const room = await roomService.createRoom(data);
            return res.status(201).json({
                status: '201',
                message: 'room added successfully',
                payload: room,
            });
        } catch (err) {
            next(err);
        }
    };

    getAllRoomsOfAccommodation = async(req, res, next) => {
        try {
            const foundRooms = await roomService.getAllRoomsOfAccommodation(
                req.params.accommodationId
            );
            if (foundRooms.length !== 0) {
                return res.status(200).json({
                    status: '200',
                    message: 'All rooms in given accommodation',
                    payload: foundRooms,
                });
            } else
                throw new BaseError(
                    'Not found',
                    404,
                    'No rooms found in given accommodation'
                );
        } catch (err) {
            next(err);
        }
    };

    getSingleRoom = async(req, res, next) => {
        try {
            const foundRoom = await roomService.getSingleRoom(req.params.roomId);
            if (!foundRoom)
                throw new BaseError(
                    'Not found',
                    404,
                    'Room with that ID does not exists'
                );
            return res
                .status(200)
                .json({ status: '200', message: 'Room found', payload: foundRoom });
        } catch (err) {
            next(err);
        }
    };

    updateRoom = async(req, res, next) => {
        try {
            const roomUpdate = {
                roomType: req.body.roomType,
                roomNumber: req.body.roomNumber,
                price: req.body.price,
                isAvailable: req.body.isAvailable,
                currency: req.body.currency,
                accommodationId: req.body.accommodationId,
            };
            const room = await roomService.updateRoom(req.params.roomId, roomUpdate);
            res.status(200).json({
                status: 200,
                message: 'room updated successfully',
                payload: room,
            });
        } catch (err) {
            next(err);
        }
    };

    deleteRoom = async(req, res, next) => {
        try {
            const deleteMessage = await roomService.deleteRoom(req.params.roomId);
            res.status(200).json({ status: 200, message: deleteMessage });
        } catch (err) {
            next(err);
        }
    };
}

export default RoomControllers;
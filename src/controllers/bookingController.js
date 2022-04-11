import bookingServices from '../services/bookingServices';
import { decodeAcessToken } from '../helpers/jwtFunction';
import models from '../models';

const BookingServices = new bookingServices();

class BookingControllers {
  async bookRooms(req, res, next) {
    try {
      const { checkinDate, checkoutDate } = req.body;
      const { roomId } = req.params;
      const token = req.headers.authorization.split(' ')[1];
      const data = await decodeAcessToken(token);
      const userId = data.id;
      const BookARoom = await BookingServices.bookRoom(userId, roomId, checkinDate, checkoutDate);
      await BookingServices.updateRoomAvailability(roomId);
      return res.status(201).json({
        status: '201',
        message: 'Booking a room was successful',
        payload: BookARoom,
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteBooking(req, res, next) {
    try {
      const { roomId } = req.params;

      await BookingServices.makeRoomAvailable(roomId);

      res.status(200).json({ status: 200, message: 'Unbooking was successful' });
    } catch (err) {
      next(err);
    }
  }
}

export default BookingControllers;

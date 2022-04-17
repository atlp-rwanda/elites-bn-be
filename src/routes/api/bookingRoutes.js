import express from 'express';
import BookingControllers from '../../controllers/bookingController';
import { isAbleToBook } from '../../middlewares/isAbleToBook';
import { isAbleToUnbook } from '../../middlewares/isAbleToUnbook';

const bookingController = new BookingControllers();
const router = express.Router();

router.post('/:roomId/booking', isAbleToBook, bookingController.bookRooms);
router.patch(
  '/:roomId/unbooking',
  isAbleToUnbook,
  bookingController.deleteBooking,
);

export default router;

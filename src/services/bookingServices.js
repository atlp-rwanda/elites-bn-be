import models from '../models';

class bookingServices {
  bookRoom = async (userId, roomId, checkinDate, checkoutDate) => {
    const bookedRoom = await models.Room.findOne({
      where: { id: roomId },
    });

    const createBooking = await models.Booking.create({
      userId,
      roomId,
      checkinDate,
      checkoutDate,
    });
    createBooking.save();

    return createBooking;
  };

  updateRoomAvailability = async (roomId) => {
    const updateAvailability = await models.Room.update(
      { isAvailable: false },
      {
        where: { id: roomId },
      }
    );

    return updateAvailability;
  };

  makeRoomAvailable = async (roomId) => {
    const updateAvailability = await models.Room.update(
      { isAvailable: true },
      {
        where: { id: roomId },
      }
    );

    return updateAvailability;
  };
}
export default bookingServices;

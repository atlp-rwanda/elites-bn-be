import 'dotenv/config';
import { decodeAcessToken } from '../helpers/jwtFunction';
import models from '../models';
import { ForbbidenError } from '../httpErrors/forbidenError';
import { validateDate } from '../helpers/dateComparison';

export const isAbleToBook = async (req, res, next) => {
  try {
    const { roomId, tripId } = req.params;

    if (roomId === '{roomId}' || tripId === '{tripId}') {
      throw new ForbbidenError('Please fill in all the fields');
    }

    const { checkinDate, checkoutDate } = req.body;

    const compareDates = validateDate(checkoutDate, checkinDate);

    if (compareDates === false) {
      throw new ForbbidenError('Do check well the dates');
    }

    const emptyToken = req.headers.authorization;

    if (emptyToken === undefined) {
      throw new ForbbidenError('User not logged in');
    }
    const token = req.headers.authorization.split(' ')[1];

    const data = await decodeAcessToken(token);
<<<<<<< HEAD
=======
    console.log(data.id, '========================');
>>>>>>> This is a combination of 4 commits.

    const user = await models.User.findOne({
      where: { id: data.id },
      include: 'Role',
    });

    if (user.roleId !== 5) {
      throw new ForbbidenError('You are not allowed to perform this task');
    }
    const tripRequest = await models.tripRequest.findOne({
      where: { id: tripId },
    });

    if (tripRequest === null) {
      throw new ForbbidenError('You have no such trip request');
    }
<<<<<<< HEAD
=======
    console.log(tripRequest.status, '================');
>>>>>>> This is a combination of 4 commits.
    if (tripRequest.status === 'pending' || tripRequest.status === 'rejected') {
      throw new ForbbidenError('this trip request has not been approved');
    }

    const checkRoomExist = await models.Room.findOne({
      where: { id: roomId },
    });

    if (checkRoomExist === null) {
      throw new ForbbidenError('This room is not in existance');
    }
    const roomAvailable = checkRoomExist.isAvailable;
    if (roomAvailable === false) {
      throw new ForbbidenError(
<<<<<<< HEAD
        'This room is already booked try a different one'
=======
        'This room is already booked try a different one',
>>>>>>> This is a combination of 4 commits.
      );
    }

    next();
  } catch (err) {
    next(err);
    // return res.status(403).json({ message:error });
  }
};

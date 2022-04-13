import 'dotenv/config';
import { decodeAcessToken } from '../helpers/jwtFunction';
import models from '../models';
import { validateDate } from '../helpers/dateComparison';
import { BaseError } from '../httpErrors/baseError';
export const isAbleToBook = async (req, res, next) => {
  try {
    const { roomId, tripId } = req.params;
    if (roomId === '{roomId}' || tripId === '{tripId}') {
      throw new BaseError('Bad Request', 400, 'Please fill in all the fields');
    }
    const { checkinDate, checkoutDate } = req.body;
    const compareDates = validateDate(checkoutDate, checkinDate);
    if (compareDates === false) {
      throw new BaseError('Bad Request', 400, 'Do check well the dates');
    }
    const emptyToken = req.headers.authorization;
    if (emptyToken === undefined) {
      throw new BaseError('Bad Request', 400, 'User not logged in');
    }
    const token = req.headers.authorization.split(' ')[1];
    const data = await decodeAcessToken(token);
    const user = await models.User.findOne({
      where: { id: data.id },
      include: 'Role',
    });
    if (user.roleId !== 5) {
      throw new BaseError(
        'Bad Request',
        400,
        'You are not allowed to perform this task'
      );
    }
    const tripRequest = await models.tripRequest.findOne({
      where: { id: tripId },
    });
    if (tripRequest === null) {
      throw new BaseError('Bad Request', 400, 'You have no such trip request');
    }
    if (tripRequest.status === 'pending' || tripRequest.status === 'rejected') {
      throw new BaseError(
        'Bad Request',
        400,
        'this trip request has not been approved'
      );
    }
    const checkRoomExist = await models.Room.findOne({
      where: { id: roomId },
    });
    if (checkRoomExist === null) {
      throw new BaseError('Not Found', 404, 'This room is not in existance');
    }
    const roomAvailable = checkRoomExist.isAvailable;
    if (roomAvailable === false) {
      throw new BaseError(
        'Bad Request',
        400,
        'This room is already booked try a different one'
      );
    }
    next();
  } catch (err) {
    console.log(err + '@@@@@@@@@@@@@@@@@@@@@');
    next(err);
  }
};

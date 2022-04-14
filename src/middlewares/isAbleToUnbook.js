import 'dotenv/config';
import { decodeAcessToken } from '../helpers/jwtFunction';
import models from '../models';
import { BaseError } from '../httpErrors/baseError';

export const isAbleToUnbook = async (req, res, next) => {
  try {
    const emptyToken = req.headers.authorization;
    const { tripId } = req.body;
    const { roomId } = req.params; // this roomId is going to be used down below line 48

    if (emptyToken === undefined) {
      throw new BaseError('Bad Request', 400, 'You are not logged in');
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
        'You are not allowed to perform this task',
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
        'You can not unbook a room unless you booked it',
      );
    }

    const checkRoomExist = await models.Room.findOne({
      where: { id: roomId },
    });

    if (checkRoomExist === null) {
      throw new BaseError('Not Found', 404, 'This room is not in existance');
    }
    const roomAvailable = checkRoomExist.isAvailable;
    if (roomAvailable === true) {
      throw new BaseError('Bad Request', 400, 'This room is already available');
    }

    next();
  } catch (err) {
    next(err);
  }
};

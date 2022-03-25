import 'dotenv/config';
import { decodeAcessToken } from '../helpers/jwtFunction';
import models from '../models';
import { ForbbidenError } from '../httpErrors/forbidenError';
import { validateDate } from '../helpers/dateComparison';

export const isAbleToBook = async (req, res, next) => {
  try {
    const { checkinDate } = req.body;
    const { checkoutDate } = req.body;

    const compareDates = validateDate(checkoutDate, checkinDate);

    if (compareDates === false) {
      throw new ForbbidenError('Do check well the dates');
    }

    const emptyToken = req.headers.authorization;
    const { roomId } = req.params; // this roomId is going to be used down below line 48

    if (emptyToken === undefined) {
      throw new ForbbidenError('User not logged in');
    }
    const token = req.headers.authorization.split(' ')[1];

    const data = await decodeAcessToken(token);

    const user = await models.User.findOne({
      where: { id: data.id },
      include: 'Role',
    });

    if (user.roleId !== 5) {
      throw new ForbbidenError('You are not allowed to perform this task');
    }
    const tripRequest = await models.tripRequest.findOne({
      where: { userId: data.id },
    });

    if (tripRequest === null) {
      throw new ForbbidenError('You have no such trip request');
    }

    // if(!tripRequest.status === 'approved'){
    //   return req.status(401).json({
    //     status:401,
    //     message:'this trip request is not yet approved'
    //   })
    // }

    const checkRoomExist = await models.Room.findOne({
      where: { id: roomId },
    });

    if (checkRoomExist === null) {
      throw new ForbbidenError('This room is not in existance');
    }
    const roomAvailable = checkRoomExist.isAvailable;
    if (roomAvailable === false) {
      throw new ForbbidenError(
        'This room is already booked try a different one',
      );
    }
    next();
  } catch (err) {
    next(err);
    // return res.status(403).json({ message:error });
  }
};

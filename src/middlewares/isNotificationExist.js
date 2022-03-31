// import models from '../models';
// import { decodeAcessToken } from '../helpers/jwtFunction';

// export const isNotificationExist = async (req, res, next) => {
//   userExist = async (id, req, res, next) => {
//     const notification = await models.Notification.findOne({
//       where: { userId: req.user.id } && { isRead: false },
//     });

//     if (notification) {
//       return notification;
//     }
//     return null;
//   };
// };

import 'dotenv/config';
import { decodeAcessToken } from '../helpers/jwtFunction';
import models from '../models';
import { ForbbidenError } from '../httpErrors/forbidenError';

export const isAbleToBook = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    const data = await decodeAcessToken(token);

    const notification = await models.Notification.findOne({
      where: { id: data.id } && { isRead: false },
    });
  } catch (err) {
    next(err);
    // return res.status(403).json({ message:error });
  }
};

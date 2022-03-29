import "dotenv/config";
import { decodeAcessToken } from "../helpers/jwtFunction";
import models from "../models";
import { ForbbidenError } from "../httpErrors/forbidenError";

export const isAbleToUnbook = async (req, res, next) => {
  try {
    const emptyToken = req.headers.authorization;
    const { roomId } = req.params; // this roomId is going to be used down below line 48

    if (emptyToken === undefined) {
      throw new ForbbidenError("You are not logged in ");
    }
    const token = req.headers.authorization.split(" ")[1];

    const data = await decodeAcessToken(token);

    const user = await models.User.findOne({
      where: { id: data.id },
      include: "Role",
    });

    if (user.roleId !== 5) {
      throw new ForbbidenError("You are not allowed to perform this task");
    }
    const tripRequest = await models.tripRequest.findOne({
      where: { userId: data.id },
    });

    if (tripRequest === null) {
      throw new ForbbidenError("You have no such trip request");
    }

    if (tripRequest.status === "pending" || tripRequest.status === "rejected") {
      throw new ForbbidenError("this trip request has not been approved");
    }

    const checkRoomExist = await models.Room.findOne({
      where: { id: roomId },
    });

    if (checkRoomExist === null) {
      throw new ForbbidenError("This room is not in existance");
    }
    const roomAvailable = checkRoomExist.isAvailable;
    if (roomAvailable === true) {
      throw new ForbbidenError("This room is already available");
    }

    next();
  } catch (err) {
    next(err);
  }
};

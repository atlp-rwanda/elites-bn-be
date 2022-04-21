/* eslint-disable no-return-await */
import { Op } from 'sequelize';
import models from '../models';
import { BaseError } from '../httpErrors/baseError';
import { NotFoundError } from '../httpErrors/NotFoundError';

export const checkRole = async (userid) => {
  const data = await models.User.findOne({
    where: {
      id: userid,
    },
  });

  const { roleId } = data.dataValues;
  const loggedUser = await models.Role.findOne({
    where: {
      id: roleId,
    },
  });

  const { name } = loggedUser.dataValues;

  return name;
};

export const checkLocations = async (departLocation, arrivalLocation) => {
  if (departLocation !== arrivalLocation) {
    return true;
  }
  return false;
};

export const getManagerId = async (userid) => {
  const data = await models.User.findOne({
    where: {
      id: userid,
    },
  });

  const { managerId } = data.dataValues;
  return managerId;
};

export const tripExist = async (userId, departDate) => await models.tripRequest.findOne({
  where: {
    userId,
    departDate,
  },
});

export const findAtrip = async (id) => {
  const dataExist = await models.tripRequest.findOne({
    where: {
      id,
    },
  });

  if (dataExist) {
    return dataExist;
  }
  return null;
};

// eslint-disable-next-line consistent-return
export const createTrip = async (userid, data) => {
  try {
    const checkManager = await models.User.findOne({
      where: {
        id: userid,
      },
    });
    const { managerId } = checkManager.dataValues;
    if (managerId !== null) {
      const addTrip = await models.tripRequest.create({
        ...data,
        userId: userid,
      });
      addTrip.save();
      return addTrip;
    }
    return false;
  } catch (err) {
    /* throw new Error('You are not allowed, to create trips'); */
    console.log(err);
  }
};

export const getAllRequests = async (userId, queryParams) => {
  const role = await checkRole(userId);
  if (role === 'manager') {
    const data = await models.tripRequest.findAll({
      where: {
        [Op.and]: [{ managerId: userId }],
        [Op.or]: [
          { tripReason: { [Op.substring]: queryParams.tripReason } },
          { status: { [Op.substring]: queryParams.status } },
          { departLocation: { [Op.eq]: queryParams.departLocation } },
          { createdAt: { [Op.gte]: queryParams.createdAt } },
        ],
      },
    });

    return data;
  }
  const Data = await models.tripRequest.findAll({
    where: {
      [Op.and]: [{ userId }],
      [Op.or]: [
        { tripReason: { [Op.substring]: queryParams.tripReason } },
        { status: { [Op.substring]: queryParams.status } },
        { departLocation: { [Op.eq]: queryParams.departLocation } },
        { createdAt: { [Op.gte]: queryParams.createdAt } },
      ],
    },
  });
  return Data;
};

export const getAllRequestWhenNoQuery = async (userId) => {
  const role = await checkRole(userId);
  if (role === 'manager') {
    const data = await models.tripRequest.findAll({
      where: {
        managerId: userId,
      },
    });
    return data;
  }
  const Data = await models.tripRequest.findAll({
    where: { userId },
  });
  return Data;
};

export const getOneRequest = async (userId, id) => {
  const role = await checkRole(userId);
  if (role === 'manager') {
    const data = await models.tripRequest.findOne({
      where: {
        managerId: userId,
        id,
      },
    });
    return data;
  }
  const Data = await models.tripRequest.findOne({
    where: {
      userId,
      id,
    },
  });
  return Data;
};

// multcities update function
export const updateMulticities = async (
  userId,
  tripId,
  data,
  updatePassportNumber,
  updateNewAdress,
) => {
  const exist = await models.tripRequest.findOne({
    where: {
      id: tripId,
      status: 'pending',
    },
  });

  const existId = await models.tripRequest.findOne({
    where: {
      id: tripId,
    }
  });
  await models.Profile.update(
    {
      passportNumber: updatePassportNumber,
      address: updateNewAdress,
    },
    {
      where: { userId },
    },
  );

  const updatedProfile = await models.Profile.findOne({
    where: {
      userId,
    },
  });

  if (exist) {
    exist.departLocation = data.departLocation
      ? data.departLocation
      : exist.departLocation;
    exist.destinations = data.destinations
      ? data.destinations
      : exist.destinations;
    exist.tripReason = data.tripReason ? data.tripReason : exist.tripReason;
    exist.rememberMe;
    exist.passportNumber = updatedProfile.passportNumber
      ? updatedProfile.passportNumber
      : exist.passportNumber;
    exist.address = updatedProfile.address
      ? updatedProfile.address
      : exist.address;
    exist.names;
    exist.gender;
    exist.role;
    exist.departDate = data.departDate ? data.departDate : exist.departDate;
    exist.returnDate = data.returnDate ? data.returnDate : exist.returnDate;
    let checkTripType;
    if (data.destinations) {
      checkTripType = data.destinations.length;
    }

    if (checkTripType === undefined) {
      exist.tripType = exist.tripType;
    } else {
      const checkTripType = data.destinations.length;
      const tripType = checkTripType > 1 ? 'multicity' : 'single-city';
      exist.tripType = tripType;
    }

    const updated = await exist.save();
    return updated;
  }else if(!existId) {
    throw new NotFoundError('Trip not found');
  } 
  throw new BaseError(
    'Conflict Error',
    409,
    'You are not allowed to edit an already approved/rejected trip request',
  );
};

export const deleteRequest = async (userId, id) => {
  const checkExist = await tripExist(userId, id);

  if (checkExist) {
    // eslint-disable-next-line no-unused-vars
    const Data = await models.tripRequest.destroy({
      where: {
        status: 'pending',
        userId,
        id,
      },
    });
    return true;
  }

  return null;
};
export const checkStatus = async (userid, status) => {
  const data = await models.tripRequest.findOne({
    where: {
      id: userid,
      status,
    },
  });

  return data;
};

export const approveRequest = async (tripId, statusUpdate) => {
  const data = await models.tripRequest.update(statusUpdate, {
    where: { id: tripId },
    returning: true,
    raw: true,
  });

  return data;
};

export const findRequestById = async (id) => {
  const request = await models.tripRequest.findOne({
    where: {
      id,
    },
  });
  return request;
};
export const findLocation = async (id) => {
  try {
    const findLoc = await models.Location.findOne({ where: { id } });
    return findLoc;
  } catch (error) {
    console.log(error);
  }
};

export const findAndUpdateLocation = async ({ where, id }, locData) => {
  try {
    const updateLoc = await models.Location.update(locData, {
      where: id ? { id } : where,
    });
    return updateLoc;
  } catch (error) {
    console.log(error);
  }
};
export const updateLocation = async (data) => {
  data.update();
  data.save();
  return data;
};
export const fetchMostTravelled = async (tripId) => {
  const data = await models.tripRequest.findOne(tripId, {
    where: { id: tripId },
  });
  return data;
};
export const findStatistcsByUser = async (userId, startDate, endDate) => {
  const role = await checkRole(userId);
  if (role === 'requester') {
    return await models.tripRequest.findAndCountAll({
      where: {
        [Op.and]: [
          { userId },
          { createdAt: { [Op.between]: [startDate, endDate] } },
        ],
      },
    });
  }
  if (role === 'manager') {
    return await models.tripRequest.findAndCountAll({
      where: {
        [Op.and]: [{ createdAt: { [Op.between]: [startDate, endDate] } }],
      },
    });
  }
};

import { Op } from 'sequelize';
import models from '../models';

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
      console.log(addTrip);
      addTrip.save();
      return addTrip;
    }
    return false;
  } catch (err) {
    throw new Error('something is Wrong');
  }
};

export const getAllRequests = async (userId) => {
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

export const updateRequest = async (userId, id, data) => {
  const exist = await tripExist(userId, id);
  if (exist) {
    exist.departLocation = data.departLocation
      ? data.departLocation
      : exist.departLocation;
    exist.arrivalLocation = data.arrivalLocation
      ? data.arrivalLocation
      : exist.arrivalLocation;
    exist.tripReason = data.tripReason ? data.tripReason : exist.tripReason;
    exist.departDate = data.departDate ? data.departDate : exist.departDate;
    exist.returnDate = data.returnDate ? data.returnDate : exist.returnDate;
    exist.accomodationId = data.accomodationId
      ? data.accomodationId
      : exist.accomodationId;
    const updatedTrip = await exist.save();
    return updatedTrip;
  }
  return null;
};

// multcities update function
export const updateMulticities = async (id, data) => {
  const exist = await models.tripRequest.findOne({
    where: {
      id,
    },
  });
  if (exist) {
    exist.departLocation = data.departLocation
      ? data.departLocation
      : exist.departLocation;
    exist.destinations = data.destinations
      ? data.destinations
      : exist.arrivalLocation;
    exist.tripReason = data.tripReason ? data.tripReason : exist.tripReason;
    exist.departDate = data.departDate ? data.departDate : exist.departDate;
    exist.returnDate = data.returnDate ? data.returnDate : exist.returnDate;

    const updated = await exist.save();
    return updated;
  }
  return null;
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

export const checkstatus = async (userid, status) => {
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

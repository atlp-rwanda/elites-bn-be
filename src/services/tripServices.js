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

export const tripExist = async (userId, id) => {
  const dataExist = await models.tripRequest.findOne({
    where: {
      userId,
      status: 'pending',
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
    console.error('some thing is wrong');
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

export const deleteRequest = async (userId, id) => {
  const checkExist = await tripExist(userId, id);

  if (checkExist) {
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

// export const fetchAllRequests = async (managerId) => {
//   const data = await models.tripRequest.findAll({
//     where: {
//       managerId,
//     },
//   });
//   if (data) {
//     return data;
//   }
//   return null;
// };

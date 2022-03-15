import models from '../models';

export const tripExist = async (userId, id) => {
  const dataExist = await models.tripRequest.findOne({
    where: {
      userId,
      status: 'pending',
      id
    }
  });

  if (dataExist) {
    return dataExist;
  }
  return null;
};

export const createTrip = async (userid, data) => {
  const addTrip = await models.tripRequest.create({ ...data, userId: userid });
  addTrip.save();
  return addTrip;
};

export const getAllRequests = async (userId) => {
  const Data = await models.tripRequest.findAll({
    where: { userId },
  });
  return Data;
};

export const getPending = async (userId) => {
  const Data = await models.tripRequest.findAll({
    where: { status: 'pending', userId },
  });
  return Data;
};

export const updateRequest = async (userId, id, data) => {
  const exist = await tripExist(userId, id);
  if (exist) {
    exist.managerId = data.managerId ? data.managerId : exist.managerId;
    exist.departLocation = data.departLocation
      ? data.departLocation
      : exist.departLocation;
    exist.arrivalLocation = data.arrivalLocation ? data.arrivalLocation : exist.arrivalLocation;
    exist.tripReason = data.tripReason ? data.tripReason : exist.tripReason;
    exist.departDate = data.departDate ? data.departDate : exist.departDate;
    exist.returnDate = data.returnDate ? data.returnDate : exist.returnDate;
    exist.travelId = data.travelId ? data.travelId : exist.travelId;
    exist.accomodationId = data.accomodationId ? data.accomodationId : exist.accomodationId;
    exist.status = data.status ? data.status : exist.status;
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
        id
      },
    });
    return true;
  }

  return null;
};

export const fetchAllRequests = async (managerId) => {
  const data = await models.tripRequest.findAll({
    where: {
      managerId
    }
  });
  if (data) {
    return data;
  }
  return null;
};

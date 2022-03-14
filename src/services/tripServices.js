import models from '../models';


export const tripExist = async(userId, id) => {

    const dataExist = await models.tripRequest.findOne({
        where: {
            userId: userId,
            status: 'pending',
            id: id
        }
    });

    if (dataExist) {
        return dataExist;
    } else {
        return null;
    }
  });

  if (dataExist) {
    return dataExist;
  }
  return null;
};

export const deleteRequest = async(userId, id) => {
    const Data = await models.tripRequest.destroy({
        where: {
            status: 'pending',
            userId,
            id
        },
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
    const updatedArticle = await exist.save();
    return updatedArticle;
  }
  return null;
};

export const deleteRequest = async (userId, id) => {
  const Data = await models.tripRequest.destroy({
    where: {
      status: 'pending',
      userId,
      id
    },
  });

  return Data;
};

import models from '../models';

export const createTrip = async(userid, data) => {
    const addTrip = await models.tripRequest.create({...data, userId: userid });
    addTrip.save();
    return addTrip;
}


export const getAllRequests = async(userId) => {
    const Data = await models.tripRequest.findAll({
        where: { userId: userId },
    });
    return Data;
}

export const getPending = async(userId) => {
    const Data = await models.tripRequest.findAll({
        where: { status: "pending", userId: userId },
    });
    return Data;
}


export const updateRequest = async(
    userId,
    id,
    data) => {
    const exist = await models.tripRequest.findOne({
        where: {
            userId: userId,
            status: "pending",
            id: id
        }
    });
    if (exist) {
        exist.managerId = data.managerId ? data.managerId : exist.managerId;
        exist.departLocation = data.departLocation ?
            data.departLocation :
            exist.departLocation;
        exist.arrivalLocation = data.arrivalLocation ? data.arrivalLocation : exist.arrivalLocation;
        exist.tripReason = data.tripReason ? data.tripReason : exist.tripReason;
        exist.departDate = data.departDate ? data.departDate : exist.departDate;
        exist.returnDate = data.returnDate ? data.returnDate : exist.returnDate;
        exist.travelId = data.travelId ? data.travelId : exist.travelId;
        exist.accomodationId = data.accomodationId ? data.accomodationId : exist.accomodationId;
        exist.status = data.status ? data.status : exist.status;
        const updatedArticle = await exist.save();
        return updatedArticle;
    } else {
        return false;
    }

}

export const deleteRequest = async(userId, id) => {
    const Data = await models.tripRequest.destroy({
        where: {
            status: "pending",
            userId: userId,
            id: id
        },
    })

    return Data;
}
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

    const findData = await models.tripRequest.findOne({
        where: {
            userId: userId,
            status: "pending",
            id: id
        }
    })

    if (findData) {
        const updated = await models.tripRequest.update(data);
        return updated;
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
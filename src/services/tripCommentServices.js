import models from '../models'

export class TripCommentService{

    static async create(data){
        return await models.TripComment.create(data)
    }

    static async findByPk(id){
        return await models.TripComment.findByPk(id)
    }

    static async delete(id){
        return await models.TripComment.destroy({ where: {id: id}})
    }

    static async findAllByTrip(id){
        return await models.TripComment.findAll({ include: {model: models.User, as: 'user'}, where: {tripId: id}})
    }

}
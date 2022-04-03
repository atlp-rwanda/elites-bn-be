import models from '../models';

export const addMessage = async(obj,user)=>{

    const data = await models.chatMessage.create({...obj, postedBy: user});
    return data;
}

export const getMessages = async()=>{

    const data = await models.chatMessage.findAll();
    return data;
}
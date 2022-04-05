import models from '../models';

export const addMessage = async(obj)=>{

    const data = await models.chatMessage.create({...obj});
    return data;
}

export const getMessages = async()=>{

    const data = await models.chatMessage.findAll();
    return data;
}
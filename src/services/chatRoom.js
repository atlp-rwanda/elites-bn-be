import models from '../models';
import io from '../app';

export const handshake = async (socket,next)=>{

    const { token } = socket.handshake.query;
    const userId = socket.handshake.query.id
}

export const userconnection = socket=>{

    socket.on('message', data=>{
        io.emit('messageSent', data);
        models.chatmessage.create({
            postedBy: socket.id,
            message: data.message
        });
    });

    next();
}
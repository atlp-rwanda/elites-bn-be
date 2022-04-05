import { getMessages, addMessage } from '../services/chatServices';
import moment from 'moment';


class ChatController {

    async sendMessageContoller(req, res, next){

        try {
            // console.log(id);
            const data = { ...req.body }
            const sentMessage = await addMessage(data);
            res.status(201).json({ status: 201, message: sentMessage , time: moment().format('h:mm a')});
        } catch (err) {
            console.log(err);
            next(err);
        } 
    
    }

    // get messages

    async getMessageContoller(req, res, next){

        try {
            const sentMessage = await getMessages(req.body);
            res.status(201).json({ sender: sentMessage.postedBy, message: sentMessage , time: moment().format('h:mm a')});
        } catch (err) {
            next(err)
        } 
    
    }
}

export default ChatController;




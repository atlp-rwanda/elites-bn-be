import moment from 'moment';
import { getMessages, addMessage } from '../services/chatServices';

class ChatController {
  // get messages

  async getMessageContoller(req, res, next) {
    try {
      const sentMessage = await getMessages(req.body);
      res.status(200).json({
        sender: sentMessage.postedBy,
        message: sentMessage,
        time: moment().format('h:mm a'),
      });
    } catch (err) {
      next(err);
    }
  }
}

export default ChatController;

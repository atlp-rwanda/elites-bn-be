import { getMessages } from '../services/chatServices';
class ChatController {
  // get messages

  async getMessageContoller(req, res, next) {
    try {
      const sentMessage = await getMessages(req.body);
      res.status(200).json({
        status: 200,
        message: 'chats retrieved successfully!',
        chats: sentMessage,
      });
    } catch (err) {
      next(err);
    }
  }
}

export default ChatController;

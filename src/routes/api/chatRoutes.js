import express from 'express';
import ChatController from '../../controllers/chatControllers';

const chatControllers = new ChatController();
const router = express.Router();

router.get('/', chatControllers.getMessageContoller);
export default router;

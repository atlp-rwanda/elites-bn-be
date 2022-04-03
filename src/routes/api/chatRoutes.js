import express from 'express';
import ChatController from '../../controllers/chatControllers'
import { authenticate } from '../../middlewares/authenticate';


const chatControllers = new ChatController();
const router = express.Router();

router.post('/', authenticate, chatControllers.sendMessageContoller);
router.get('/', chatControllers.getMessageContoller);
// router.patch('/', upload.single('picture'), authenticate, profileControllers.updateUserProfile);
// router.delete('/', authenticate, profileControllers.deleteProfile);
export default router;
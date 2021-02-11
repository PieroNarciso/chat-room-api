import { Router } from 'express';

import { getMessages, writeMessage } from '../controllers/message.controller';
import { authSession } from '../auth';


const router = Router();

router.get('/message', getMessages);
router.post('/message', authSession, writeMessage);

export default router;

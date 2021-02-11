import { Router } from 'express';

import { authSession } from '../auth';
import {
  loginUser,
  registerUser,
  logoutUser,
  getUser } from '../controllers/user.controller';


const router = Router();

router.get('/user', authSession, getUser);
router.post('/user/login', loginUser);
router.post('/user/register', registerUser);
router.post('/user/logout', authSession,logoutUser);


export default router;

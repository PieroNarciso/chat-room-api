import { Request, Response } from 'express';
import { getRepository, getConnection } from 'typeorm';

import { Message } from '../models';

export const getMessages = async (_req: Request, res: Response) => {
  try {
    const messages = await getRepository(Message).find();
    return res.status(200).send(messages); 
  } catch (err) {
    return res.sendStatus(400);
  }
};

export const writeMessage = async (req: Request, res: Response) => {
  try {
    if (req.session.userID) {
      const message = new Message();
      message.msg = req.body.msg;
      message.userId = req.session.userID;
      const resMsg = await getConnection().manager.save(message);
      return res.status(201).send(resMsg);
    }
    return res.sendStatus(401);
  } catch (err) {
    return res.status(400).send(err);
  }
};

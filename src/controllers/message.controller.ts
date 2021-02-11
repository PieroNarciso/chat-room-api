import { Request, Response } from 'express';

import { Message } from '../models';

export const getMessages = async (_req: Request, res: Response) => {
  try {
    const messages = await Message.findAll({
      include: [Message.associations.User]
    });
    return res.status(200).send(messages); 
  } catch (err) {
    return res.sendStatus(400);
  }
};

export const writeMessage = async (req: Request, res: Response) => {
  console.log(req.session.userID);
  try {
    if (req.session.userID) {
      const message = await Message.create({
        userId: req.session.userID,
        content: req.body.content
      });
      return res.status(201).send(message);
    }
    return res.sendStatus(401);
  } catch (err) {
    return res.status(400).send(err);
  }
};

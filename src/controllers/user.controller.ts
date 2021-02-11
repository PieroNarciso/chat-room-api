import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { User } from '../models/user.model';
import config from '../config';


export const loginUser = async (req: Request, res: Response) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).send('Username and Password are required');
  }
  try {
    const user = await User.findOne({
      where: { username: req.body.username }
    });
    if (user) {
      const isValid = await bcrypt.compare(req.body.password, user.password);
      if (!isValid) {
        return res.status(400).send('Username or Password is invalid');
      }
      req.session.userID = user.id;
      return res.status(200).send({
        userId: user.id,
        username: user.username,
        email: user.email
      });
    }
    return res.status(400).send('Username or Password is invalid');
  } catch (err) {
    return res.status(400).send(err);
  }
};

export const registerUser = async (req: Request, res: Response) => {
  if (!req.body.username || !req.body.password || !req.body.email) {
    return res.status(400).send('Username, Password and Email are required');
  }
  try {
    const userExists = await User.findOne({
      where: { username: req.body.username, email: req.body.email } 
    });
    if (!userExists) {
      req.body.password = await bcrypt.hash(
        req.body.password, config.SALT_ROUNDS
      );
      const user = await User.create(req.body);
      const userData = await User.findByPk(user.id, {
        attributes: { exclude: ['password'] }
      });
      return res.status(201).send(userData);
    }
    return res.status(400).send('Username or Email already exists');
  } catch (err) {
    return res.status(400).send(err);
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  if (req.session.userID) {
    req.session.destroy(err => {
      if (err) {
        return res.status(400).send(err);
      }
      return res.clearCookie(config.SESSION_NAME).send('Logout');
    });
  } else {
    return res.status(400).send(req.body.userID);
  }
};

export const getUser = async (req: Request, res: Response) => {
  if (!req.session.userID) {
    return res.sendStatus(401);
  }
  try {
    const user = await User.findByPk(req.session.userID, {
      attributes: { exclude: ['password'] },
    });
    if (user) {
      return res.status(200).send(user);
    }
    return res.sendStatus(404);
  } catch (err) {
    return res.status(400).send(err);
  }
};

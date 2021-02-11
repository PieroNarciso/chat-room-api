import { Request, Response, NextFunction } from 'express';


export const authSession = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.userID) {
    return res.status(401).send('Not Login');
  } else {
    return next();
  }
};

import { NextFunction, Request, Response } from 'express';

import HttpException from '../models/HttpException';
import SessionService from '../services/SessionService';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    next(new HttpException(401, 'Unauthorized'));
    return;
  }

  const token = req.headers.authorization.split(' ')[1];
  const tokenPayload = SessionService.checkAccessToken(token);

  if (typeof tokenPayload === 'string') {
    next(new HttpException(500));
    return;
  }

  res.locals.userId = tokenPayload.user_id;
  next();
};

export default authMiddleware;

import { NextFunction, Request, Response } from 'express';

import HttpException from '../models/HttpException';
import User from '../models/User';
import { checkAccessToken } from '../utils/authUtil';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    next(new HttpException(401, 'Unauthorized'));
    return;
  }

  try {
    const token = req.headers.authorization.split(' ')[1];
    const tokenPayload = checkAccessToken(token);

    if (typeof tokenPayload === 'string') {
      next(new HttpException(401, 'Unauthorized'));
      return;
    }

    const user = await User.findById(tokenPayload.user_id);
    if (!user) {
      next(new HttpException(401, 'Unauthorized'));
      return;
    }

    res.locals.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;

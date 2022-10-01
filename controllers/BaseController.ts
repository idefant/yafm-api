import { Response, Request, NextFunction } from 'express';

import BaseService from '../services/BaseService';

class BaseController {
  static async get(_req: Request, res: Response, next: NextFunction) {
    try {
      const result = await BaseService.get(res.locals.user);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await BaseService.create(res.locals.user, req.body);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
}

export default BaseController;

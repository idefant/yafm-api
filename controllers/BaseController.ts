import { Response, Request, NextFunction } from 'express';

import BaseService from '../services/BaseService';

class BaseController {
  static async getList(_req: Request, res: Response, next: NextFunction) {
    try {
      const result = await BaseService.getList(res.locals.token);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await BaseService.create(res.locals.token, req.body);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }

  static async get(_req: Request, res: Response, next: NextFunction) {
    try {
      const result = await BaseService.get(res.locals.token);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
}

export default BaseController;

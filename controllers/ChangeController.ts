import { Response, Request, NextFunction } from 'express';

import ChangeService from '../services/ChangeService';

class ChangeController {
  static async getList(_req: Request, res: Response, next: NextFunction) {
    try {
      const result = await ChangeService.getList(res.locals.userId);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      await ChangeService.create(res.locals.userId, req.body);
      res.sendStatus(201);
    } catch (error) {
      next(error);
    }
  }
}

export default ChangeController;

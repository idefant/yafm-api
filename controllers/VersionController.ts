import { Response, Request, NextFunction } from 'express';

import VersionService from '../services/VersionService';

class VersionController {
  static async getLast(_req: Request, res: Response, next: NextFunction) {
    try {
      const result = await VersionService.getLast(res.locals.userId);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }

  static async getList(_req: Request, res: Response, next: NextFunction) {
    try {
      const result = await VersionService.getList(res.locals.userId);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await VersionService.getById(res.locals.userId, req.params.versionId);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await VersionService.create(res.locals.userId, req.body);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
}

export default VersionController;

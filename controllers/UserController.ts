import { Response, Request, NextFunction } from 'express';

import SessionService from '../services/SessionService';
import UserService from '../services/UserService';

class UserController {
  static async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await UserService.signup(req.body, req.headers['user-agent']);
      res.status(201).send(result);
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await UserService.login(req.body, req.headers['user-agent']);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }

  static async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await UserService.changePassword(req.body, req.headers['user-agent']);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }

  static async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await SessionService.refreshToken(req.body, req.headers['user-agent']);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }

  static async getInfo(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await UserService.getInfo(res.locals.user);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await UserService.delete(res.locals.user);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;

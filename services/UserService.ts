import HttpException from '../models/HttpException';
import User from '../models/User';
import { checkPassword, hashPassword } from '../utils/authUtil';

import SessionService from './SessionService';

class UserService {
  static findByUsername(username: string) {
    return User.findOne({ username });
  }

  static async signup(data: { username: string; password: string; salt: string }) {
    const user = await User.exists({ username: data.username });
    if (user) {
      throw new HttpException(400, 'User already exist');
    }

    await User.create({
      username: data.username,
      salt: data.salt,
      password_hash: hashPassword(data.password),
    });
  }

  static async login(data: { username: string; password: string }, userAgent?: string) {
    const user = await UserService.findByUsername(data.username);
    if (!user || !checkPassword(data.password, user.password_hash)) {
      throw new HttpException(400, 'Wrong username or password');
    }

    const tokens = await SessionService.create(user, userAgent);

    return {
      refresh_token: tokens.refreshToken,
      access_token: tokens.accessToken,
    };
  }

  static async changePassword(data: { username: string; password: string; new_password: string }) {
    const user = await UserService.findByUsername(data.username);
    if (!user || !checkPassword(data.password, user.password_hash)) {
      throw new HttpException(400, 'Wrong username or password');
    }

    await user.update({ password_hash: hashPassword(data.new_password) });
  }
}

export default UserService;

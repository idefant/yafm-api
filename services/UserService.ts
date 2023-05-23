import { User } from '@prisma/client';

import HttpException from '../models/HttpException';
import prisma from '../prisma';
import { checkPassword, hashPassword } from '../utils/authUtil';

import SessionService from './SessionService';

class UserService {
  static findByUsername(username: string) {
    return prisma.user.findUnique({ where: { username } });
  }

  static async signup(data: { username: string; password: string }, userAgent?: string) {
    const foundUser = await prisma.user.findUnique({
      where: { username: data.username },
    });
    if (foundUser) {
      throw new HttpException(400, 'User already exist');
    }

    const user = await prisma.user.create({
      data: {
        username: data.username,
        passwordHash: hashPassword(data.password),
      },
    });

    const tokens = await SessionService.create(user, userAgent);
    return {
      refresh_token: tokens.refreshToken,
      access_token: tokens.accessToken,
    };
  }

  static async login(data: { username: string; password: string }, userAgent?: string) {
    const user = await UserService.findByUsername(data.username);
    if (!user || !checkPassword(data.password, user.passwordHash)) {
      throw new HttpException(400, 'Wrong username or password');
    }

    const tokens = await SessionService.create(user, userAgent);

    return {
      refresh_token: tokens.refreshToken,
      access_token: tokens.accessToken,
    };
  }

  static async changePassword(
    data: { username: string; password: string; new_password: string },
    userAgent?: string,
  ) {
    const user = await UserService.findByUsername(data.username);
    if (!user || !checkPassword(data.password, user.passwordHash)) {
      throw new HttpException(400, 'Wrong username or password');
    }

    await prisma.user.update({
      data: { passwordHash: hashPassword(data.new_password) },
      where: { username: data.username },
    });
    await SessionService.clearSessions(user);

    const tokens = await SessionService.create(user, userAgent);

    return {
      refresh_token: tokens.refreshToken,
      access_token: tokens.accessToken,
    };
  }

  static getInfo(user: User) {
    return prisma.user.findUnique({
      where: { id: user.id },
      include: { sessions: { select: { userAgent: true } }, bases: true },
    });
  }

  static async delete(user: User) {
    await prisma.user.delete({ where: { id: user.id } });
  }
}

export default UserService;

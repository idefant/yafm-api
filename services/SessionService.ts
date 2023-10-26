import { User } from '@prisma/client';
import dayjs from 'dayjs';

import HttpException from '../models/HttpException';
import prisma from '../prisma';
import { generateTokens, getExpirationDate } from '../utils/authUtil';

interface RefreshTokenBodyProps {
  refresh_token: string;
}

class SessionService {
  static async findByToken(token: string) {
    const session = await prisma.session.findUnique({ where: { refreshToken: token } });
    if (!session || dayjs(session.expiresAt).isBefore(dayjs())) {
      return null;
    }
    return session;
  }

  static async create(user: User, userAgent?: string) {
    const tokens = generateTokens(user.id);

    await prisma.session.create({
      data: {
        refreshToken: tokens.refreshToken,
        userAgent,
        userId: user.id,
        expiresAt: getExpirationDate(),
      },
    });

    return tokens;
  }

  static async refreshToken(data: RefreshTokenBodyProps, userAgent?: string) {
    const session = await SessionService.findByToken(data.refresh_token);
    if (!session) {
      throw new HttpException(401, 'Unauthorized');
    }
    const tokens = generateTokens(session.userId);

    await prisma.session.update({
      where: { refreshToken: data.refresh_token },
      data: {
        refreshToken: tokens.refreshToken,
        userAgent,
        expiresAt: getExpirationDate(),
      },
    });

    return {
      refresh_token: tokens.refreshToken,
      access_token: tokens.accessToken,
    };
  }

  static async clearSessions(user: User) {
    await prisma.session.deleteMany({ where: { userId: user.id } });
  }
}

export default SessionService;

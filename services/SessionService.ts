import { randomUUID } from 'crypto';

import dayjs from 'dayjs';
import jwt from 'jsonwebtoken';
import { object, string } from 'yup';

import HttpException from '../models/HttpException';
import prisma from '../prisma/prisma-client';

class SessionService {
  static async findByToken(token: string) {
    const session = await prisma.session.findFirst({
      where: {
        refresh_token: {
          equals: token,
        },
      },
    });

    if (!session || dayjs(session.expires_at).isBefore(dayjs())) {
      return null;
    }
    return session;
  }

  static generateTokens(userId: string) {
    const refreshToken = randomUUID();
    const accessToken = jwt.sign(
      { user_id: userId },
      process.env.JWT_SECRET || '',
      { expiresIn: 3600 },
    );
    return { refreshToken, accessToken };
  }

  static getExpirationDate() {
    return dayjs().add(90, 'days').toISOString();
  }

  static async create(userId: string, userAgent = 'unknown') {
    const tokens = SessionService.generateTokens(userId);

    const session = await prisma.session.create({
      data: {
        refresh_token: tokens.refreshToken,
        user_agent: userAgent,
        user_id: userId,
        expires_at: SessionService.getExpirationDate(),
      },
    });

    return { session, tokens };
  }

  static async refreshToken(data: { refresh_token: string }) {
    const schema = object().shape({
      refresh_token: string().uuid().required(),
    });

    if (!await schema.isValid(data)) {
      throw new HttpException(500, 'Wrong params');
    }

    const session = await SessionService.findByToken(data.refresh_token);
    if (!session) {
      throw new HttpException(401, 'Unauthorized');
    }

    const tokens = SessionService.generateTokens(session.user_id);

    await prisma.session.update({
      where: { id: session.id },
      data: {
        refresh_token: tokens.refreshToken,
        expires_at: SessionService.getExpirationDate(),
      },
    });

    return {
      refresh_token: tokens.refreshToken,
      access_token: tokens.accessToken,
      session_id: session.id,
    };
  }
}

export default SessionService;

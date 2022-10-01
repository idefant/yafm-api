import dayjs from 'dayjs';

import HttpException from '../models/HttpException';
import Session from '../models/Session';
import { TUserDocument } from '../models/User';
import { generateTokens, getExpirationDate } from '../utils/authUtil';

interface RefreshTokenBodyProps {
  refresh_token: string;
}

class SessionService {
  static async findByToken(token: string) {
    const session = await Session.findOne({ refresh_token: token });
    if (!session || dayjs(session.expires_at).isBefore(dayjs())) {
      return null;
    }
    return session;
  }

  static async create(user: TUserDocument, userAgent?: string) {
    const tokens = generateTokens(user.id);

    const session = await Session.create({
      refresh_token: tokens.refreshToken,
      user_agent: userAgent,
      user: user.id,
      expires_at: getExpirationDate(),
    });

    user.sessions.push(session.id);
    user.save();

    return tokens;
  }

  static async refreshToken(data: RefreshTokenBodyProps, userAgent?: string) {
    const session = await SessionService.findByToken(data.refresh_token);
    if (!session) {
      throw new HttpException(401, 'Unauthorized');
    }

    const tokens = generateTokens(session.user);

    await session.updateOne({
      refresh_token: tokens.refreshToken,
      user_agent: userAgent,
      expires_at: getExpirationDate(),
    });

    return {
      refresh_token: tokens.refreshToken,
      access_token: tokens.accessToken,
    };
  }

  static async clearSessions(user: TUserDocument) {
    await Session.deleteMany({ user: user.id });
    await user.updateOne({ sessions: [] });
  }
}

export default SessionService;

import { randomUUID } from 'crypto';

import bcrypt from 'bcryptjs';
import dayjs from 'dayjs';
import jwt from 'jsonwebtoken';

import HttpException from '../models/HttpException';

export const getExpirationDate = (date = dayjs()) => date.add(90, 'days').toISOString();

export const checkAccessToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || '');
  } catch (error) {
    throw new HttpException(401, 'Unauthorized');
  }
};

export const generateTokens = (userId: string) => {
  const refreshToken = randomUUID();
  const accessToken = jwt.sign({ user_id: userId }, process.env.JWT_SECRET || '', {
    expiresIn: 3600 * 1000000,
  });
  return { refreshToken, accessToken };
};

export const hashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(12);
  return bcrypt.hashSync(password, salt);
};

export const checkPassword = (password: string, hash: string) => bcrypt.compareSync(password, hash);

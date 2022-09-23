import bcrypt from 'bcryptjs';
import { object } from 'yup';

import HttpException from '../models/HttpException';
import prisma from '../prisma/prisma-client';
import { hexSchema, passwordSchema, usernameSchema } from '../schema';

import SessionService from './SessionService';

class UserService {
  static findByUsername(username: string) {
    return prisma.user.findFirst({
      where: {
        username: {
          equals: username,
        },
      },
    });
  }

  static hashPassword(password: string) {
    const salt = bcrypt.genSaltSync(12);
    return bcrypt.hashSync(password, salt);
  }

  static checkPassword(password: string, hash: string) {
    return bcrypt.compareSync(password, hash);
  }

  static async signup(data: { username: string; password: string; salt: string }) {
    const schema = object().shape({
      username: usernameSchema.required(),
      password: passwordSchema.required(),
      salt: hexSchema.required(),
    });

    if (!await schema.isValid(data)) {
      throw new HttpException(500, 'Wrong params');
    }

    const user = await UserService.findByUsername(data.username);
    if (user) {
      throw new HttpException(400, 'User already exist');
    }

    await prisma.user.create({
      data: {
        username: data.username,
        password_hash: UserService.hashPassword(data.password),
        salt: data.salt,
      },
    });
  }

  static async login(data: { username: string; password: string }, userAgent?: string) {
    const schema = object().shape({
      username: usernameSchema.required(),
      password: passwordSchema.required(),
    });

    if (!await schema.isValid(data)) {
      throw new HttpException(500, 'Wrong params');
    }

    const user = await UserService.findByUsername(data.username);

    if (!user || !UserService.checkPassword(data.password, user.password_hash)) {
      throw new HttpException(400, 'Wrong username or password');
    }

    const { tokens, session } = await SessionService.create(user.id, userAgent);

    return {
      refresh_token: tokens.refreshToken,
      access_token: tokens.accessToken,
      session_id: session.id,
    };
  }

  static async changePassword(data: { username: string; password: string; new_password: string }) {
    const schema = object().shape({
      username: usernameSchema.required(),
      password: passwordSchema.required(),
      new_password: passwordSchema.required(),
    });

    if (!await schema.isValid(data)) {
      throw new HttpException(500, 'Wrong params');
    }

    const user = await UserService.findByUsername(data.username);

    if (!user || !UserService.checkPassword(data.password, user.password_hash)) {
      throw new HttpException(400, 'Wrong username or password');
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { password_hash: UserService.hashPassword(data.new_password) },
    });
  }
}

export default UserService;

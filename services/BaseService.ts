import prisma from '../prisma';
import { Token } from '../types/tokenType';

interface SetBaseBodyProps {
  iv: string;
  cipher: string;
  hmac: string;
  salt: string;
}

class BaseService {
  static async getList(token: Token) {
    const bases = await prisma.base.findMany({
      where: { userId: token.sub },
      take: 10,
      orderBy: { createdAt: 'desc' },
    });
    return bases;
  }

  static async create(token: Token, data: SetBaseBodyProps) {
    const base = await prisma.base.create({
      data: { ...data, userId: token.sub },
    });

    return base;
  }

  static async get(token: Token) {
    return prisma.base.findFirst({ where: { userId: token.sub } });
  }
}

export default BaseService;

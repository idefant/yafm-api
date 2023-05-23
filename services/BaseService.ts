import { User } from '@prisma/client';

import prisma from '../prisma';

interface SetBaseBodyProps {
  iv: string;
  cipher: string;
  hmac: string;
}

class BaseService {
  static async get(user: User) {
    return prisma.base.findFirst({ where: { userId: user.id } });
  }

  static async create(user: User, data: SetBaseBodyProps) {
    const base = await prisma.base.create({
      data: {
        iv: data.iv,
        cipher: data.cipher,
        hmac: data.hmac,
        userId: user.id,
      },
    });

    return base.id;
  }
}

export default BaseService;
